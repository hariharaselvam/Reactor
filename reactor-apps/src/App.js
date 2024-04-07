import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.scss'
import Home from './Router/Home'
import About from './Router/About'
import Contact from './Router/Contact'
import Navigate from './Router/Navigate'
import Flames from './Router/Flames'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route index element={Home()}/>

          <Route path="/about" element={About()}/>

          <Route path="/contact" element={Contact()}/>

          <Route path="/flames" element={Flames()}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
