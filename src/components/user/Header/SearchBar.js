import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../pages/user/Header/Header.css";
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();
    if (trimmed === "") return;

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products/list");
      const products = res.data?.data || []; 

      const keyword = trimmed.toLowerCase();
      
      const productMatch = products.find(
        (p) =>
          p.name?.toLowerCase().includes(keyword) ||
          p.description?.toLowerCase().includes(keyword)
      );

      if (productMatch) {
        console.log("✅ Tìm thấy sản phẩm:", productMatch);
        return navigate("/user/Product", {
          state: { searchQuery: trimmed },
        });
      }

      alert("Không tìm thấy sản phẩm phù hợp.");
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm sản phẩm:", error);
      alert("Đã xảy ra lỗi khi tìm kiếm sản phẩm.");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <Search size={18} />
      </button>
    </form>
  );
}

export default SearchBar;
