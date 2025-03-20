import { useState, useEffect } from "react";
import axios from "axios";
import Login from "../components/Login";
import Header from "../components/Header";
import Body from "../components/Body";
import Foot from "../components/Foot";
import Footer from "@/components/Footer";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

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

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      <Header />
      <Body 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        users={users}
        products={products}
        reviews={reviews}
        name={name}
        email={email}
        password={password}
        price={price}
        description={description}
        userId={userId}
        productId={productId}
        rating={rating}
        comment={comment}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setPrice={setPrice}
        setDescription={setDescription}
        setUserId={setUserId}
        setProductId={setProductId}
        setRating={setRating}
        setComment={setComment}
        error={error}
        handleCreateUser={handleCreateUser}
        handleCreateProduct={handleCreateProduct}
        handleCreateReview={handleCreateReview}
        handleDeleteUser={handleDeleteUser}
        handleDeleteProduct={handleDeleteProduct}
        handleDeleteReview={handleDeleteReview}
      />
      <Foot />
      <Footer />
    </div>
  );
}
