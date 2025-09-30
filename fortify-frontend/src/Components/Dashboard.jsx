import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const handleLogout = async () => {
    await fetch("http://localhost:5046/api/Login/logout", { 
      method: "POST", 
      credentials: "include" 
    });
    window.location.href = "/";
  };

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
          <p className="text-gray-600">Manage your finances</p>
        </div>

        {/* Simple Cards */}
        <div className="space-y-4">
          <Link to="/category" className="block">
            <div className="bg-white p-6 rounded-lg border text-center hover:bg-gray-50">
              <div className="text-blue-600 text-lg font-bold mb-2">Categories</div>
              <p className="text-gray-600 text-sm">Organize income and expenses</p>
            </div>
          </Link>

          <Link to="/budget" className="block">
            <div className="bg-white p-6 rounded-lg border text-center hover:bg-gray-50">
              <div className="text-green-600 text-lg font-bold mb-2">Budget</div>
              <p className="text-gray-600 text-sm">Set monthly spending limit</p>
            </div>
          </Link>

          <Link to="/transaction" className="block">
            <div className="bg-white p-6 rounded-lg border text-center hover:bg-gray-50">
              <div className="text-purple-600 text-lg font-bold mb-2">Transactions</div>
              <p className="text-gray-600 text-sm">Track income and expenses</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}