'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function NewPage({ params }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetch(`/api/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title)
        setDescription(data.description)
      })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (params.id) {
      console.log('updating')
    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
    }

    //router.push('/')
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <form className='bg-slate-800 p-10 w-2/4' onSubmit={onSubmit}>
        <label htmlFor='title' className='font-bold text-sm'>
          Titulo de la tarea
        </label>
        <input
          type='text'
          id='title'
          className='border border-gray-400 p-2 mb-4 w-full text-black'
          placeholder='Titulo'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor='description' className='font-bold text-sm'>
          Descripcion de la tarea
        </label>
        <textarea
          rows='3'
          id='description'
          className='border border-gray-400 p2 mb-4 w-full text-black'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px4 rounded'>
          Crear
        </button>
      </form>
    </div>
  )
}

export default NewPage
