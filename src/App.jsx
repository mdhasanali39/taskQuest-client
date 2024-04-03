import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

function App() {
  const location = useLocation()

  useEffect(()=>{
    if(location.pathname === '/'){
      document.title = 'TaskQuest | Home'
    }else{
      document.title = `TaskQuest ${location.pathname.replace('/',' | ')}`
    }
  },[location.pathname])

  return (
    <>
      <div className='font-Jost  max-w-[1300px] mx-auto'>
        <Navbar/>
        <Outlet/>
        <Toaster/>
      </div>
    </>
  )
}

export default App
