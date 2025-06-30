import axios from "axios";

const Logout = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token trước khi logout:", token); // ✅ Kiểm tra token

    await axios.post("http://127.0.0.1:8000/api/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Logout thành công"); // ✅ Kiểm tra đã gọi API xong
  } catch (err) {
    console.log("Lỗi khi logout:", err); // ✅ Xem có lỗi không
  } finally {
    localStorage.removeItem("token");
    console.log("Xóa token và chuyển trang"); // ✅ Kiểm tra có vào đây không
    window.location.href = "/signin";
  }
};

export default Logout;
