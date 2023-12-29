import React from 'react'

export default function SelectComponent({label,data,onSelected}) {

  return (
    
    <div className='mt-14'>

     <label htmlFor="" className='font-bold text-white'>{label}</label>

      <select className='w-[200px] p-2 mt-14'
      onChange={(e) => onSelected(e.target.value)}
      >
        <option value='' className='font-bold'>Select {label}</option>  

          {
            data.map((data) => {
              return(
                <option key={data.id} name={data.name} value={data.id}>
                  {data.name.latin} / {data.name.km}
                </option>
              )
            })
          }
        
      </select>

    </div>
    

  )
}
