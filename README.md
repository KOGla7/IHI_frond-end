CREATE DATABASE IHI;
Use IHI;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    city VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    can_sell BOOLEAN DEFAULT TRUE,
    account_status ENUM('active', 'suspended', 'banned') DEFAULT 'active',
    UNIQUE INDEX idx_email (email)
);

CREATE TABLE UserStats (
    user_id INT PRIMARY KEY,
    items_sold INT DEFAULT 0,
    items_bought INT DEFAULT 0,
    total_sales DECIMAL(10,2) DEFAULT 0.00,
    total_purchases DECIMAL(10,2) DEFAULT 0.00,
    seller_rating DECIMAL(3,2) DEFAULT 0.00,
    buyer_rating DECIMAL(3,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Wallets (
    wallet_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    premium_currency DECIMAL(10,2) DEFAULT 0.00,
    earned_currency DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    UNIQUE INDEX idx_user_wallet (user_id)
);

CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    premium_price DECIMAL(10,2),
    earned_price DECIMAL(10,2),
    price DECIMAL(10,2),
    currency_type ENUM('premium', 'earned', 'both') NOT NULL,
    category_id INT,
    download_url VARCHAR(512),
    license_type VARCHAR(100),
    status ENUM('active', 'inactive', 'deleted') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE ProductPreview (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    reviewer_id INT NOT NULL,
    reviewed_user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_type ENUM('buyer_review', 'seller_review') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES Users(user_id),
    FOREIGN KEY (reviewed_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    product_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency_type ENUM('premium', 'earned') NOT NULL,
    status ENUM('pending', 'completed', 'refunded', 'cancelled') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES Users(user_id),
    FOREIGN KEY (seller_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    wallet_id INT NOT NULL,
    currency_type ENUM('premium', 'earned') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type ENUM('purchase', 'reward', 'refund', 'recharge', 'withdraw') NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (wallet_id) REFERENCES Wallets(wallet_id)
);

CREATE INDEX idx_product_user ON Products(user_id);
CREATE INDEX idx_order_buyer ON Orders(buyer_id);
CREATE INDEX idx_order_seller ON Orders(seller_id);
CREATE INDEX idx_review_product ON Reviews(product_id);
CREATE INDEX idx_transaction_user ON Transactions(user_id);
 
CREATE TABLE Wishlist (
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    UNIQUE INDEX idx_user_product (user_id, product_id)
);

 
CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

 
CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    product_id INT, 
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE ProductTags (
    product_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id),
    PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE SearchHistory (
    search_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    query VARCHAR(255) NOT NULL,
    searched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE PasswordResets (
    reset_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

 
CREATE TABLE ActivityLogs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE ProductViews (
    view_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT,
    viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Discounts (
    discount_id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    max_uses INT DEFAULT NULL,
    used_count INT DEFAULT 0,
    valid_from DATETIME,
    valid_until DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OrderDiscounts (
    order_id INT NOT NULL,
    discount_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (discount_id) REFERENCES Discounts(discount_id),
    PRIMARY KEY (order_id, discount_id)
);

CREATE TABLE SubscriptionPlans (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration_days INT NOT NULL,
    features TEXT
);

CREATE TABLE UserSubscriptions (
    subscription_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME,
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (plan_id) REFERENCES SubscriptionPlans(plan_id)
);

 
CREATE TABLE Languages (
    language_id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE ProductTranslations (
    translation_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    language_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (language_id) REFERENCES Languages(language_id)
);

 
CREATE TABLE AdminLogs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    performed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

CREATE TABLE Reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    report_type VARCHAR(100) NOT NULL,
    generated_by INT NOT NULL,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    file_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (generated_by) REFERENCES Users(user_id)
);

INSERT INTO Users (email, password_hash, full_name, country, city, timezone, can_sell, can_buy, is_admin, account_status)
VALUES 
('john.doe@example.com', 'hashedpassword1', 'John Doe', 'USA', 'New York', 'EST', TRUE, TRUE, FALSE, 'active'),
('jane.smith@example.com', 'hashedpassword2', 'Jane Smith', 'Canada', 'Toronto', 'EST', TRUE, TRUE, FALSE, 'active'),
('admin@example.com', 'adminpassword', 'Admin User', 'UK', 'London', 'GMT', FALSE, FALSE, TRUE, 'active');

-- Insert user stats
INSERT INTO UserStats (user_id, items_sold, items_bought, total_sales, total_purchases, seller_rating, buyer_rating)
VALUES 
(1, 5, 3, 100.00, 50.00, 4.5, 4.0),
(2, 2, 4, 40.00, 80.00, 3.8, 4.2);

-- Insert wallet data
INSERT INTO Wallets (user_id, premium_currency, earned_currency)
VALUES 
(1, 500.00, 200.00),
(2, 300.00, 100.00);

-- Insert categories
INSERT INTO Categories (name, description)
VALUES 
('Mathematics', 'All math-related papers'),
('Science', 'All science-related papers');

-- Insert products
INSERT INTO Products (user_id, name, description, premium_price, earned_price, currency_type, category_id, download_url, license_type, status)
VALUES 
(1, 'Algebra Homework', 'A well-structured algebra assignment.', 10.00, 5.00, 'both', 1, 'http://example.com/algebra.pdf', 'Standard', 'active'),
(2, 'Physics Lab Report', 'Detailed physics lab report.', 12.00, 6.00, 'both', 2, 'http://example.com/physics.pdf', 'Standard', 'active');

-- Insert product images
INSERT INTO ProductImages (product_id, url, is_primary)
VALUES 
(1, 'http://example.com/algebra.jpg', TRUE),
(2, 'http://example.com/physics.jpg', TRUE);

-- Insert orders
INSERT INTO Orders (buyer_id, seller_id, product_id, amount, currency_type, status)
VALUES 
(2, 1, 1, 10.00, 'premium', 'completed'),
(1, 2, 2, 12.00, 'premium', 'completed');

-- Insert reviews
INSERT INTO Reviews (reviewer_id, reviewed_user_id, product_id, rating, comment, review_type)
VALUES 
(2, 1, 1, 5, 'Great algebra work!', 'buyer_review'),
(1, 2, 2, 4, 'Well-written report.', 'buyer_review');

-- Insert transactions
INSERT INTO Transactions (user_id, wallet_id, currency_type, amount, transaction_type, description)
VALUES 
(2, 2, 'premium', -10.00, 'purchase', 'Bought Algebra Homework'),
(1, 1, 'premium', 10.00, 'reward', 'Sold Algebra Homework');

-- Insert wishlist items
INSERT INTO Wishlist (user_id, product_id)
VALUES 
(1, 2),
(2, 1);

-- Insert notifications
INSERT INTO Notifications (user_id, message)
VALUES 
(1, 'Your product has been purchased!'),
(2, 'You have received a new review!');

-- Insert messages
INSERT INTO Messages (sender_id, receiver_id, product_id, message)
VALUES 
(1, 2, 1, 'Is this assignment handwritten or typed?'),
(2, 1, 1, 'It is typed and well-formatted.');

-- Insert tags
INSERT INTO Tags (name)
VALUES 
('Homework'),
('Essay');

-- Link products to tags
INSERT INTO ProductTags (product_id, tag_id)
VALUES 
(1, 1),
(2, 2);

-- Insert search history
INSERT INTO SearchHistory (user_id, query)
VALUES 
(1, 'Algebra solutions'),
(2, 'Physics report');

-- Insert password resets
INSERT INTO PasswordResets (user_id, token, expires_at)
VALUES 
(1, 'resettoken1', NOW() + INTERVAL 1 DAY),
(2, 'resettoken2', NOW() + INTERVAL 1 DAY);

-- Insert activity logs
INSERT INTO ActivityLogs (user_id, activity_type, details)
VALUES 
(1, 'Login', 'User logged in from IP 192.168.1.1'),
(2, 'Purchase', 'Bought a physics report.');

-- Insert product views
INSERT INTO ProductViews (product_id, user_id)
VALUES 
(1, 2),
(2, 1);

-- Insert discount codes
INSERT INTO Discounts (code, discount_type, value, max_uses, valid_from, valid_until)
VALUES 
('BACKTOSCHOOL', 'percentage', 15.00, 100, NOW(), NOW() + INTERVAL 30 DAY),
('NEWUSER', 'fixed', 5.00, 50, NOW(), NOW() + INTERVAL 30 DAY);

-- Apply discount to an order
INSERT INTO OrderDiscounts (order_id, discount_id)
VALUES 
(1, 1);

-- Insert subscription plans
INSERT INTO SubscriptionPlans (name, price, duration_days, features)
VALUES 
('Basic Plan', 9.99, 30, 'Access to premium papers'),
('Pro Plan', 19.99, 90, 'Extended access and more.');

-- Insert user subscriptions
INSERT INTO UserSubscriptions (user_id, plan_id, end_date)
VALUES 
(1, 1, NOW() + INTERVAL 30 DAY),
(2, 2, NOW() + INTERVAL 90 DAY);

-- Insert languages
INSERT INTO Languages (code, name)
VALUES 
('en', 'English'),
('fr', 'French');

-- Insert product translations
INSERT INTO ProductTranslations (product_id, language_id, name, description)
VALUES 
(1, 2, 'Devoir d\'Algèbre', 'Un devoir d\'algèbre bien structuré.');

-- Insert admin logs
INSERT INTO AdminLogs (admin_id, action, details)
VALUES 
(3, 'Ban User', 'Banned user John Doe for policy violation.');

-- Insert reports
INSERT INTO Reports (report_type, generated_by, file_path)
VALUES 
('Sales Report', 3, '/reports/sales_report.pdf');

select * from Categories
