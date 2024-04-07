import React from 'react'
import pfp1 from "../pfp/pfp1.jpeg"
import pfp2 from "../pfp/pfp2.jpeg"

const WhoToFollow = () => {
  return (
    <div className='p-2'>
        <p className='text-xl font-bold'>Who to follow</p>

        <div className='flex items-center border gap-2 p-2 '>
            <img src={pfp2} className='h-14 w-14 rounded-full' alt='profile'/>
            <div>

            <p className='whitespace-nowrap'>Santosh Dubey</p>
            <p>@santosh</p>
            </div>
            <button className=' bg-white text-black px-3 p-1 rounded-lg'>Follow </button>
        </div>

        <div className='flex items-center border gap-2 p-2 '>
            <img src={pfp2} className='h-14 w-14 rounded-full' alt='profile'/>
            <div>

            <p className='whitespace-nowrap'>Santosh Dubey</p>
            <p>@santosh</p>
            </div>
            <button className=' bg-white text-black px-3 p-1 rounded-lg'>Follow </button>
        </div>

        <div className='flex items-center border gap-2 p-2 '>
            <img src={pfp2} className='h-14 w-14 rounded-full' alt='profile'/>
            <div>

            <p className='whitespace-nowrap'>Santosh Dubey</p>
            <p>@santosh</p>
            </div>
            <button className=' bg-white text-black px-3 p-1 rounded-lg'>Follow </button>
        </div>
    </div>
  )
}

export default WhoToFollow