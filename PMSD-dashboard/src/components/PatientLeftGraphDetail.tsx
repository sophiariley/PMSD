import "./Components.css"
import SectionTitle from "./SectionTitle";
import HealthScoreChart from "./HealthScoreChart";
import SectionSubText from "./SectionSubText";

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
                <div>
                    <SectionSubText text = "Kardiovasculär Risiko"/>
                    {/* TODO: Add graph skeleton */}
                </div>
                <div>
                    <SectionSubText text = "Diabetes Risiko"/>
                </div>
                {/* TODO: Add graph skeleton */}
            </div>
        </div>
    )
}

export default PatientLeftGraphDetail;