import { Link } from "react-router-dom";
import isAuthenticated from "./config/Auth";

const Navbar = () => {

    const userNavigate = isAuthenticated() ? '/admin/dashboard' : '/';
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-secondary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={userNavigate} className="nav-link text-light active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link text-light active" href="#">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about/contact" className="nav-link text-light active">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;