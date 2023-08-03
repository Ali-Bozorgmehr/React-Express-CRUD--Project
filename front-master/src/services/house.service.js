import http from "../http-common";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

class HouseDataService {
  postLogin(userData) {
    return http.post("/user/login", userData);
  }

  getAuthDashboard() {
    return http.get("/auth/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllRentsAuth() {
    return http.get("/auth/dashboard/rents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllRents() {
    return http.get("/rents");
  }

  getAllSellsAuth() {
    return http.get("/auth/dashboard/sells", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllSells() {
    return http.get("/sells");
  }

  getRentAuth(id) {
    return http.get(`/auth/dashboard/rents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getRent(id) {
    return http.get(`/rents/${id}`);
  }

  getSellAuth(id) {
    return http.get(`/auth/dashboard/sells/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getSell(id) {
    return http.get(`/sells/${id}`);
  }

  createRentAuth(data) {
    return http.post("/auth/dashboard/rents", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  createSellAuth(data) {
    return http.post("/auth/dashboard/sells", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateRentAuth(id, data) {
    return http.put(`/auth/dashboard/rents/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateSellAuth(id, data) {
    return http.put(`/auth/dashboard/sells/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteRentAuth(id) {
    return http.delete(`/auth/dashboard/houses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteAllRentsAuth() {
    return http.delete(`/auth/dashboard/rents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteAllSellsAuth() {
    return http.delete(`/auth/dashboard/sells`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  findRentByOwner(owner) {
    return http.get(`/auth/dashboard/rents?owner=${owner}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  findSellByOwner(owner) {
    return http.get(`/auth/dashboard/sells?owner=${owner}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new HouseDataService();
