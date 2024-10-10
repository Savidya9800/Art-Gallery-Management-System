const BookingUser = require("../Models/user.model");
const jwt = require("jsonwebtoken");

class BookingUserService {
  // Create a new user
  async createBookingUser(userData) {
    try {
      const newUser = new BookingUser(userData);
      return await newUser.save();
    } catch (error) {
      console.error(error);
      throw new Error("Email is already in use");
    }
  }

  // Fetch all users
  async getAllBookingUsers() {
    try {
      return await BookingUser.find({});
    } catch (error) {
      throw new Error("Error fetching booking users");
    }
  }

  // Fetch a user by ID
  async getUser(id) {
    try {
      return await BookingUser.findById(id);
    } catch (error) {
      throw new Error("Error fetching booking users");
    }
  }

  // Fetch a user by email
  async getBookingUserByEmail(email) {
    try {
      return await BookingUser.findOne({ email });
    } catch (error) {
      throw new Error("Error fetching booking user");
    }
  }

  // User login
  async loginUser(email, password) {
    try {
      const user = await this.getBookingUserByEmail(email);
      if (!user || !(await user.isPasswordValid(password))) {
        throw new Error("Invalid email or password");
      }
      // Generate JWT token for the user
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        "process.env.JWT_SECRET", // You should replace this with an actual secret
        { expiresIn: "5h" }
      );
      return { user, token };
    } catch (error) {
      throw new Error("Error during login");
    }
  }

  // Update user details
  async updateBookingUser(userId, updateData) {
    try {
      return await BookingUser.findByIdAndUpdate(userId, updateData, {
        new: true,  // Return the updated user document
      });
    } catch (error) {
      throw new Error("Error updating booking user");
    }
  }

  // **DELETE FUNCTION TO IMPLEMENT** - Here's where you modify/delete a user
  async deleteBookingUser(userId) {
    try {
      // Deletes the user by ID
      return await BookingUser.findByIdAndDelete(userId); // The method already handles the deletion
    } catch (error) {
      console.error(error);  // Log the error for debugging
      throw new Error("Error deleting booking user"); // Throw an error message if something goes wrong
    }
  }
}

module.exports = new BookingUserService();

