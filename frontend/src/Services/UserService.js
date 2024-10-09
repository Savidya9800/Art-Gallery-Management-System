import axios from "axios";

const BASE_URL = "http://localhost:5000/api/bookingUsers";

class BookingUserService {
  async registerUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error registering user"
      );
    }
  }

  async loginUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error logging in");
    }
  }

  async getAllUsers() {
    try {
      const response = await axios.get(`${BASE_URL}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error fetching users");
    }
  }
  async getUserById() {
    try {
      const id = JSON.parse(localStorage.getItem("user").toString())["_id"];
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error fetching users");
    }
  }
  async getArtistById() {
    try {
      const id = JSON.parse(localStorage.getItem("artist").toString())["_id"];
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error fetching users");
    }
  }

  async updateUser(data) {
    try {
      const id = JSON.parse(localStorage.getItem("user").toString())["_id"];
      const response = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error fetching users");
    }
  }

  async deleteBookingUser(id) {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error deletein users");
    }
  }
}

export default new BookingUserService();
