import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [activeTab, setActiveTab] = useState("users");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, reviewsRes] = await Promise.all([
          axios.get("http://localhost:8000/users"),
          axios.get("http://localhost:8000/products"),
          axios.get("http://localhost:8000/reviews"),
        ]);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
        setReviews(reviewsRes.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Oops! Something went wrong.");
      }
    };
    fetchData();
  }, []);

  const handleCreateUser = async () => {
    try {
      await axios.post("http://localhost:8000/createUsers", { name, email, password });
      setName(""); setEmail(""); setPassword(""); setError(null);
      const usersRes = await axios.get("http://localhost:8000/users");
      setUsers(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating user");
    }
  };

  const handleCreateProduct = async () => {
    try {
      await axios.post("http://localhost:8000/createProduct", { name, price, description });
      setName(""); setPrice(""); setDescription(""); setError(null);
      const productsRes = await axios.get("http://localhost:8000/products");
      setProducts(productsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating product");
    }
  };

  const handleCreateReview = async () => {
    try {
      await axios.post("http://localhost:8000/createReview", { userId, productId, comment, rating });
      setUserId(""); setProductId(""); setComment(""); setRating(0); setError(null);
      const reviewsRes = await axios.get("http://localhost:8000/reviews");
      setReviews(reviewsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating review");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteUser/${userId}`);
      const usersRes = await axios.get("http://localhost:8000/users");
      setUsers(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting user");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteProduct/${productId}`);
      const productsRes = await axios.get("http://localhost:8000/products");
      setProducts(productsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting product");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteReview/${reviewId}`);
      const reviewsRes = await axios.get("http://localhost:8000/reviews");
      setReviews(reviewsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting review");
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      <header className="bg-[#f1f5f9] text-[#4a4a4a] py-6 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold text-[#2d2d2d]">E-Commerce Management</h1>
        </div>
      </header>

      <nav className="bg-white shadow-md py-4 sticky top-0">
        <div className="container mx-auto flex justify-center gap-8">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 text-lg font-medium rounded-full transition-all duration-200 ${
              activeTab === "users" ? "bg-blue-600 text-white" : "text-[#2d2d2d]"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2 text-lg font-medium rounded-full transition-all duration-200 ${
              activeTab === "products" ? "bg-blue-600 text-white" : "text-[#2d2d2d]"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-2 text-lg font-medium rounded-full transition-all duration-200 ${
              activeTab === "reviews" ? "bg-blue-600 text-white" : "text-[#2d2d2d]"
            }`}
          >
            Reviews
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-3xl font-semibold text-[#333] mb-6">Create a New User</h2>
            <div className="flex flex-wrap gap-6 mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full md:w-1/2 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full md:w-1/2 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full md:w-1/2 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleCreateUser}
              className="w-full md:w-1/4 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Create User
            </button>

            <h2 className="text-3xl font-semibold text-[#333] mt-10 mb-6">Users</h2>
            {users.map((user) => (
              <div key={user.user_id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <p className="text-xl font-semibold text-[#333]">{user.username}</p>
                <p className="text-[#555]">{user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user.user_id)}
                  className="mt-4 text-red-600 font-semibold"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-3xl font-semibold text-[#333] mb-6">Create a New Product</h2>
            <div className="flex flex-wrap gap-6 mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                className="w-full md:w-1/3 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="w-full md:w-1/3 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full md:w-1/3 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleCreateProduct}
              className="w-full md:w-1/4 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Create Product
            </button>

            <h2 className="text-3xl font-semibold text-[#333] mt-10 mb-6">Products</h2>
            {products.map((product) => (
              <div key={product.product_id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <p className="text-xl font-semibold text-[#333]">{product.name}</p>
                <p className="text-[#555]">${product.price}</p>
                <button
                  onClick={() => handleDeleteProduct(product.product_id)}
                  className="mt-4 text-red-600 font-semibold"
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-3xl font-semibold text-[#333] mb-6">Create a New Review</h2>
            <div className="flex flex-wrap gap-6 mb-6">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your review"
                className="w-full md:w-1/2 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                className="w-full md:w-1/4 p-4 border border-[#a7c5eb] rounded-lg text-[#333] focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleCreateReview}
              className="w-full md:w-1/4 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Create Review
            </button>

            <h2 className="text-3xl font-semibold text-[#333] mt-10 mb-6">Reviews</h2>
            {reviews.map((review) => (
              <div key={review.review_id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <p className="text-xl font-semibold text-[#333]">{review.comment}</p>
                <p className="text-[#555]">Rating: {review.rating} / 5</p>
                <button
                  onClick={() => handleDeleteReview(review.review_id)}
                  className="mt-4 text-red-600 font-semibold"
                >
                  Delete Review
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
