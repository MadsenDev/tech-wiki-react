const { comparePassword } = require('../utils/passwordUtils');

// Debugging comparison directly (add temporarily)
const testPasswordMatch = async () => {
    const plainPassword = '4ncY2jYv';
    const hashedPassword = '$2b$10$eYBPeGLKK7zWm./DvdnH8OE3tZjc8D2dPv5yHXOdSUVuG95ErWM5u'; // Your stored hash
    const isMatch = await comparePassword(plainPassword, hashedPassword);
    console.log("Direct comparison result:", isMatch);
  };
  
  testPasswordMatch();