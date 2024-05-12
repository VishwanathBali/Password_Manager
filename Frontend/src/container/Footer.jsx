import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col items-center justify-center fixed bottom-0 w-full'>
      <div className='font-bold text-2xl'>
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
        </div>
      <div className='flex justify-center items-center'>Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by Vishwanath</div>
    </div>
  )
}

export default Footer