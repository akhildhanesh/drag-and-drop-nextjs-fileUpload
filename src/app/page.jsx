'use client'

import { useEffect, useState } from "react"
import { handleFormData } from "./actions"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [files, setFiles] = useState([])
  const [filesList, setFilesList] = useState([])
  const [formData, setFormData] = useState(null)

  const submitData = formData => {
    console.log(formData)
    axios.post('http://localhost:4000/api/submit', formData)
      .then(data => data.data.message)
      .then(() => {
        toast.success('Files uploaded')
        setFiles([])
        setFilesList([])
      })
      .catch(toast.error)
  }

  useEffect(() => {
    if (files.length > 0) {
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('image', file)
      })
      const fileNames = Array.from(files).map(item => item.name)
      setFilesList(fileNames)
      setFormData(formData)
      // handleFormData(formData)
    }
  }, [files])

  const handleDrop = e => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      setFiles(e.dataTransfer.files)
    }
  }

  const handleDropOver = e => {
    e.preventDefault()
  }

  const handleUpload = () => {
    submitData(formData)
  }

  return (
    <main onDragOver={handleDropOver} onDrop={e => e.preventDefault()} className="flex flex-col gap-3 h-screen justify-center items-center">
      <ToastContainer />
      <div onDragOver={handleDropOver} onDrop={handleDrop} className="border border-dotted border-blue-800 px-[200px] py-[100px]">
        <p>Upload files</p>
        <ul>
          {
            filesList.map((item, i) => (
              <li key={i}>{ i + 1 }: {item}</li>
            ))
          }
        </ul>
      </div>
      <button type="button" onClick={handleUpload} className="bg-indigo-500 px-3 py-2 rounded text-white">Upload</button>
    </main>
  );
}
