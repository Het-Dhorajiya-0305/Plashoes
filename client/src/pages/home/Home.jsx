import React from 'react'
import Hero from '../../component/hero/Hero.jsx'
import Navbar from '../../component/navbar/Navbar.jsx'
import AboutUs from '../../component/aboutUs/AboutUs.jsx'
import Seller from '../../component/best_seller/Seller.jsx'
import Men_Women from '../../component/menandwomen/Men_Women.jsx'
import NewArrival from '../../component/new_arrive/NewArrival.jsx'
import Info from '../../component/info/Info.jsx'
import Review from '../../component/customer_review/Review.jsx'
import ContactUs from '../../component/contact_us/ContactUs.jsx'
import Footer from '../../component/footer/Footer.jsx'



function Home() {
    return (
        <div>
            {/* <Navbar page="home"></Navbar> */}
            <Hero></Hero>
            <AboutUs></AboutUs>
            <Seller></Seller>
            <Men_Women></Men_Women>
            <NewArrival></NewArrival>
            <Info></Info>
            <Review></Review>
            <Footer></Footer>
        </div>
    )
}

export default Home
