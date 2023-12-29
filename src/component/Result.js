import React from 'react'

export default function Result({provinces,districts,communes,villages,isVisible}) {

    if(!isVisible){
        return null
    }

  return (

    <div className='Result'>
        
       <div className='text-center mt-14 m-auto border-2 border-black rounded-lg w-[300px] bg-gray-100 p-8 shadow-xl'>

        <h1 className='font-bold mb-4'>Result</h1>

        <p className='mt-2 font-bold'>{provinces.name.latin} / {provinces.name.km}</p>
        <p className='mt-2 font-bold'>{districts.name.latin} / {districts.name.km}</p>
        <p className='mt-2 font-bold'>{communes.name.latin} / {communes.name.km}</p>
        <p className='mt-2 font-bold'>{villages.name.latin} / {villages.name.km}</p>

    </div>

   </div>    

  )
}
