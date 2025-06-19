import React, { Component } from 'react'
import PromoBanner from '../../../components/user/Homepage/PromoBanner'
import CategoryItemHome from '../../../components/user/Homepage/CategoryItemHome'
import FeaturedProductSection from '../../../components/user/Homepage/FeaturedProductSection'
import BestDealSection from '../../../components/user/Homepage/BestDealSection'
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <PromoBanner/>
        <CategoryItemHome/>
        <FeaturedProductSection/>
        <BestDealSection/>
      </div>
    )
  }
}
