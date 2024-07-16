import React from 'react'
import SliderWithProducts from '../../components/slider/SliderWithProducts'
import Products from '../../components/Products/Products'
import AutoMotive from '../../components/Products/AutomotiveProducts'
import Certification from '../../components/Certification/Certification'
import Contact from '../Contact/Contact'
import Offers from '../Offer/Offers'
import Video from '../../components/Video/Video'
import Newsletter from '../../components/Newsletter/Newsletter'
import NewsSection from '../News/News'
import Testimonial from '../../components/Testimonial/Testimonial'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <SliderWithProducts/>
      <Video/>
      <Products/>
      <Certification/>
      <AutoMotive/>
      <Offers/>
      <Newsletter/>
      <NewsSection/>
      <Testimonial/>
      <Contact/>
    </div>
  )
}

export default Home
