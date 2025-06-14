import SectionTitle from "./SectionTitle";
import "./Components.css"

type RightGraphDetailBoxProps = {
  boxTitle: string;
};

function RightGraphDetailBox({boxTitle}: RightGraphDetailBoxProps) {
    return (
        <div className="rightGraphDetailBox-outer-container">
            <SectionTitle text={boxTitle}/>

            <div className="rightGraphDetailBox-inner-container">
                <div className="rightGraphDetailBox-left">
                </div>
                <div className="rightGraphDetailBox-right">

                </div>
            </div>
        </div>
    )
}

export default RightGraphDetailBox;