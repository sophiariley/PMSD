import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import {Notes} from "./pages/Notizen"

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  )
}

export default App;