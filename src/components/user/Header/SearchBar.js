import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../pages/user/Header/Header.css";


function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/user/product?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`);
  };


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };


  const handleSearchSubmit = async (e) => {
    e.preventDefault();


    const trimmed = searchQuery.trim();
    if (trimmed === "") return;


    try {
      const fetchAllProducts = async () => {
        let page = 1;
        const perPage = 100;
        let allProducts = [];
        let hasMore = true;


        while (hasMore) {
          const res = await axios.get(
            "https://backendtechstore1-production.up.railway.app/api/products/list",
            { params: { page, per_page: perPage } }
          );


          const products = res.data?.data || [];
          allProducts = allProducts.concat(products);
          hasMore = products.length === perPage;
          page++;
        }


        return allProducts;
      };


      const products = await fetchAllProducts();
      const keyword = trimmed.toLowerCase();


      const matchedProducts = products.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const description = (p.description || "").toLowerCase();
        return keyword && (name.includes(keyword) || description.includes(keyword));
      });


      if (matchedProducts.length > 0) {
        matchedProducts.forEach((product, index) => {
        });
        const firstProduct = matchedProducts[0];
        const categoryName = firstProduct.category?.name;
        handleCategoryClick(firstProduct.category_id, categoryName);
        return;
      }


      if (matchedProducts.length === 0) {
        alert("❌ No matching products found!!!");
        return;
      }
    } catch (error) {
      console.error("❌ Search error:", error);
      alert("An error occurred while searching for products.");
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
