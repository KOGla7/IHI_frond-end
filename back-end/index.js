const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "Nest123$", 
  database: "e_commerse1",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

app.post("/createUsers", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ id: result.insertId, name, email });
    }
  });
});

app.put("/updateUser/:id", (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;
  const query = "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?";
  db.query(query, [name, email, password, userId], (err, result) => {
    if (err) {
      res.status(500).send("Error updating user");
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE user_id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting user");
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  });
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching products");
    } else {
      res.json(results);
    }
  });
});

app.post("/createProduct", (req, res) => {
  const { product_name, price, description } = req.body;
  const query = "INSERT INTO products (product_name, price, description) VALUES (?, ?, ?)";
  db.query(query, [product_name, price, description], (err, result) => {
    if (err) {
      res.status(500).send("Error creating product");
    } else {
      res.status(201).json({ id: result.insertId, product_name, price, description });
    }
  });
});

app.put("/updateProduct/:id", (req, res) => {
  const { product_name, price, description } = req.body;
  const productId = req.params.id;
  const query = "UPDATE products SET product_name = ?, price = ?, description = ? WHERE product_id = ?";
  db.query(query, [, price, description, productId], (err, result) => {
    if (err) {
      res.status(500).send("Error updating product");
    } else {
      res.status(200).json({ message: "Product updated successfully" });
    }
  });
});

app.delete("/deleteProduct/:id", (req, res) => {
  const productId = req.params.id;
  const query = "DELETE FROM products WHERE product_id = ?";
  db.query(query, [productId], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting product");
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  });
});

app.get("/reviews", (req, res) => {
  const query = `
    SELECT r.review_id, u.username, p.name AS product, r.comment, r.rating, r.created_at
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    JOIN products p ON r.product_id = p.product_id;
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching reviews");
    } else {
      res.json(results);
    }
  });
});

app.post("/createReview", (req, res) => {
  const { user_id, product_id, comment, rating } = req.body;
  const query = "INSERT INTO reviews (user_id, product_id, comment, rating) VALUES (?, ?, ?, ?)";
  
  db.query(query, [user_id, product_id, comment, rating], (err, result) => {
    if (err) {
      console.error("Error creating review:", err);
      res.status(500).send("Error creating review");
    } else {
      res.status(201).json({ id: result.insertId, user_id, product_id, comment, rating });
    }
  });
});

app.put("/updateReview/:id", (req, res) => {
  const { comment, rating } = req.body;
  const reviewId = req.params.id;
  const query = "UPDATE reviews SET comment = ?, rating = ? WHERE review_id = ?";
  
  db.query(query, [comment, rating, reviewId], (err, result) => {
    if (err) {
      console.error("Error updating review:", err);
      res.status(500).send("Error updating review");
    } else {
      res.status(200).json({ message: "Review updated successfully" });
    }
  });
});

// Delete a review
app.delete("/deleteReview/:id", (req, res) => {
  const reviewId = req.params.id;
  const query = "DELETE FROM reviews WHERE review_id = ?";
  
  db.query(query, [reviewId], (err, result) => {
    if (err) {
      console.error("Error deleting review:", err);
      res.status(500).send("Error deleting review");
    } else {
      res.status(200).json({ message: "Review deleted successfully" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
