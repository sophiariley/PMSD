// The text in the vertical menu
import "./Components.css"

type MenuTextProps = {
    text: string;
}

function MenuText({text}: MenuTextProps) {
    return <h4 className="menuText">{text}</h4>
}

export default MenuText;