import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <div className='font-Jost  max-w-[1300px] mx-auto'>
        <Navbar/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
