import React, { useState } from 'react'
import Input from './Input'

export default function Modal({onDetailChange,detail,isVisible,onClose}) {

  const [newChapters,setNewChapters] = useState([])
  const [newLessons,setNewLessons] = useState([])

  // const [coursesField,setCorsesField] = useState({name:detail.name,summarize:detail.summarize})


  if(!isVisible){
    return null
  }  

  // const onChangeInput = (e) => {

  //   const field = e.target.name
  //   const value = e.target.value

  //   setCorsesField({...coursesField,[field]:value})

  // }


  //onChange New Chapter
  const onChangeChapter = (chapterIndex,field,value) => {

    const updateNewChapter = [...newChapters]
    updateNewChapter[chapterIndex][field] = value
    setNewChapters(updateNewChapter)
  }


  //Onchange New Lesson
  const onChangeLesson = (e,chapterIndex,lessonIndex) => {

    const {name,value} = e.target

    const updateLessons = [...newChapters]
    updateLessons[chapterIndex].lessons[lessonIndex][name] = value
    
    setNewChapters(updateLessons)

    console.log(newChapters);
  }

  const onModalProtected = (e) => {

    e.stopPropagation()

  }

  const onAddNewChapter = () => {

    let id = detail.totalChapter.length
    id += 1

    const newChapter = {
      id:id,
      title:'',
      note:'',
      lessons:[]
    }

    console.log(newChapter);

    setNewChapters(prev => [...prev,newChapter])
  }


  const onAddNewLesson = (chapterIndex) => {

   
    const chapter = detail.totalChapter.find(chap => chap.id === parseInt(chapterIndex));

    const newLesson = {
      id:chapter.lessons.length ++,
      lessonName:'',
      description:''
    }
    
    const updateLesson = [...newChapters]
    updateLesson[chapterIndex].lessons.push(newLesson);

    setNewLessons([...newLessons,newLesson])
  }


  const onEdit = (e) => {

    e.preventDefault()


    // detail.name = coursesField.name
    // detail.summarize = coursesField.summarize
  }


  const onSubmitNewCourse = () => {


    newChapters.forEach(chapterObject => {
      
      detail.totalChapter.push(chapterObject)

    });

    setNewChapters([])

    console.log(detail);
  }

 
  return (

    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

        <div onClick={onModalProtected} className="bg-white p-8 text-center rounded-lg w-[500px] h-[700px] overflow-y-auto">

            <h1 className='text-[30px] font-bold text-gray-600 mb-4'>Edit Chapter</h1>
            
            {/* <Input value={coursesField.name} name='name' onChange={onChangeInput}/>

            <Input value={coursesField.summarize} name='summarize' onChange={onChangeInput}/> */}
            
            <h1 className='font-bold text-[25px]'>{detail.name}</h1>
            <h1 className='font-bold text-[20px]'>{detail.summarize}</h1>

            <form className='mt-4'>

              {
                detail.totalChapter.map((chapter,chapterIndex) => {

                  return(

                    <div>

                      <h1 className='text-center font-bold text-[25px]'>Chapter</h1>

                      <label className='font-bold float-start'>Chapter</label>  
                      <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600"
                        value={chapter.title}
                      />

                      <label className='font-bold float-start'>Note</label>  
                      <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600"
                        value={chapter.note}
                      />

                      {
                        chapter.lessons.map((lesson,lessonIndex) => {
                          return(

                            <div className='w-[300px] m-auto'>

                              <label className='font-bold float-start'>LessonName</label>  
                              <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600"
                                value={lesson.lessonName}
                              />

                              <label className='font-bold float-start'>Description</label>  
                              <input type="text" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600"
                                value={lesson.description}
                              />

                            </div>

                          )
                        })
                      }
                      
                    </div>

                  )

                })
              }

              <div>

                <button type='button' onClick={onEdit}  className='bg-blue-700 p-2 float-start text-white font-bold rounded-xl'>Edit</button>

                <button type='button' onClick={onAddNewChapter} className='bg-purple-700 p-2 float-start text-white font-bold rounded-xl ml-4'>Add New Chapter</button>

              </div>

            </form>


            <form  className="max-w-sm mx-auto p-4">

              {
                newChapters.map((chapter,chapterIndex) => {

                  return(

                    <div key={chapterIndex} className='mt-8'>

                      <h1 className='font-bold text-[20px]'>Add New Chapter</h1>

                      <Input label='Chapter' value={chapter.title} placeholder='Chapter' onChange={(e) => onChangeChapter(chapterIndex,'title',e.target.value)}/>
                      
                      <Input label='Note' value={chapter.note} placeholder='Note' onChange={(e) => onChangeChapter(chapterIndex,'note',e.target.value)}/>

                      <button type='button' onClick={() => onAddNewLesson(chapterIndex)} className='float-start bg-red-400 p-2 text-white font-bold rounded-lg'>Add Lesson</button>

                      {
                        chapter.lessons.map((lesson,lessonIndex) => {

                          return(

                            <div key={lessonIndex} className='Lessons w-[250px] m-auto mt-[25px]'>

                              <Input label='Lesson' name='lessonName' value={lesson.lessonName} placeholder='Lessons' onChange={(e) => onChangeLesson(e,chapterIndex,lessonIndex)}/>

                              <Input label='description' name='description' value={lesson.description} placeholder='Descriptions' onChange={(e) => onChangeLesson(e,chapterIndex,lessonIndex)}/>

                            </div>

                          )

                        })
                      }

                    </div>
                    
                  )
                  
                })
                
              }                

              {newChapters.length > 0 && <button type='button' onClick={onSubmitNewCourse} className='float-end bg-blue-400 p-2 text-white font-bold rounded-lg'>Add New Courses</button>}   

            </form>

        </div>

    </div>

  )
}
