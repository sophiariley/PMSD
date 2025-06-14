import "./Components.css"
import SectionTitle from "./SectionTitle";
import HealthScoreChart from "./HealthScoreChart";

function PatientLeftGraphDetail () {
    return(
        <div className="patientLeftGraphDetail-container">
            <div className="patientLeftGraphDetail-section">
                <SectionTitle text="Health Score"/>
                {/* TODO: Add graph skeleton */}
                <HealthScoreChart score={70}/>
            </div>

            <div className="patientLeftGraphDetail-section">
                <SectionTitle text = "Risiko Profil"/>
                {/* TODO: Add graph skeletons */}
            </div>
        </div>
    )
}

export default PatientLeftGraphDetail;