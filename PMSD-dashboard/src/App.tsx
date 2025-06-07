import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PatientLanding } from "./pages/PatientLanding";

function App() {
  // return <div><SectionTitle/></div>;
  return(
    <Router>
      <Routes>
        <Route path="/" element={<PatientLanding/>}/>
      </Routes>
    </Router>
  )
}

export default App;