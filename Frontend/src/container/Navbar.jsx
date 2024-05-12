import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='bg-slate-800 text-white'>
    <div className='container px-40 py-4 flex justify-between items-center'>
        <div className='font-bold text-2xl'>
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
        </div>
        <ul> 
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul>
    </div>
    </nav>
    </>
  )
}

export default Navbar