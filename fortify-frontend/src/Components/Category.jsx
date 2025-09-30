import { useState, useEffect } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense'
  });

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

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5046/api/Categories', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = editingCategory 
        ? `http://localhost:5046/api/Categories/${editingCategory.id}`
        : 'http://localhost:5046/api/Categories';
      
      const method = editingCategory ? 'PUT' : 'POST';
      const payload = editingCategory 
        ? { id: editingCategory.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save category');
      }

      await fetchCategories(); // Refresh the list
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5046/api/Categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      await fetchCategories(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', type: 'expense' });
    setEditingCategory(null);
    setShowModal(false);
    setError('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Group categories by type for better organization
  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const incomeCategories = categories.filter(cat => cat.type === 'income');

  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Manage your income and expense categories</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Add Category Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add New Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-red-600">Expense Categories</h2>
              <p className="text-gray-600 text-sm">Categories for tracking expenses</p>
            </div>
            <div className="p-6">
              {expenseCategories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No expense categories yet</p>
              ) : (
                <div className="space-y-3">
                  {expenseCategories.map(category => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Income Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-green-600">Income Categories</h2>
              <p className="text-gray-600 text-sm">Categories for tracking income</p>
            </div>
            <div className="p-6">
              {incomeCategories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No income categories yet</p>
              ) : (
                <div className="space-y-3">
                  {incomeCategories.map(category => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Category Modal */}
        {showModal && (
          <CategoryModal
            formData={formData}
            editingCategory={editingCategory}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={resetForm}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

// Individual Category Card Component
function CategoryCard({ category, onEdit, onDelete }) {
  const isExpense = category.type === 'expense';
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${isExpense ? 'bg-red-500' : 'bg-green-500'}`}></div>
        <span className="font-medium text-gray-900">{category.name}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="text-red-600 hover:text-red-800 font-medium text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Modal Component for Add/Edit
function CategoryModal({ formData, editingCategory, onChange, onSubmit, onClose, error }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Food, Transportation, Salary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingCategory ? 'Update' : 'Create'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}