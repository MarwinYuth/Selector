import React, { useState } from 'react'

export default function Modal({detail,isVisible,onClose}) {

  const [lessons,setLessons] = useState([])

  const [selectChapterId,setSelectChapterId] = useState('')
  const [selectLessonId,setSelectLessonId] = useState('')


  const [chapterValue,setChapterValue] = useState('')
  const [lessonValue,setLessonValue] = useState('')

  if(!isVisible){
    return null
  }  

  const onModalProtected = (e) => {

    e.stopPropagation()

  }

  const handleOnChapterSelect = (chapterId) => {

    if(chapterId === ''){
      setSelectChapterId('')
      setSelectLessonId('')
      setChapterValue('')
      setLessonValue('')
      setLessons([])
      return null
    }

    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(chapterId))

    setSelectChapterId(chapterId)

    setChapterValue(chapter.title)

    setLessons(chapter.lessons.filter(les => les))
  }

  const handleOnLessonSelect = (lessonId) => {

    if(lessonId === ''){
      setSelectLessonId('')
      setLessonValue('')
      return null
    }

    const chapter = detail.totalChapter.find(chap => chap.lessons.find(les => les.id === parseInt(lessonId)));

    const lesson = (chapter.lessons.find(les => les.id === parseInt(lessonId)));


    setLessonValue(lesson.lessonName)

    setSelectLessonId(lessonId)
  }


  const onEdit = (e) => {

    e.preventDefault()

    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(selectChapterId))

    chapter.title = chapterValue

    const lesson = chapter.lessons.find(les => les.id === parseInt(selectLessonId))

    lesson.lessonName = lessonValue


    setSelectChapterId('')
    setSelectLessonId('')
    setChapterValue('')
    setLessonValue('')

  }

 

  return (

    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

        <div onClick={onModalProtected} className="bg-white p-8 text-center rounded-lg w-[500px]">

            <h1 className='text-[30px] font-bold text-gray-600 mb-4'>Edit Chapter</h1>
            
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
            onChange={(e) => handleOnLessonSelect(e.target.value)}
            >
                <option value="">Select Lessons</option>
                {
                  lessons.map(lessons => {
                    return(

                      <option key={lessons.id} value={lessons.id}>{lessons.lessonName}</option>

                    )
                  })
                }
            </select>

           </div>


            <form className='mt-4'>

              <label className='font-bold float-start'>Chapter</label>  
              <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600"
              value={chapterValue}
              onChange={(e) => setChapterValue(e.target.value)}
              />

              <label className='font-bold float-start'>Lesson</label>  
              <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600"
              value={lessonValue}
              onChange={(e) => setLessonValue(e.target.value)}
              />

              <button type='button' onClick={onEdit}  className='bg-blue-700 p-2 float-start text-white font-bold rounded-xl'>Edit</button>

            </form>

        </div>

    </div>

  )
}
