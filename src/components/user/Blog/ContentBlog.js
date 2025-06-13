import React from "react";
import "../../../pages/Blog/Blog.css";

const ContentBlog = () => {
    const cards = [
        {
            id: 1,
            image: "https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg",
            author: "Cameron",
            date: "1 Feb, 2020",
            title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
            description:
                "Mauris scelerisque nisl id rutrum volutpat. Pellentesque urna nisi, suscipit at tortor vitae, hendrerit blandit lorem.",
            isActive: false,
        },
        {
            id: 2,
            image: "https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg",
            author: "Cameron",
            date: "1 Feb, 2020",
            title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
            description:
                "Mauris scelerisque nisl id rutrum volutpat. Pellentesque urna nisi, suscipit at tortor vitae, hendrerit blandit lorem.",
            isActive: false,
        },
        {
            id: 3,
            image: "https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg",
            author: "Cameron",
            date: "1 Feb, 2020",
            title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
            description:
                "Mauris scelerisque nisl id rutrum volutpat. Pellentesque urna nisi, suscipit at tortor vitae, hendrerit blandit lorem.",
            isActive: true,
        },
        {
            id: 4,
            image: "https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg",
            author: "Cameron",
            date: "1 Feb, 2020",
            title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
            description:
                "Mauris scelerisque nisl id rutrum volutpat. Pellentesque urna nisi, suscipit at tortor vitae, hendrerit blandit lorem.",
            isActive: false,
        },
         {
            id: 5,
            image: "https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg",
            author: "Cameron",
            date: "1 Feb, 2020",
            title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
            description:
                "Mauris scelerisque nisl id rutrum volutpat. Pellentesque urna nisi, suscipit at tortor vitae, hendrerit blandit lorem.",
            isActive: false,
        },
    ];

    return (
        <div className="blog-container">
            <div className="search-container-blog">
                <input type="text" placeholder="Search..." className="search-input-blog" />
                <i className="fa-solid fa-magnifying-glass search-icon-blog"></i>
            </div>
            <div className="cards-container-blog">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card-blog ${card.isActive ? "active-card" : ""}`}
                    >
                        <img
                            src={card.image || "/placeholder.svg"}
                            alt="Circuit board"
                            className="card-image-blog"
                        />
                        <div className="card-meta-blog">
                            <div className="card-meta-detail">
                                <i className="fa-solid fa-user icon-outline"></i>
                                <span className="author">{card.author}</span>
                            </div>
                            <div className="card-meta-detail">
                                <i className="fa-solid fa-calendar icon-outline"></i>
                                <span className="date">{card.date}</span>
                            </div>
                        </div>
                        <h3 className="card-title-blog">{card.title}</h3>
                        <p className="card-description-blog">{card.description}</p>
                        <button className="read-more-button">
                            READ MORE <span className="arrow-icon">→</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentBlog;
