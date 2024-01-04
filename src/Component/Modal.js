import React, { useState } from 'react'

export default function Modal({detail,isVisible,onClose}) {

  const [lessons,setLessons] = useState([])

  if(!isVisible){
    return null
  }  

  const onModalProtected = (e) => {

    e.stopPropagation()

  }

  const handleOnChapterSelect = (chapterId) => {

    if(chapterId === ''){
      setLessons([])
      return null
    }

    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(chapterId))

    const lesson = chapter.lessons.filter(les => les)

    setLessons(lesson)
  }

  return (

    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

        <div onClick={onModalProtected} className="bg-white p-8 text-center rounded-lg w-[500px]">
            
            <p className='font-bold mt-2 text-[30px]'><span className='text-gray-400'>Course</span> : {detail.name}</p>
            <p className='mt-2 text-[15px] font-bold'><span className='text-gray-400'>Summarize : </span>{detail.summarize}</p>

            <select className='mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => handleOnChapterSelect(e.target.value)}
            >

              <option value=''>Select Chapter</option>
              {
                detail.totalChapter.map(chap => {
                  return(

                    <option key={chap.id} value={chap.id}>{chap.title}</option>

                  )
                })
              }
              
            </select>

           <div>

            <select className='mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option value="">Select Chapter</option>
                {
                  lessons.map(lessons => {
                    return(

                      <option key={lessons.id} value={lessons.id}>{lessons.lessonName}</option>

                    )
                  })
                }
            </select>

           </div>

        </div>

    </div>

  )
}
