import React, { useState } from 'react'
import ListPage from './Component/ListPage'
import CreateForm from './Component/CreateForm'

export default function App() {

  const [courses,setCourses] = useState([])

  const [mode,setMode] = useState('list')
 
  return (  

    <div className='App container w-[1200px] m-auto'>

      <div className="relative overflow-x-auto mt-14">

        <button onClick={() => setMode('create')} className='float-end p-2 rounded-lg text-white font-bold mb-4'>
          {mode === 'list' && 'Add'}
        </button>
        

        {mode === 'list' ? <ListPage courses={courses} onDelete={setCourses}/> : <CreateForm data={courses} setData={setCourses} onMode={setMode}/>}

      </div>


    </div>

  )

}