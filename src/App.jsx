import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <div className='font-Jost bg-primary-bg max-w-[1300px] mx-auto my-0'>
        <Navbar/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
