import SectionTitle from "./SectionTitle";
import SectionSubText from "./SectionSubText";
import "./Components.css"

type RightGraphDetailBoxProps = {
  boxTitle: string;
  graphName: string;
};

function RightGraphDetailBox({boxTitle, graphName}: RightGraphDetailBoxProps) {
    return (
        <div className="rightGraphDetailBox-outer-container">
            <SectionTitle text={boxTitle}/>

            <div className="rightGraphDetailBox-inner-container">
                <div className="rightGraphDetailBox-left">
                    <SectionSubText text="Parameter"/>
                    <SectionSubText text = "Wert"/>
                </div>
                <div className="rightGraphDetailBox-right">
                    <SectionSubText text={graphName}/>
                </div>
            </div>
        </div>
    )
}

export default RightGraphDetailBox;