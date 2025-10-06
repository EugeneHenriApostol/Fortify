import { useState, useEffect } from 'react';

export default function BudgetsPage() {
  const [budget, setBudget] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // check if a user is logged in
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
    fetchBudget();
  }, [month, year]);

  const fetchBudget = async () => {
    try {
      const response = await fetch(`http://localhost:5046/api/Budget/${month}/${year}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setBudget(data);
      } else {
        setBudget(null);
      }
    } catch (err) {
      setBudget(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = budget ? 'PUT' : 'POST';
      const response = await fetch('http://localhost:5046/api/Budget', {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount: parseFloat(amount),
          month: parseInt(month),
          year: parseInt(year),
          categoryId: 0
        }),
      });

      if (response.ok) {
        const newBudget = await response.json();
        setBudget(newBudget);
        setShowModal(false);
        setAmount('');
      }
    } catch (err) {
      console.error('Failed to set budget');
    }
  };

  const resetForm = () => {
    setAmount('');
    setShowModal(false);
  };

  const currentMonth = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Monthly Budget</h1>
          <p className="text-gray-600">Set your spending limit</p>
        </div>

        {/* Month Selector */}
        <div className="flex gap-2 mb-6">
          <select 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
            className="flex-1 p-2 border rounded"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            className="flex-1 p-2 border rounded"
          >
            {[2023, 2024, 2025].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Budget Display */}
        <div className="bg-white p-6 rounded-lg shadow border text-center">
          {!budget ? (
            <div>
              <p className="text-gray-600 mb-4">No budget set for {currentMonth}</p>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Set Budget
              </button>
            </div>
          ) : (
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ₱{budget.limitAmount.toFixed(2)}
              </div>
              <p className="text-gray-600 mb-4">Budget for {currentMonth}</p>
              <button 
                onClick={() => {
                  setAmount(budget.limitAmount.toString());
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Change Budget
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Set Budget Modal - Updated to match Categories modal style */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black opacity-30" onClick={resetForm}></div>
          
          {/* Modal content */}
          <div className="bg-white rounded-lg max-w-sm w-full relative z-10">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">
                {budget ? 'Change Budget' : 'Set Budget'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />
              <div className="flex justify-end space-x-3">
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}