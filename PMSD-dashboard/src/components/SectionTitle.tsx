// The title of a section (Health Score, Labor, ...)
import "./Components.css"

type SectionTitleProps = {
    text: string;
};

function SectionTitle ({text}: SectionTitleProps) {
    return <h2 className="sectionTitle">{text}</h2>;
}

export default SectionTitle;