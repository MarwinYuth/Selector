import React from 'react'

export default function SelectComponent({label,data,onSelected}) {

  return (
    
    <div className='mt-14'>

     <label className='font-bold text-white mr-4'>{label}</label>

      <select className='w-[200px] p-2 mt-14'
      onChange={(e) => onSelected(e.target.value)}
      >
       
       <option value="">Select {label}</option>

       {
          data.map(data => {
            return(

              <option key={data.id} value={data.id}>
                {data.name} / {data.name_km}
              </option>

            )
          })
       }
        
      </select>

    </div>
    

  )
}
