import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Hero from '../../components/Home/Hero.jsx'
import WelcomeStrip from '../../components/Home/Welcomestrip.jsx'
import LatestSermon from '../../components/Home/LatestSermon.jsx'
import UpcomingEvents from '../../components/Home/UpcomingEvents.jsx'
import AboutSnippet from '../../components/Home/AboutSnippet.jsx'
function Home() {
  return (
    <div className='bg-white min-h-screen '>
      
      <Navbar />
      <Hero />
      <WelcomeStrip />
      <LatestSermon />
      <UpcomingEvents />
      <AboutSnippet />
    </div>
   
  )
}

export default Home
