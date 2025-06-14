import RightGraphDetailBox from "./RightGraphDetailBox";

function PatientRightGraphDetail() {
    return(
        <div className="patientRightGraphDetail-container">
            <RightGraphDetailBox boxTitle="Labor"/>
            <RightGraphDetailBox boxTitle="Aktivität"/>
            <RightGraphDetailBox boxTitle="Schlaf"/>
        </div>
    )
    
}

export default PatientRightGraphDetail;