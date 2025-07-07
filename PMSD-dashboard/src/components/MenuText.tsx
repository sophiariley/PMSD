// The text in the vertical menu
import { NavLink } from "react-router-dom";
import "./Components.css";

type MenuTextProps = {
  text: string;
  to?: string;
};

function MenuText({ text, to }: MenuTextProps) {
  return to ? (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "menuText activeMenuText" : "menuText"
      }
    >
      {text}
    </NavLink>
  ) : (
    <div className="menuText">{text}</div>
  );
}

export default MenuText;
