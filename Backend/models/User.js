const mongoose = require('mongoose');

// Define a new schema for user registration
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Only allow these values
        default: 'user'           // Default to 'user' role
    },
    email: {
        type: String,
        required: true,
        unique: true,     // Ensures email addresses are unique in the collection
        lowercase: true,  // Stores the email in lowercase
        trim: true,        // Removes leading and trailing whitespaces
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    phonenumber: {
      type: String,
      required: false,
  },
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
