import React from 'react'
import SearchBoard from './Components/SearchCard'

const Hero = () => {
  return (
    <section className='relative isolate'>
      <div className='absolute inset-0 -z-10'>
        {/* {Image Place Holder} */}
        <div className="h-full w-full bg-[url('https://i.pinimg.com/1200x/72/1a/8a/721a8a7ea0c339e50b674b2db40e125a.jpg')] bg-cover bg-center" />
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#003f63]/50 to-[#003f63]/80" />
      </div>

      <div className='max-w-6xl mx-auto px-4 py-16 md:py-24 text-white '>
        <h1 className='text-4xl md:text-6xl font-extrabold leading-tight tracking-tight'>Temukan Perjalananmu
          <br className='hidden md:block' />
          dengan Mudah
        </h1>
        <p className='mt-4 max-w-xl text-white/90'>Pesan tiket Pesawat, Bus, Kereta hingga rental mobil pada satu tempat.</p>
        <div className='mt-8'>
          <SearchBoard />
        </div>
      </div>
    </section>    
  )
}

export default Hero
