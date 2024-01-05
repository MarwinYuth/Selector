import React, { useState } from 'react'
import Input from './Input'

export default function Modal({onDetailChange,detail,isVisible,onClose}) {

  const [newChapter,setNewChapter] = useState([])
  const [newLessons,setNewLesson] = useState([])

  //For set Lesson through Chpater is selected
  const [lessons,setLessons] = useState([])

  const [selectChapterId,setSelectChapterId] = useState('')
  const [selectLessonId,setSelectLessonId] = useState('')

  const [chapterEditValue,setChapterEditValue] = useState('')
  const [lessonEditValue,setLessonEditValue] = useState('')

  if(!isVisible){
    return null
  }  

  const onChangeChapter = (chapterIndex,field,value) => {

    const updateNewChapter = [...newChapter]
    updateNewChapter[chapterIndex][field] = value
    setNewChapter(updateNewChapter)

    console.log(newChapter);
  }

  const onModalProtected = (e) => {

    e.stopPropagation()

  }

  const onClearChapter = () => {
    setNewChapter([])
  }

  const onAddNewChapter = () => {

    const newChapter = {
      id:detail.totalChapter.length ++,
      title:'',
      note:'',
      lessons:[]
    }

    setNewChapter(prev => [...prev,newChapter])

    console.log(detail.totalChapter.length);

  }

  const handleOnChapterSelect = (chapterId) => {

    if(chapterId === ''){
      setSelectChapterId('')
      setSelectLessonId('')
      setChapterEditValue('')
      setLessonEditValue('')
      setLessons([])
      return null
    }

    // setLessons([])

    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(chapterId))

    setSelectChapterId(chapterId)

    setChapterEditValue(chapter.title)

    setLessons(chapter.lessons.filter(les => les))
  }

  const handleOnLessonSelect = (lessonId) => {

    if(lessonId === ''){
      setSelectLessonId('')
      setLessonEditValue('')
      return null
    }

    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(selectChapterId))

    const lesson = chapter.lessons.find(les => les.id === parseInt(lessonId))

    setSelectLessonId(lessonId)
    setLessonEditValue(lesson.lessonName)
  }


  const onEdit = (e) => {

    e.preventDefault()

    if(!chapterEditValue || !lessonEditValue){
      return null
    }

    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(selectChapterId))

    chapter.title = chapterEditValue

    const lesson = chapter.lessons.find(les => les.id === parseInt(selectLessonId))

    lesson.lessonName = lessonEditValue  

    setSelectChapterId('');
    setSelectLessonId('');
    setChapterEditValue('');
    setLessonEditValue('');
    setLessons([]);
  }

 
  return (

    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

        <div onClick={onModalProtected} className="bg-white p-8 text-center rounded-lg w-[500px] h-[500px] overflow-y-auto">

            <h1 className='text-[30px] font-bold text-gray-600 mb-4'>Edit Chapter</h1>
            
            <p className='font-bold mt-2 text-[30px]'><span className='text-gray-400'>Course</span> : {detail.name}</p>
            <p className='mt-2 text-[15px] font-bold'><span className='text-gray-400'>Summarize</span> : {detail.summarize}</p>

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
              value={chapterEditValue}
              onChange={(e) => setChapterEditValue(e.target.value)}
              />

              <label className='font-bold float-start'>Lesson</label>  
              <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600"
              value={lessonEditValue}
              onChange={(e) => setLessonEditValue(e.target.value)}
              />

              <div>

                <button type='button' onClick={onEdit}  className='bg-blue-700 p-2 float-start text-white font-bold rounded-xl'>Edit</button>

                <button type='button' onClick={onAddNewChapter} className='bg-purple-700 p-2 float-start text-white font-bold rounded-xl ml-4'>Add New Chapter</button>

                <button type='button' onClick={onClearChapter}>Clear Chapter</button>

              </div>

            </form>


            <form  className="max-w-sm mx-auto p-4">

              {
                newChapter.map((chapter,chapterIndex) => {

                  return(

                    <div>

                      <Input label='Chapter' value={chapter.title} placeholder='Chapter' onChange={(e) => onChangeChapter(chapterIndex,'title',e.target.value)}/>
                      
                      <Input label='Note' value={chapter.note} placeholder='Note' onChange={(e) => onChangeChapter(chapterIndex,'note',e.target.value)}/>

                    </div>
                    
                  )

                })
              }                


            </form>

        </div>

    </div>

  )
}
