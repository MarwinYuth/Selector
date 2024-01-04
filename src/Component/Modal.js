import React from 'react'

export default function Modal({detail,isVisible,onClose}) {

  if(!isVisible){
    return null
  }  

  const onModalProtected = (e) => {

    e.stopPropagation()

  }

  console.log(detail);

  return (

    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

        <div onClick={onModalProtected} className="bg-white p-8 text-center rounded-lg">
            
            <p className='font-bold mt-2'>{detail.name}</p>
            <p className='mt-2'>{detail.summarize}</p>
            
            <select>
              <option value="">Select Chapter</option>
              {
                detail.totalChapter.map(chap => {
                  return(

                    <option value="">{chap.title}</option>

                  )
                })
              }
            </select>
        </div>

    </div>

  )
}
