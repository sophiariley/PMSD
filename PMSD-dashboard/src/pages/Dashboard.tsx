// The Dashboard screen
import PatientVerticalMenu from "../components/PatientVerticalMenu"
import PatientHeaderBar from "../components/PatientHeaderBar"
import PatientLeftGraphDetail from "../components/PatientLeftGraphDetail"
import PatientRightGraphDetail from "../components/PatientRightGraphDetail"

export function Dashboard() {
    return (
        <div>
            <div>
                <PatientHeaderBar/>
            </div>
            <div>
                <PatientVerticalMenu/>
                <PatientLeftGraphDetail/>
                <PatientRightGraphDetail/>
            </div>
        </div>
        
    )
}