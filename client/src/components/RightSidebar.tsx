import React from 'react'
import WhoToFollow from './WhoToFollow'
import Search from './Search'

const RightSidebar = () => {
  return (
    <div className=' max-w-[350px] min-w-[270px] px-2 hidden lg:block'>
      <Search />
      <WhoToFollow />
    </div>
  )
}

export default RightSidebar