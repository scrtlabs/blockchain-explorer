import React from 'react'
import HomeNetworkInfo from '../HomeNetworkInfo'
import EpochsHomeBlocks from '../EpochsHomeBlocks'
import TasksHome from '../TasksHome'

const Home = () => {
  return (
    <>
      <HomeNetworkInfo />
      <EpochsHomeBlocks />
      <TasksHome />
    </>
  )
}

export default Home
