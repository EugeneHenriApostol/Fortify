import { useState, useEffect } from 'react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    description: '',
    categoryId: ''
  });

  // Get current month for budget checking
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5046/api/Login/me", {
          credentials: "include",
        });

        if (!res.ok) {
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Auth check failed", err);
        window.location.href = "/";
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchBudget();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5046/api/Transaction', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error('Failed to fetch transactions');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5046/api/Categories', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchBudget = async () => {
    try {
      const response = await fetch(`http://localhost:5046/api/Budget/${currentMonth}/${currentYear}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setBudget(data);
      } else {
        setBudget(null);
      }
    } catch (err) {
      console.error('Failed to fetch budget');
      setBudget(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTransaction 
        ? `http://localhost:5046/api/Transaction/${editingTransaction.id}`
        : 'http://localhost:5046/api/Transaction';
      
      const method = editingTransaction ? 'PUT' : 'POST';
      const payload = editingTransaction 
        ? { 
            id: editingTransaction.id,
            amount: parseFloat(formData.amount),
            type: formData.type,
            date: new Date(formData.date).toISOString(),
            description: formData.description,
            categoryId: parseInt(formData.categoryId)
          }
        : {
            amount: parseFloat(formData.amount),
            type: formData.type,
            date: new Date(formData.date).toISOString(),
            description: formData.description,
            categoryId: parseInt(formData.categoryId)
          };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchTransactions();
        resetForm();
      }
    } catch (err) {
      console.error('Failed to save transaction');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    
    try {
      const response = await fetch(`http://localhost:5046/api/Transaction/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchTransactions();
      }
    } catch (err) {
      console.error('Failed to delete transaction');
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      amount: transaction.amount.toString(),
      type: transaction.type,
      date: new Date(transaction.date).toISOString().split('T')[0],
      description: transaction.description,
      categoryId: transaction.categoryId.toString()
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      description: '',
      categoryId: ''
    });
    setEditingTransaction(null);
    setShowModal(false);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const net = totalIncome - totalExpenses;

  // Budget tracking calculations
  const totalSpent = totalExpenses; // Only expenses count against budget
  const budgetLimit = budget?.limitAmount || 0;
  const remainingBudget = budgetLimit - totalSpent;
  const budgetPercentage = budgetLimit > 0 ? (totalSpent / budgetLimit) * 100 : 0;

  // Budget status
  const getBudgetStatus = () => {
    if (!budget) return 'no-budget';
    if (remainingBudget >= budgetLimit * 0.3) return 'good'; // More than 30% left
    if (remainingBudget > 0) return 'warning'; // Less than 30% left but still positive
    return 'over-budget'; // Negative remaining budget
  };

  const budgetStatus = getBudgetStatus();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Track your income and expenses</p>
        </div>

        {/* Budget Status */}
        {budget && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Monthly Budget Status</h3>
              <span className={`text-sm font-medium ${
                budgetStatus === 'good' ? 'text-green-600' :
                budgetStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {budgetStatus === 'good' ? 'On Track' :
                 budgetStatus === 'warning' ? 'Getting Close' : 'Over Budget'}
              </span>
            </div>
            
            {/* Budget Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  budgetStatus === 'good' ? 'bg-green-500' :
                  budgetStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>Spent: ${totalSpent.toFixed(2)}</span>
              <span>Remaining: ${Math.max(remainingBudget, 0).toFixed(2)}</span>
              <span>Budget: ${budgetLimit.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded text-center">
            <div className="text-lg font-bold text-green-900">${totalIncome.toFixed(2)}</div>
            <div className="text-sm text-green-600">Income</div>
          </div>
          <div className="bg-red-50 p-4 rounded text-center">
            <div className="text-lg font-bold text-red-900">${totalExpenses.toFixed(2)}</div>
            <div className="text-sm text-red-600">Expenses</div>
          </div>
          <div className={`p-4 rounded text-center ${
            budgetStatus === 'over-budget' ? 'bg-red-50' : 'bg-blue-50'
          }`}>
            <div className={`text-lg font-bold ${
              budgetStatus === 'over-budget' ? 'text-red-900' : 'text-blue-900'
            }`}>
              ${remainingBudget.toFixed(2)}
            </div>
            <div className={`text-sm ${
              budgetStatus === 'over-budget' ? 'text-red-600' : 'text-blue-600'
            }`}>
              {budget ? (remainingBudget >= 0 ? 'Remaining' : 'Over Budget') : 'No Budget Set'}
            </div>
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="mb-4">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Transaction
          </button>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow border">
          {transactions.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              No transactions yet. Add your first transaction!
            </div>
          ) : (
            <div className="divide-y">
              {transactions.map(transaction => (
                <div key={transaction.id} className="p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.categoryName} • {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(transaction)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="What was this for?"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a category</option>
                  {categories
                    .filter(cat => cat.type === formData.type)
                    .map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 p-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingTransaction ? 'Update' : 'Add'} Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}