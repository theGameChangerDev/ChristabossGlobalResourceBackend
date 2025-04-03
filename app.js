const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');

dotenv.config()

app.use(express.json())
app.use(cors());

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  // Initialize database with contact_form table
  async function initializeDatabase() {
    try {
      const connection = await pool.getConnection();
      await connection.query(`
        CREATE TABLE IF NOT EXISTS contact_form (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Database initialized successfully");
      connection.release();
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }

initializeDatabase();

app.get('/api/form', (req, res) => {
    res.send('Form API endpoint')
})

app.post("/api/form", async (req, res) => {
    console.log(req.body)

    try {
    // Process form data - save to MySQL
    const { name, phone, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and order details are required"
      });
    }

    // Insert data into database
    const [result] = await pool.query(
        'INSERT INTO contact_form (name, phone, email, message) VALUES (?, ?, ?, ?)',
        [name, phone, email, message]
      );

    // Optional: Send email notification
    // Uncomment if you want to send email notifications
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'oluseyiolu123@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Message: ${message}
      `
    });

        // Send a success response back to the client
        res.status(200).json({ 
            success: true, 
            message: "Form submitted successfully!",
            id: result.insertId
        });
    } catch (error) {
        console.error("Error processing form:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to process form" 
        });
    }
})

// Health check endpoint for ALB
app.get('/healthstatus', (req, res) => {
  res.status(200).send('OK');
});

const Port = process.env.PORT || 3000;

app.listen(Port, (req, res) => {
    console.log(`Server is now running on port ${Port}`)
})
