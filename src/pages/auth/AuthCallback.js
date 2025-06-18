import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      toast.success("Đăng nhập bằng Google thành công!");
      navigate("/homepage"); 
    } else {
      toast.error("Đăng nhập bằng Google thất bại!");
      navigate("/login"); 
    }
  }, [location]);

  return <div>Đang xử lý đăng nhập...</div>;
}
