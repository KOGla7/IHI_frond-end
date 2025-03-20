import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [userForm, setUserForm] = useState({
    full_name: '',
    email: '',
    password_hash: '',
    country: '',
    city: '',
    account_status: 'active'
  });
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [usersRes, productsRes] = await Promise.all([
        axios.get('http://localhost:8000/users'),
        axios.get('http://localhost:8000/products')
      ]);
      
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserFormChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProductFormChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/createUsers', userForm);
      if (response.status === 201) {
        setShowUserForm(false);
        setUserForm({
          full_name: '',
          email: '',
          password_hash: '',
          country: '',
          city: '',
          account_status: 'active'
        });
        fetchData();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create user');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/updateUser/${currentUser.user_id}`,
        userForm
      );
      if (response.status === 200) {
        setCurrentUser(null);
        setShowUserForm(false);
        setUserForm({
          full_name: '',
          email: '',
          password_hash: '',
          country: '',
          city: '',
          account_status: 'active'
        });
        fetchData();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteUser/${userId}`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/createProduct/0', productForm);
      if (response.status === 201) {
        setShowProductForm(false);
        setProductForm({
          name: '',
          description: '',
          price: '',
          category_id: ''
        });
        fetchData();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/updateProduct/${currentProduct.product_id}`,
        productForm
      );
      if (response.status === 200) {
        setCurrentProduct(null);
        setShowProductForm(false);
        setProductForm({
          name: '',
          description: '',
          price: '',
          category_id: ''
        });
        fetchData();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteProduct/${productId}`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete product');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Admin Panel</h1>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          {loading ? (
            <div className="text-center">Loading users...</div>
          ) : (
            <>
          <button 
            onClick={() => {
              setShowUserForm(true);
              setCurrentUser(null);
              setUserForm({
                full_name: '',
                email: '',
                password_hash: '',
                country: '',
                city: '',
                account_status: 'active'
              });
            }}
            className="w-full mb-4 flex items-center justify-between px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            <span>Add User</span>
          </button>
          
          {showUserForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg">
              <form onSubmit={currentUser ? handleUpdateUser : handleCreateUser} className="space-y-4">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={userForm.full_name}
                  onChange={handleUserFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={handleUserFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  required
                />
                <input
                  type="password"
                  name="password_hash"
                  placeholder="Password"
                  value={userForm.password_hash}
                  onChange={handleUserFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={userForm.country}
                  onChange={handleUserFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={userForm.city}
                  onChange={handleUserFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <select
                  name="account_status"
                  value={userForm.account_status}
                  onChange={handleUserFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all"
                >
                  {currentUser ? 'Update User' : 'Create User'}
                </button>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {users.map(user => (
              <div key={user.user_id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{user.full_name}</h3>
                  <span className={`text-sm font-medium ${
                    user.account_status === 'active' ? 'text-green-600' : 
                    user.account_status === 'suspended' ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {user.account_status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Country: {user.country}</p>
                <div className="mt-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                    onClick={() => {
                      setCurrentUser(user);
                      setUserForm({
                        full_name: user.full_name,
                        email: user.email,
                        password_hash: '',
                        country: user.country,
                        city: user.city,
                        account_status: user.account_status
                      });
                      setShowUserForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all"
                    onClick={() => handleDeleteUser(user.user_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

            </>
          )}
        </div>
        {/* Products Section */}
        {/* Products Section */}

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <>
          <button 
            onClick={() => {
              setShowProductForm(true);
              setCurrentProduct(null);
              setProductForm({
                name: '',
                description: '',
                price: '',
                category_id: ''
              });
            }}
            className="w-full mb-4 flex items-center justify-between px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            <span>Add Product</span>
          </button>

          {showProductForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg">
              <form onSubmit={currentProduct ? handleUpdateProduct : handleCreateProduct} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  required
                />
                <input
                  type="text"
                  name="category_id"
                  placeholder="Category ID"
                  value={productForm.category_id}
                  onChange={handleProductFormChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all"
                >
                  {currentProduct ? 'Update Product' : 'Create Product'}
                </button>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {products.map(product => (
              <div key={product.product_id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                <p className="text-sm text-gray-600">Status: {product.status}</p>
                <div className="mt-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                    onClick={() => {
                      setCurrentProduct(product);
                      setProductForm({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        category_id: product.category_id
                      });
                      setShowProductForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all"
                    onClick={() => handleDeleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminPanel;
