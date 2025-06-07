import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing";

function App() {
  // return <div><SectionTitle/></div>;
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </Router>
  )
}

export default App;