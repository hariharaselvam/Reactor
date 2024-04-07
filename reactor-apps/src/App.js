import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css"
import Home from "./Router/Home";
import About from "./Router/About";
import Contact from "./Router/Contact";
import Navigate from "./Router/Navigate";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate />}>
            <Route index element={<Home />} />

            <Route path="About" element={<About />} />

            <Route path="Contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
