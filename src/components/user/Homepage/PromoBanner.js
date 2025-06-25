import React from "react"
// import "../../../pages/user/HomePage/HomePage.css"

const PromoBanner = () => {
    return (
        <div className="showcase-container-banner">
            <div className="main-product-banner">
                <div className="product-content-banner">
                    <div className="product-text-banner">
                        <h2 className="product-title-banner">- THE BEST PLACE TO PLAY</h2>
                        <h3 className="product-subtitle-banner">Xbox</h3>
                        <p className="product-description-banner">
                            Save up to 50% on select Xbox games.
                            Get 3 months of PC
                            Game Pass for $2 USD.
                        </p>
                        <button className="buy-button-banner">SHOW NOW</button>
                    </div>
                    <div className="product-image-banner">
                        <img src="https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg" alt="Xbox Console with Controller" />
                    </div>
                </div>
            </div>

            <div className="side-products-banner">
                <div className="product-card-banner">

                    <div className="card-overlay-content">
                        <div className="promotion-title">
                            <span className="sale-badge-banner">SUMMER SALES</span>
                            <p className="sale-badge-banner-description">New Google Pix6 Pro</p>
                            <button className="buy-button-banner">SHOP NOW</button>
                        </div>
                        <div className="promotion-image"> <img
                            src="https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg"
                            alt="Mobile Device"
                            className="card-image-banner"
                        /></div>
                    </div>

                    <div className="product-card-banner-bottom">
                        <div className="card-content-banner-bottom">
                            <img src="https://i.pinimg.com/736x/b9/8c/fd/b98cfd0f58ef0b34017cc705dc6ac675.jpg" alt="AirPods Pro" className="card-image-banner" />

                        </div>
                        <div className="price-info-banner">
                            <p className="sale-badge-banner-description">New Google Pix6 Pro</p>
                            <p><span className="sale-price-banner">$199</span>
                                <span className="original-price-banner">$299</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoBanner
