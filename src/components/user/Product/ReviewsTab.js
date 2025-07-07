import "../../../pages/user/Product/Product.css";
const ReviewsTab = () => {
  const reviews = [
    {
      name: "Nguyễn Văn A",
      date: "15/11/2024",
      content: "Bàn phím rất tốt, gõ êm, đèn RGB đẹp. Đáng tiền!",
      rating: 5,
    },
    {
      name: "Trần Thị B",
      date: "10/11/2024",
      content: "Chất lượng ổn, thiết kế đẹp. Chỉ hơi to so với bàn làm việc của mình.",
      rating: 4,
    },
    {
      name: "Lê Minh C",
      date: "05/11/2024",
      content: "Tuyệt vời! Switch mechanical rất nhạy, phù hợp cho gaming.",
      rating: 5,
    },
    {
      name: "Lê Minh C",
      date: "05/11/2024",
      content: "Tuyệt vời! Switch mechanical rất nhạy, phù hợp cho gaming.",
      rating: 5,
    },
    {
      name: "Lê Minh C",
      date: "05/11/2024",
      content: "Tuyệt vời! Switch mechanical rất nhạy, phù hợp cho gaming.",
      rating: 5,
    },
    {
      name: "Lê Minh C",
      date: "05/11/2024",
      content: "Tuyệt vời! Switch mechanical rất nhạy, phù hợp cho gaming.",
      rating: 5,
    },
    {
      name: "Lê Minh C",
      date: "05/11/2024",
      content: "Tuyệt vời! Switch mechanical rất nhạy, phù hợp cho gaming.",
      rating: 5,
    },
    {
      name: "Lê Minh C",
      date: "05/11/2024",
      content: "Tuyệt vời! Switch mechanical rất nhạy, phù hợp cho gaming.",
      rating: 5,
    },

  ];

  const getInitials = (name) => {
    return name.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase();
  };

  return (
    <div className="reviews-container">
      <h3 className="reviews-title">🗨️ Đánh giá từ khách hàng</h3>

      <div className="reviews-scrollable">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-avatar">{getInitials(review.name)}</div>
            <div className="review-content">
              <div className="review-header">
                <strong>{review.name}</strong>
                <span className="review-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? "filled" : ""}`}>★</span>
                  ))}
                </span>
                <span className="review-date">{review.date}</span>
              </div>
              <p>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
