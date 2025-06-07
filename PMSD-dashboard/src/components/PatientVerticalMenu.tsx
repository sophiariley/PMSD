// The vertical menu on the left side of the patient landing page
import MenuText from "./MenuText";
import "./Components.css"


function PatientVerticalMenu() {
    return (
        <div className="patientVerticalMenu-container">
            <div className="patientVeticalMenu">
                <MenuText text = "Dashboard"/>
                <MenuText text = "Profil"/>
                <MenuText text = "Notizen"/>
                <MenuText text = "Labor"/>
                <MenuText text = "Aktivität"/>
                <MenuText text = "Ernährung"/>
                <MenuText text = "Stress"/>
                <MenuText text = "Schlaf"/>

                <div className="menuDivider"/>

                <MenuText text = "Report"/>
                <MenuText text = "Trends"/>
                <MenuText text = "Termin"/>
            </div>
        </div>
    )
}

export default PatientVerticalMenu;