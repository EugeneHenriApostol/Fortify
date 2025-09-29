import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function DashboardPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Fortify</h1>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take control of your finances. Manage your budgets, track transactions, and organize categories all in one place.
          </p>
        </div>

        {/* Feature Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Categories Card */}
          <Link 
            to="/category" 
            className="group block transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center group-hover:shadow-lg group-hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Categories</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Organize your income and expense categories. Create custom categories to better track your spending habits.
              </p>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium group-hover:bg-blue-100 transition-colors duration-300">
                Manage Categories
              </div>
            </div>
          </Link>

          {/* Budgets Card */}
          <Link 
            to="/budget" 
            className="group block transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center group-hover:shadow-lg group-hover:border-green-300 transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Budgets</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Set monthly budgets for different categories. Track your spending limits and stay on top of your financial goals.
              </p>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium group-hover:bg-green-100 transition-colors duration-300">
                Manage Budgets
              </div>
            </div>
          </Link>

          {/* Transactions Card */}
          <Link 
            to="/transactions" 
            className="group block transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center group-hover:shadow-lg group-hover:border-purple-300 transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transactions</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Record and manage all your financial transactions. Add expenses, income, and categorize them for better insights.
              </p>
              <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium group-hover:bg-purple-100 transition-colors duration-300">
                Manage Transactions
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}