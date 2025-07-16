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
      localStorage.setItem("token", token);
      toast.success("Sign in with Google successful!");
      navigate("/"); 
    } else {
      toast.error("Google login failed!");
      navigate("/signin"); 
    }
  }, [location]);

  return <div>Processing login...</div>; 
}
