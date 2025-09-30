import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function DashboardPage() {
  const handleLogout = async () => {
    await fetch("http://localhost:5046/api/Login/logout", { 
      method: "POST", 
      credentials: "include" 
    });
    window.location.href = "/";
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Fortify</h1>
        <button 
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4">
        
        {/* Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your budget and finances</p>
        </div>

        {/* Improved Cards with Icons */}
        <div className="space-y-4">
          <Link to="/category" className="block">
            <div className="bg-white p-6 rounded-lg border-2 border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-blue-600 text-lg font-bold mb-1">Categories</div>
                  <p className="text-gray-600 text-sm">Organize income and expenses</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/budget" className="block">
            <div className="bg-white p-6 rounded-lg border-2 border-green-100 hover:border-green-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-green-600 text-lg font-bold mb-1">Budget</div>
                  <p className="text-gray-600 text-sm">Set monthly spending limit</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/transaction" className="block">
            <div className="bg-white p-6 rounded-lg border-2 border-purple-100 hover:border-purple-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-purple-600 text-lg font-bold mb-1">Transactions</div>
                  <p className="text-gray-600 text-sm">Track income and expenses</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}