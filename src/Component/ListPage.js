import React, { useState } from 'react'
import Modal from './Modal'

export default function ListPage({courses,onCourseChange}) {

  const [popUp,setPopUp] = useState(false)  

  const [viewDetail,setViewDetail] = useState([])


  const onViewDetail = (courseId) => {

    const course = courses.find(course => course.id === courseId)

    setPopUp(true)
    setViewDetail(course)
  }

  const onDismissModal = () => {

    setPopUp(false)

  }

  const onDeleteCourse = (courseId) => {

    onCourseChange(prev => prev.filter(course => course.id !== courseId))

  }

  return (

    <div className='ListPage'>

        <table className="w-full text-sm text-left text-gray-500 ">

            <thead className="bg-white border dark:border-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Summarize
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Total Chapter
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>

            <tbody className="bg-white border dark:border-gray-700">

                {
                    courses.map(course => {

                        return(

                            <tr key={course.id} className='border border-gray-700'>

                                <td className="px-6 py-4">
                                    {course.name}
                                </td>
                                <td className="px-6 py-4">
                                    {course.summarize}
                                </td>
                                <td className="px-6 py-4">
                                    {course.totalChapter.length}
                                </td>
            
                                <td className="px-6 py-4">
                                    <span className='cursor-pointer font-bold' onClick={() => onViewDetail(course.id)}>Edit</span> / <span onClick={() => onDeleteCourse(course.id)} className='cursor-pointer font-bold'>Delete</span>
                                </td>

                            </tr>    

                        )
                    })
                }

            </tbody>

        </table>

        <Modal onDetailChange={onCourseChange} detail={viewDetail} isVisible={popUp} onClose={onDismissModal}/>
      
    </div>

  )
}
