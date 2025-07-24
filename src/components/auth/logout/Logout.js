import axios from "axios";

const Logout = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post("https://backendtechstore1-production.up.railway.app/api/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Logout successful"); 
  } catch (err) {
    console.log("Error when logout:", err);
  } finally {
    localStorage.clear();
    window.location.href = "/signin";
  }
};

export default Logout;
