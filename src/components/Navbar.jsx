import React from 'react'

const Navbar = () => {
  return (
      <nav className='h-12 border-2 border-solid border-black  bg-green-400 content-center w-full'>
        <ul className='flex justify-between text-zinc-600'>
            <div on className='mx-6 hover:font-bold transition-all font-bold'>する</div>
            <div className='flex gap-6 mx-6 '>
            <li className='hover:font-bold transition-all'>Home</li>
            </div>
        </ul>
      </nav>
  )
}

export default Navbar
