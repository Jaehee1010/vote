import { Link } from "react-router-dom";

import '../css/NavBar.css'


const Navbar = () => {
    return(
        <nav className="navbar">
            
            <div className="nav-links">
                <Link to = "/List">후보자 공약</Link>
                <Link to = "/Vote">투표하기</Link>
                <Link to = "/Result">투표결과</Link>
                <Link to = "/Store">구매하기</Link>
            </div>
        </nav>
    )
}

export default Navbar;
