import { useState, useRef, useEffect } from "react";
import "../../../pages/user/Product/Product.css";
import DescriptionTab from "./DescriptionTab";
import SpecificationsTab from "./SpecificationsTab";
import ReviewsTab from "./ReviewsTab";
import ReviewModal from "./ReviewModal";
import {
    ShoppingCart,
    Heart,
    CreditCard,
    Truck,
    ShieldCheck,
    RotateCcw,
    CirclePlus,
} from "lucide-react";
const ProductDetail = () => {
    const [selectedColor, setSelectedColor] = useState("Đen");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("specifications");
    const [mainImage, setMainImage] = useState(
        "https://mccvietnam.vn/media/lib/14-12-2022/bpcmccv13mncasekm.jpg"
    );
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const slider = scrollRef.current;
        let isDown = false;
        let startX;
        let scrollLeft;

        const mouseDownHandler = (e) => {
            isDown = true;
            slider.classList.add("dragging");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        const mouseLeaveHandler = () => {
            isDown = false;
            slider.classList.remove("dragging");
        };

        const mouseUpHandler = () => {
            isDown = false;
            slider.classList.remove("dragging");
        };

        const mouseMoveHandler = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener("mousedown", mouseDownHandler);
        slider.addEventListener("mouseleave", mouseLeaveHandler);
        slider.addEventListener("mouseup", mouseUpHandler);
        slider.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            slider.removeEventListener("mousedown", mouseDownHandler);
            slider.removeEventListener("mouseleave", mouseLeaveHandler);
            slider.removeEventListener("mouseup", mouseUpHandler);
            slider.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, []);
    const [isFavorite, setIsFavorite] = useState(false);
    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return <DescriptionTab />;
            case "specifications":
                return <SpecificationsTab />;
            case "reviews":
                return <ReviewsTab />;
            default:
                return null;
        }
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 99) {
            setQuantity(newQuantity);
        }
    };

    const relatedProducts = [
        { id: 1, name: "Product 1", price: "1.000.000", originalPrice: "1.200.000", image: "https://cdn.tgdd.vn/Files/2019/10/27/1212736/cach-chon-mua-man-hinh-may-tinh-tot-ben-dep-va-phu-hop-nhu-cau-26.jpg", promotion_type: "hot", rating: 4 },
        { id: 2, name: "Product 2", price: "1.200.000", originalPrice: "1.200.000", image: "https://mccvietnam.vn/media/lib/14-12-2022/bpcmccv13mncasekm.jpg", promotion_type: "hot", rating: 5 },
        { id: 3, name: "Product 3", price: "1.500.000", originalPrice: "1.200.000", image: "https://cdn.tgdd.vn/Files/2019/10/27/1212736/cach-chon-mua-man-hinh-may-tinh-tot-ben-dep-va-phu-hop-nhu-cau-26.jpg", promotion_type: "hot", rating: 3 },
        { id: 4, name: "Product 4", price: "1.800.000", originalPrice: "1.200.000", image: "https://mccvietnam.vn/media/lib/14-12-2022/bpcmccv13mncasekm.jpg", promotion_type: "hot", rating: 4 },
        { id: 5, name: "Product 5", price: "2.000.000", originalPrice: "1.200.000", image: "https://cdn.tgdd.vn/Files/2019/10/27/1212736/cach-chon-mua-man-hinh-may-tinh-tot-ben-dep-va-phu-hop-nhu-cau-26.jpg", promotion_type: "hot", rating: 4 }
    ];
    const renderStars = (rating) => {
        return (
            <div className="star-rating">
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`star ${i < rating ? "filled" : ""}`}>★</span>
                ))}
            </div>
        );
    };

    const handleAddToCart = () => {
        alert(`Added ${quantity} item(s) to the cart!`);
    };

    const thumbnails = [
        "https://mccvietnam.vn/media/lib/14-12-2022/bpcmccv13mncasekm.jpg",
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_11_27_638366828603239952_hinh-nen-may-tinh-dep.jpg",
        "https://cdn.tgdd.vn/Files/2017/01/19/939425/cach-cai-hinh-nen-may-tinh-khong-bi-mo_1280x720-800-resize.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvhiAkbJ-wnOEjnTRhRQMZX-bf1Ro_gg25Yg&s",
    ];

    return (
        <div className="container-product-detail">
            <div className="product-section-product-detail">
                <div className="product-images-product-detail">
                    <img
                        src={mainImage || "/placeholder.svg"}
                        alt="TechPro RGB Gaming Mechanical Keyboard"
                        className="main-image-product-detail"
                    />
                    <div className="thumbnail-gallery-product-detail">
                        {thumbnails.map((thumb, index) => (
                            <img
                                key={index}
                                src={thumb || "/placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                className={`thumbnail-product-detail ${mainImage === thumb ? "active-product-detail" : ""}`}
                                onClick={() => setMainImage(thumb)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info-product-detail">
                    <h1 className="product-title-product-detail">Bàn phím cơ TechPro RGB Gaming Mechanical</h1>

                    <div className="price-section-product-detail">
                        <span className="current-price-product-detail">1.690.000đ</span>
                        <span className="original-price-product-detail">1.990.000đ</span>
                    </div>

                    <div className="product-options-product-detail">
                        <div className="option-group-product-detail">
                            <label className="option-label-product-detail">Colors:</label>
                            <div className="color-options-product-detail">
                                {["Đen", "Trắng"].map((color) => (
                                    <button
                                        key={color}
                                        className={`color-option-product-detail ${selectedColor === color ? "active-product-detail" : ""}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="quantity-section-product-detail">
                        <label className="option-label-product-detail">Quanlity:</label>
                        <div className="quantity-controls-product-detail">
                            <button className="quantity-btn-product-detail" onClick={() => handleQuantityChange(-1)}>
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                                className="quantity-input-product-detail"
                                min="1"
                                max="99"
                            />
                            <button className="quantity-btn-product-detail" onClick={() => handleQuantityChange(1)}>
                                +
                            </button>
                        </div>
                        <span className="stock-info-product-detail">Only 94 items left</span>
                    </div>

                    <div className="action-buttons-product-detail">
                        <button className="add-to-cart-btn-product-detail" onClick={handleAddToCart}>
                            <ShoppingCart color="#fff" size={25} style={{ marginRight: 8 }} />
                            Add to Cart
                        </button>
                        <div className="secondary-actions-product-detail">
                            <button className="secondary-btn-product-detail"><CreditCard size={18} color="#000000" style={{ marginRight: 8 }} /> Purchase</button>
                            <button
                                className="secondary-btn-product-detail"
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <Heart
                                    size={18}
                                    color={isFavorite ? "#FF0000" : "#000000"}
                                    style={{ marginRight: 8 }}
                                />
                                {isFavorite ? "Added to Favorite" : "Add to Favorite"}
                            </button>
                        </div>
                    </div>

                    <div className="trust-badges-product-detail">
                        <div className="badge-product-detail">
                            <span><Truck strokeWidth={3} size={22} color="#13830C" /></span>
                            <span>Free Shipping</span>
                        </div>
                        <div className="badge-product-detail">
                            <span><ShieldCheck strokeWidth={3} size={22} color="#0980CD" /></span>
                            <span>Official Warranty</span>
                        </div>
                        <div className="badge-product-detail">
                            <span><RotateCcw strokeWidth={3} size={22} color="#FF0000" /></span>
                            <span>Easy Returns</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="specifications-product-detail">
                <div className="spec-tabs-product-detail">
                    <button
                        className={`spec-tab-product-detail ${activeTab === "description" ? "active-product-detail" : ""}`}
                        onClick={() => setActiveTab("description")}
                    >
                        Product Description
                    </button>
                    <button
                        className={`spec-tab-product-detail ${activeTab === "specifications" ? "active-product-detail" : ""}`}
                        onClick={() => setActiveTab("specifications")}
                    >
                        Specifications
                    </button>
                    <button
                        className={`spec-tab-product-detail ${activeTab === "reviews" ? "active-product-detail" : ""}`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            Reviews (3)
                            <CirclePlus
                                size={18}
                                style={{ marginLeft: 8, cursor: "pointer" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsReviewModalOpen(true);
                                }}
                            />

                        </div>
                    </button>

                </div>

                <div className={`tab-content ${activeTab === "specifications" ? "with-border" : ""}`}>
                    {renderTabContent()}
                </div>
            </div>
            {isReviewModalOpen && <ReviewModal onClose={() => setIsReviewModalOpen(false)} />}
            <div className="related-products-product-detail">
                <h2 className="section-title-product-detail">Product Related</h2>
                <div className="products-grid-product-detail" ref={scrollRef}>
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="product-card-product-detail">
                            {product.promotion_type && (
                                <div className="promotion_type-badge-product-detail">
                                    {product.promotion_type}
                                </div>
                            )}
                            <img src={product.image} alt={product.name} />
                            <h4>{product.name}</h4>
                            <div className="star-product-detail">{renderStars(product.rating)}</div>
                            <div className="price-product-detail">
                                <span className="current-price">${product.price}</span>
                                <span className="original-price">${product.originalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
