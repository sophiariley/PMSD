// The title of a section (Health Score, Labor, ...)
import "./Components.css"

type SectionSubTextProps = {
    text: string;
};

function SectionSubText ({text}: SectionSubTextProps) {
    return <h3 className="sectionSubText">{text}</h3>;
}

export default SectionSubText;