import React from 'react'

export default function Input({label,placeholder,value,onChange,...InputAttribute}) {

  return (

    <div>
        <label className='font-bold text-white'>{label}</label>
        <input {...InputAttribute} type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600 " 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        /> 
    </div>

  )
}
