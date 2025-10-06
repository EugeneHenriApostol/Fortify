import { useState, useEffect } from 'react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  // Add month/year state for filtering
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    description: '',
    categoryId: ''
  });

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

  // Update useEffect to include selectedMonth and selectedYear as dependencies
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchBudget();
  }, [selectedMonth, selectedYear]); // Re-fetch when month/year changes

  // Update fetchTransactions to use the new monthly endpoint
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:5046/api/Transaction/month/${selectedMonth}/${selectedYear}`, {
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

  // Update fetchBudget to use selected month/year instead of current month
  const fetchBudget = async () => {
    try {
      const response = await fetch(`http://localhost:5046/api/Budget/${selectedMonth}/${selectedYear}`, {
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
        fetchTransactions(); // Refresh the transactions list
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
        fetchTransactions(); // Refresh the transactions list
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

  // Calculate totals - now using the filtered transactions
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

  const currentMonthName = new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Track your income and expenses</p>
        </div>

        {/* Month/Year Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[2023, 2024, 2025].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Budget Status */}
        {budget && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">
                {currentMonthName} {selectedYear} Budget Status
              </h3>
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
              <span>Spent: ₱{totalSpent.toFixed(2)}</span>
              <span>Remaining: ₱{Math.max(remainingBudget, 0).toFixed(2)}</span>
              <span>Budget: ₱{budgetLimit.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded text-center">
            <div className="text-lg font-bold text-green-900">₱{totalIncome.toFixed(2)}</div>
            <div className="text-sm text-green-600">Income</div>
          </div>
          <div className="bg-red-50 p-4 rounded text-center">
            <div className="text-lg font-bold text-red-900">₱{totalExpenses.toFixed(2)}</div>
            <div className="text-sm text-red-600">Expenses</div>
          </div>
          <div className={`p-4 rounded text-center ${
            budgetStatus === 'over-budget' ? 'bg-red-50' : 'bg-blue-50'
          }`}>
            <div className={`text-lg font-bold ${
              budgetStatus === 'over-budget' ? 'text-red-900' : 'text-blue-900'
            }`}>
              ₱{remainingBudget.toFixed(2)}
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
              No transactions for {currentMonthName} {selectedYear}. Add your first transaction!
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
                      {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount.toFixed(2)}
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
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-30" onClick={resetForm}></div>
        
        {/* Modal content */}
        <div className="bg-white rounded-lg max-w-md w-full relative z-10">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What was this for?"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex justify-end space-x-3 pt-4">
              <button 
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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