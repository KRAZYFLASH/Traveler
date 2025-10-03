import React from 'react'
import travelImg  from '../../../assets/travel.png'

const Card = () => {
  return (
    <section className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-15'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:pl-5'>
            <div className='text-xl sm:text-2xl lg:text-3xl font-semibold text-white'>
                <p>Lets Travel to</p>
                <p>Another Destination</p>
            </div>
            <button className='bg-white rounded-full text-sm sm:text-base text-gray-600 px-8 py-3 mt-6 hover:scale-105 transition-all cursor-pointer'>Search</button>
        </div>
        <div className="hidden md:block md:w-1/2 relative">
            <img
                src={travelImg}
                alt="Travel"
                className="max-w-[250px] lg:max-w-[320px] w-auto h-auto absolute -bottom-2.5 right-0"
            />
            </div>

    </section>
  )
}

export default Card
