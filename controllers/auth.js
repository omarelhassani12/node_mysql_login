const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');



    // Extracting values from the request body
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;

    // Alternatively, you can use object destructuring to extract values
    // const { name, email, password } = req.body;

exports.register = (req, res) => {
    console.log(req.body); // Logging the request body to the console

    // Extracting values from the request body using object destructuring
    const { name, email, password } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.render('register', {
                message: "An error occurred"
            });
        }

        if (results && results.length > 0) {
            return res.render('register', {
                message: "That email address is already registered"
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
          
            // Insert the user data into the database
            db.query(
              'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
              [name, email, hashedPassword],
              (error, results) => {
                if (error) {
                  console.log(error);
                  return res.render('register', {
                    message: "An error occurred"
                  });
                }
          
                console.log(results);
                res.render('./login');
              }
            );
          } catch (error) {
            console.log(error);
            res.render('register', {
              message: "An error occurred"
            });
          }
          
    });
};


exports.login = (req, res) => {
    console.log(req.body); // Logging the request body to the console
  
    const { email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.render('login', {
          message: "An error occurred"
        });
      }
  
      if (results.length === 0) {
        return res.render('login', {
          message: "Invalid email or password"
        });
      }
  
      try {
        const isPasswordMatch = await bcrypt.compare(password, results[0].password);
  
        if (!isPasswordMatch) {
          return res.render('login', {
            message: "Invalid email or password"
          });
        }
  
        // Create a JWT token
        const token = jwt.sign({ id: results[0].id, name: results[0].name, email: results[0].email }, 'your_secret_key');
  
        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });
  


        // Login successful
        res.render('./index', {
          userName: results[0].name,
          userEmail: results[0].email
        });
      } catch (error) {
        console.log(error);
        res.render('login', {
          message: "An error occurred"
        });
      }
    });
  };
  

  exports.logout = (req, res) => {
    // Perform any necessary logout actions, such as clearing session data
  
    // Clear the token cookie
    try {
      res.clearCookie('token');
    } catch (error) {
      console.log(error);
    }
  
    // Redirect the user to the login page or any other desired page
    res.redirect('/login');
  };
  