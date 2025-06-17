import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";


export default function AuthCallback() {
  const location = useLocation();
//   const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      // Lưu token vào localStorage hoặc context nếu bạn sử dụng AuthContext
      localStorage.setItem("access_token", token);
      toast.success("Đăng nhập bằng Google thành công!");
    //   navigate("/dashboard"); // Chuyển đến Dashboard sau khi đăng nhập
    } else {
      toast.error("Đăng nhập bằng Google thất bại!");
    //   navigate("/login"); // Quay lại đăng nhập nếu có lỗi
    }
  }, [location]);

  return <div>Đang xử lý đăng nhập...</div>;
}
