import React, { useState } from 'react'
import Input from './Input'

export default function Form({data,setData,onMode}) {

  const [courses,setCourses] = useState({name:'',summarize:'',title:'',note:'',lessonName:'',description:''})

  const [chapterLength,setChapterLength] = useState([])
  const [lesson,setLesson] = useState({})

  // const [isChapter,setIsChapter] = useState(false)
  // const [isLesson,setIsLesson] = useState(false)


  const handleOnChange = (e) => {
    const field = e.target.name
    const value = e.target.value

    setCourses({...courses,[field]:value})
  }

  const onAddChapter = () => {

    const newLength = {
      id:chapterLength.length,
    }

    const length = chapterLength.concat(newLength)

    setChapterLength(length)

    console.log(length);
  }

  const onAddLesson = (chapterId) => {

    const id = lesson.length
    lesson[chapterId] = lesson[chapterId]?.length > 0 ? lesson[chapterId].concat({...lesson,id}) : [{...lesson,id}]
    setLesson({...lesson})

  }

  const onSubmit = (e) => {
    
    e.preventDefault()

    const newCourse = {
      id:data.length,
      name:courses.name,
      summarize:courses.summarize,
      totalChapter:[]
    }

    const findCourse = data.find(course => course.name === courses.name)

    if(findCourse){

      findCourse.totalChapter.push({
        title:courses.title,
        note:courses.note,
        lesson:[{
          lessonName:courses.lessonName,
          description:courses.description
        }]
      })

      return null
    }

    setData(prev => [...prev,newCourse])

    console.log(data);
  }

  return (

    <div className='Form border border-red-500'>
       
        <form onSubmit={onSubmit} class="max-w-sm mx-auto p-4">

            <h1 className='text-center font-bold text-[25px] text-white'>Add Courses</h1>

            <Input label='Name' placeholder='name' name='name' value={courses.name} onChange={handleOnChange}/>

            <Input label='Summarize' placeholder='summarize' name='summarize' value={courses.summarize} onChange={handleOnChange}/>

              {
                chapterLength.map((chapterLength) => {
                  return(

                    <div key={chapterLength.id} className="Chapters">

                      <h1 className='font-bold text-white mb-4 text-[20px]'>Chapter</h1>

                      <Input label='Title' placeholder='Title' name='title' value={courses.title} onChange={handleOnChange}/> 
      
                      <Input label='Note' placeholder='Note' name='note' value={courses.note} onChange={handleOnChange}/>

                      <button onClick={()=>onAddLesson(chapterLength.id)} className='pl-4 pr-4 bg-purple-300 mb-4 font-white fo'>Add Lesson</button>

                      {
                        lesson[chapterLength.id]?.map((lesson) => {
                          return(

                            <div key={lesson.id} className='Lessons w-[250px] m-auto'>
                    
                              <Input label='Name' placeholder='Lesson Name' name='lessonName' value={courses.lessonName} onChange={handleOnChange}/>

                              <Input label='Description' placeholder='Description' name='description' value={courses.description} onChange={handleOnChange}/>

                            </div>

                          )
                        })
                      }
                  
                    </div>

                  )
                })
              }


              {/* <div className='Lessons'>
                    
                <Input label='Name' placeholder='Lesson Name' name='lessonName' value={courses.lessonName} onChange={handleOnChange}/>

                <Input label='Description' placeholder='Description' name='description' value={courses.description} onChange={handleOnChange}/>

              </div> */}

           
            <button type='submit' className='bg-blue-400 p-2 text-white font-bold rounded-lg'>Save</button>

            <button type='button' onClick={() => onMode('list')} className='bg-red-400 ml-2 p-2 text-white font-bold rounded-lg'>Back</button>

            <button type='button' onClick={onAddChapter} className=' ml-2 text-white font-bold bg-blue-300 hover:bg-blue-500 p-2 rounded-lg'>
                Add Chapter
            </button>

        </form>


    </div>

  )
}
