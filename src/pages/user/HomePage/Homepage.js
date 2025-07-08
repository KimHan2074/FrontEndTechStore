import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import PromoBanner from '../../../components/user/Homepage/PromoBanner'
import CategoryItemHome from '../../../components/user/Homepage/CategoryItemHome'
import FeaturedProductSection from '../../../components/user/Homepage/FeaturedProductSection'
import BestDealSection from '../../../components/user/Homepage/BestDealSection'
import BestSellerSection from '../../../components/user/Homepage/BestSellerSection'
import MacbookProAdBanner from '../../../components/user/Homepage/MacbookProAdBanner'
import LatestHomePage from '../../../components/user/Homepage/LatestHomePage'
import "./HomePage.css"

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage)
    }
  }, [location.state])

  return (
    <div>
      <PromoBanner />
      <CategoryItemHome />
      <FeaturedProductSection />
      <BestDealSection />
      <BestSellerSection />
      <MacbookProAdBanner />
      <LatestHomePage />
      <ToastContainer />
    </div>
  )
}

