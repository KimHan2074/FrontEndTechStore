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
      const blogsRes = await axios.get("http://localhost:8000/api/user/blogs/index");
      const keyword = trimmed.toLowerCase();

      const blogMatch = blogsRes.data.find(
        (b) =>
          b.title.toLowerCase().includes(keyword) ||
          b.content.toLowerCase().includes(keyword)
      );

      if (blogMatch) {
        console.log("✅ Tìm thấy bài viết:", blogMatch);
        return navigate("/user/blog", { state: { searchQuery: trimmed } });
      }

      alert("Không tìm thấy bài viết phù hợp.");
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      alert("Đã xảy ra lỗi khi tìm kiếm bài viết.");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-container">
      <input
        type="text"
        placeholder="Search..."
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
