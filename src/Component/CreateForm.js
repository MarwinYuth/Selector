import React, { useState } from 'react'
import Input from './Input'

export default function Form({data,setData,onMode}) {

  const [courses,setCourses] = useState({name:'',summarize:'',title:'',note:'',lessonName:'',description:''})

  const [chapters,setChapters] = useState([])
  const [lessons,setLessons] = useState([])


  const handleOnChange = (e) => {

    const field = e.target.name
    const value = e.target.value

    setCourses({...courses,[field]:value})

  }

  const handleChapterChange = (index, field, value) => {

    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);

  }

  const handleLessonChange = (e, chapterIndex, lessonIndex) => {

    const { name, value } = e.target;
  
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex][name] = value;
  
    setChapters(updatedChapters);
  };
  

  const onAddChapter = () => {
    
    const newChapter = {
      id: chapters.length,
      title:"",
      note:"",
      lessons:[]
    };

    setChapters(prev => [...prev, newChapter]);
  }

  const onAddLesson = (chapterIndex) => {

     const newLesson = {
      id: chapters[chapterIndex].lessons.length,
      lessonName: '',
      description: ''
    };

    const updateLesson = [...chapters];
    updateLesson[chapterIndex].lessons.push(newLesson);

    setLessons([...lessons,newLesson])
  }


  const onSubmit = (e) => {

    e.preventDefault()

    console.log(chapters);

    console.log(lessons);

  }
  
  return (

    <div className='Form border border-red-500'>
       
        <form class="max-w-sm mx-auto p-4">

            <h1 className='text-center font-bold text-[25px] text-white'>Add Courses</h1>

            <Input label='Name' placeholder='name' name='name' value={courses.name} onChange={handleOnChange}/>

            <Input label='Summarize' placeholder='summarize' name='summarize' value={courses.summarize} onChange={handleOnChange}/>

            {
                chapters.map((chapter, chapterIndex) => {
                  return (
                    <div key={chapterIndex} className="Chapters">
                      <h1 className='font-bold text-white mb-4 text-[20px]'>Chapter</h1>
                      
                      <Input 
                        label='Title' 
                        placeholder='Title' 
                        name='title' 
                        value={chapter.title} 
                        onChange={(e) => handleChapterChange(chapterIndex, 'title', e.target.value)} 
                      />

                      <Input 
                        label='Note' 
                        placeholder='Note' 
                        name='note' 
                        value={chapter.note} 
                        onChange={(e) => handleChapterChange(chapterIndex, 'note', e.target.value)} 
                      />

                      <button type='button' onClick={() => onAddLesson(chapterIndex)} className='pl-4 pr-4 bg-purple-300 mb-4 font-white fo'>Add Lesson</button>

                      {
                        chapter.lessons.map((lesson,lessonIndex) => {

                          return(

                            <div key={lessonIndex} className='Lessons w-[250px] m-auto'>
                    
                              <Input label='Name' placeholder='Lesson Name' name='lessonName' value={lesson.lessonName} onChange={(e) => handleLessonChange(e, chapterIndex, lessonIndex)}/>
              
                              <Input label='Description' placeholder='Description' name='description' value={lesson.description} onChange={(e) => handleLessonChange(e, chapterIndex, lessonIndex)}/>

                            </div>

                          )
                        })
                      }

                    </div>
                  );
                })
            }

              {/* <div className='Lessons'>
                    
                <Input label='Name' placeholder='Lesson Name' name='lessonName' value={courses.lessonName} onChange={handleOnChange}/>

                <Input label='Description' placeholder='Description' name='description' value={courses.description} onChange={handleOnChange}/>

              </div> */}

           
            <button type='submit' onClick={onSubmit} className='bg-blue-400 p-2 text-white font-bold rounded-lg'>Save</button>

            <button type='button' onClick={() => onMode('list')} className='bg-red-400 ml-2 p-2 text-white font-bold rounded-lg'>Back</button>

            <button type='button' onClick={onAddChapter} className=' ml-2 text-white font-bold bg-blue-300 hover:bg-blue-500 p-2 rounded-lg'>
                Add Chapter
            </button>

        </form>


    </div>

  )
}