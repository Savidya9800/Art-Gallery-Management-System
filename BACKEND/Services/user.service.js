const BookingUser = require("../Models/user.model");
const jwt = require("jsonwebtoken");
class BookingUserService {
  async createBookingUser(userData) {
    try {
      const newUser = new BookingUser(userData);
      return await newUser.save();
    } catch (error) {
      console.error(error);
      throw new Error("Email is already in use");
    }
  }

  async getAllBookingUsers() {
    try {
      return await BookingUser.find({});
    } catch (error) {
      throw new Error("Error fetching booking users");
    }
  }

  async getUser(id) {
    try {
      return await BookingUser.findById(id);
    } catch (error) {
      throw new Error("Error fetching booking users");
    }
  }

  async getBookingUserByEmail(email) {
    try {
      return await BookingUser.findOne({ email });
    } catch (error) {
      throw new Error("Error fetching booking user");
    }
  }

  async loginUser(email, password) {
    try {
      const user = await this.getBookingUserByEmail(email);
      if (!user || !(await user.isPasswordValid(password))) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        "process.env.JWT_SECRET",
        { expiresIn: "5h" }
      );
      return { user, token };
    } catch (error) {
      throw new Error("Error during login");
    }
  }
  async updateBookingUser(userId, updateData) {
    try {
      return await BookingUser.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
    } catch (error) {
      throw new Error("Error updating booking user");
    }
  }

  async deleteBookingUser(userId) {
    try {
      return await BookingUser.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error("Error deleting booking user");
    }
  }
}

module.exports = new BookingUserService();
