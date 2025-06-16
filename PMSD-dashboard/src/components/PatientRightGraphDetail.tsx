import RightGraphDetailBox from "./RightGraphDetailBox";

function PatientRightGraphDetail() {
    return(
        <div className="patientRightGraphDetail-container">
            <RightGraphDetailBox boxTitle="Labor" graphName = "Vitamin D Trend"/>
            <RightGraphDetailBox boxTitle="Aktivität" graphName="VO2max"/>
            <RightGraphDetailBox boxTitle="Schlaf" graphName="Gesamtschlafzeit"/>
        </div>
    )
    
}

export default PatientRightGraphDetail;