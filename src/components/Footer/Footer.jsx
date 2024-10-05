import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footerCard">
            <div className="footerimg">
            <img src={assets.AI_icon} alt="" />
            </div>
        <div className="links">
          <Link style={{ textDecoration: "none" }} to="/">
            Terms of Service
          </Link>
          <span>|</span>
          <Link style={{ textDecoration: "none" }} to="/">
            Privacy Policy
          </Link>
        </div>
        </div>
      </div>
  )
}

export default Footer