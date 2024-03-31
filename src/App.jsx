import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'

function App() {

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
