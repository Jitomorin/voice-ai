import React from 'react'

function Loading() {
  return (
    <>
     <div
     className='relative w-full h-screen flex items-center justify-center'
     >
     <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-100 opacity-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
      </div> 
     </div>
    </>
  )
}

export default Loading
