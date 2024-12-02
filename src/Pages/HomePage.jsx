import React from 'react'
import Hero from '../components/ListPage/Hero/Hero'
import ParticipantCount from '../components/ListPage/Hero/ParticipantCount'
import ParticipateChallange from '../components/ListPage/Participate/ParticipateChallange'
import Explore from '../components/ListPage/Explore/Explore'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ParticipantCount />
      <ParticipateChallange />
      <Explore />
    </div>
  )
}

export default HomePage
