import React, { Component } from 'react'
import PromoBanner from '../../../components/user/Homepage/PromoBanner'
import CategoryItemHome from '../../../components/user/Homepage/CategoryItemHome'
import FeaturedProductSection from '../../../components/user/Homepage/FeaturedProductSection'
import BestDealSection from '../../../components/user/Homepage/BestDealSection'
import BestSellerSection from '../../../components/user/Homepage/BestSellerSection'
import MacbookProAdBanner from '../../../components/user/Homepage/MacbookProAdBanner'
import LatestHomePage from '../../../components/user/Homepage/LatestHomePage'
// import "./HomePage.css";
export default class HomePage extends Component {
  render() {
        return (
            <div>
                <PromoBanner />
                <CategoryItemHome />
                <FeaturedProductSection />
                <BestDealSection />
                <BestSellerSection/>
                <MacbookProAdBanner/>
                <LatestHomePage/>
            </div>
        );
  }
}
