// The landing page of the dashboard
// import SectionTitle from "../components/SectionTitle"
import PatientVerticalMenu from "../components/PatientVerticalMenu"
import PatientHeaderBar from "../components/PatientHeaderBar"

export function PatientLanding() {
    return (
        // <SectionTitle text = "Patient Landing Page"/>
        <div>
            <div>
                <PatientHeaderBar/>
            </div>
            <div>
                <PatientVerticalMenu/>
            </div>
        </div>
        
    )
}