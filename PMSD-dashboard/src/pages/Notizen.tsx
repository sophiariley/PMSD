// Notes page of a patient

import PatientVerticalMenu from "../components/PatientVerticalMenu";
import PatientHeaderBar from "../components/PatientHeaderBar";
import SymptomForm from "../components/SymptomForm";

export function Notes() {
  return (
    <div>
        <PatientHeaderBar />
        <PatientVerticalMenu />
        <SymptomForm />
    </div>
  );
}
