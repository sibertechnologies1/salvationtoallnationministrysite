import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Hero from '../../components/Home/Hero.jsx'
import WelcomeStrip from '../../components/Home/Welcomestrip.jsx'
function Home() {
  return (
    <div className='bg-white min-h-screen '>
      
      <Navbar />
      <Hero />
      <WelcomeStrip />
    </div>
   
  )
}

export default Home
