const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');



const app = express();
const port = process.env.PORT || 3000;

// Secret key for JWT token signing.
const JWT_SECRET_KEY = 'your-secret-key';

app.use(cors());
app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'personal',
  password: '1234',
  database: 'data',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Database connected successfully');
  }
});



// Registration endpoint
app.post('/register', async (req, res) => {
  const { roleId, email, firstName, lastName, password, countryId } = req.body;
  try {
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const insertQueryUser = 'INSERT INTO users ( RoleID, CountryID, Email, Password) VALUES ( ?, ?, ?, ?)';
    //const insertQueryCountry = 'INSERT INTO countries ()'
    db.query(insertQueryUser, [ roleId, countryId, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Registration failed: ', err);
        res.status(500).json({ message: 'Registration failed' });
      } else {
        console.log(req.body);
        res.status(201).json({ message: 'Registration successful' });
      }
    });
  } catch (error) {
    console.error('Error during registration: ', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Define a middleware to verify JWT tokens
function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Example of a protected route that requires a valid token
app.get('/welcome', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route!' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { roleId, email, password } = req.body;

    // Retrieve user data from the database based on the role ID

    const selectQueryUsers = 'SELECT * FROM users WHERE BINARY Email = ? AND RoleID = ?';

    db.query(selectQueryUsers, [email, roleId], async (err, results) => {
      if (err) {
        console.error('Login failed: ', err);
        res.status(500).json({ message: 'Login failed' });
      } else if (results.length === 0) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.Password);

        if (!passwordMatch) {
          res.status(401).json({ message: 'Invalid email or password' });
        } else {
          // Generate a JWT token
          const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
            expiresIn: '1h', // Token expiration time (adjust as needed)
          });

          res.status(200).json({ token });
        }
      }
    });
  } catch (error) {
    console.error('Error during login: ', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Login endpoint for superadmins
app.post('/loginNavigate', async (req, res) => {
  try {
    const { superAdminID, password } = req.body;

    // Authenticate the superadmin and retrieve the password
    const query = `
      SELECT Users.Password
      FROM Users
      INNER JOIN SuperAdmins ON Users.UserID = SuperAdmins.UserID
      WHERE SuperAdmins.SuperAdminID = ?;
    `;

    db.query(query, [superAdminID], async (err, results) => {
      if (err) {
        console.error('Login failed: ', err);
        return res.status(500).json({ message: 'Login failed' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid SuperAdmin ID' });
      }

      const userPassword = results[0].Password;

      // Compare the provided password with the retrieved password
      const passwordMatch = await bcrypt.compare(password, userPassword);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Passwords match, allow navigation to the welcome page
      res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    console.error('Error during login: ', error);
    res.status(500).json({ message: 'Login failed' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 