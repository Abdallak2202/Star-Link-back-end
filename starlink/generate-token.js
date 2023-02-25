const jwt = require('jsonwebtoken');

// Set the secret key for signing the token. This should be a secret value that is not shared.
const secretKey = 'my-secret-key';

// Set the expiration time for the token in seconds.
const expiresIn = 3600; // 1 hour

// Set the data that you want to include in the token. This can be any JSON data.
const tokenData = {
  username: 'john.doe',
  email: 'john.doe@example.com'
};

// Generate the token using the jwt.sign() method.
const token = jwt.sign(tokenData, secretKey, { expiresIn });

// Print the token to the console.
console.log(token);
