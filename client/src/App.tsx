import './App.css'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Messages from './pages/Messages'
import Bookmarks from './pages/Bookmarks'

function App() {
  return (
    <Router>
      <div className='h-screen w-screen bg-stone-950 text-white'>
        <div className='h-screen md:w-[80%] lg:w-[74%] mx-auto flex border-2 border-white'>
          <LeftSidebar />
          <div className='flex-grow border-2 border-white'>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </div>
          <RightSidebar />
        </div>
      </div>
    </Router>
  )
}

export default App