// scripts/createUser.js
const { User } = require('../models');  // Adjust the path to your models folder

async function createUser() {
  try {
    const password = '4ncY2jYv';  // Replace with your desired password

    const newUser = await User.create({
      username: 'ChatGPT',
      email: 'chatgpt@madsens.dev',
      password: password,
      firstName: 'Chat',
      lastName: 'GPT',
      role: 'admin',  // or 'admin', 'moderator'
      profilePicture: null,
    });

    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();