import React from 'react'

export default function Result({provinces,districts,communes,villages,isVisible}) {

    if(!isVisible){
        return null
    }

  return (

    <div className='Result'>
        
       <div className='text-center mt-14 m-auto'>

        {provinces ? <p>{provinces.name.latin} / {provinces.name.km}</p> : ''}
        {districts ? <p>{districts.name.latin} / {districts.name.km}</p> : ''}
        {communes ? <p>{communes.name.latin} / {communes.name.km}</p> : ''}
        {villages ? <p>{villages.name.latin} / {villages.name.km}</p> : ''}
        
        

    </div>

   </div>    

  )
}
