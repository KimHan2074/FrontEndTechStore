import axios from "axios";

const Logout = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token trước khi logout:", token); 

    await axios.post("http://127.0.0.1:8000/api/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Logout thành công"); 
  } catch (err) {
    console.log("Lỗi khi logout:", err);
  } finally {
    localStorage.clear();
    console.log("Xóa token và chuyển trang"); 
    window.location.href = "/signin";
  }
};

export default Logout;
