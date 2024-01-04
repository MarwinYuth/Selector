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

    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(chapterId))

    const lesson = chapter.lessons.filter(les => les)

    setLessons(lesson)
   
  }

  // console.log(detail);

  return (

    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

        <div onClick={onModalProtected} className="bg-white p-8 text-center rounded-lg">
            
            <p className='font-bold mt-2'>{detail.name}</p>
            <p className='mt-2'>{detail.summarize}</p>

            <select 
            onChange={(e) => handleOnChapterSelect(e.target.value)}
            >

              <option value="">Select Chapter</option>
              {
                detail.totalChapter.map(chap => {
                  return(

                    <option value={chap.id}>{chap.title}</option>

                  )
                })
              }
              
            </select>

           <div>

              <select 
              >
                <option value="">Select Chapter</option>
                {
                  lessons.map(lessons => {
                    return(

                      <option value={lessons.id}>{lessons.lessonName}</option>

                    )
                  })
                }
            </select>

           </div>

        </div>

    </div>

  )
}
