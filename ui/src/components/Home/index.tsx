import React from 'react'
import HomeNetworkInfo from '../HomeNetworkInfo'
import EpochsHomeBlocks from '../EpochsHomeBlocks'
import TasksHome from '../TasksHome'

const Home = (props: any) => {
  return (
    <>
      <HomeNetworkInfo />
      <EpochsHomeBlocks />
      <TasksHome {...props} />
    </>
  )
}

export default Home
