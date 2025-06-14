import "./Components.css"
import SectionTitle from "./SectionTitle";

function PatientLeftGraphDetail () {
    return(
        <div className="patientLeftGraphDetail-container">
            <div>
                <SectionTitle text="Health Score"/>
                {/* TODO: Add graph skeleton */}
            </div>

            <div>
                <SectionTitle text = "Risiko Profil"/>
                {/* TODO: Add graph skeletons */}
            </div>
        </div>
    )
}

export default PatientLeftGraphDetail;