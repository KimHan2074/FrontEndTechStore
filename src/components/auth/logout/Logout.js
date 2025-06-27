import axios from "axios";
import React from "react";
const logout = async ()=>{
    try {
        const token = localStorage.getItem("token");

        await axios.post("http://127.0.0.1:8000/api/auth/logout",{},{
            headers :{
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.removeItem("token");
        window.location.href = "/signin";
    }catch(err){
        console.log("Lỗi khi logout:", err);
    }
}

export default logout;