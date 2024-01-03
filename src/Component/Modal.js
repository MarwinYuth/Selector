import React from 'react'

export default function Modal({detail,isVisible}) {

  if(!isVisible){
    return null
  }  

  return (

    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

        <div className="bg-white p-8 text-center rounded-lg">
            
            <p className='font-bold mt-2'>{detail.name}</p>
            <p className='mt-2'>{detail.summarize}</p>
            <p className="font-bold">{detail.totalChapter}</p>
        
        </div>

    </div>

  )
}
