import { Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import {BrowserRouter as Router} from 'react-router-dom';



const navigation = [
  {
    title: "Doctor Panel",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Zahtjevi za uputnicu",
    href: "/Requests",
    icon: "bi bi-bell",
  }
];

const Sidebar = () => {
     
  let location = useLocation();
  

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        
      </div>
      <div 
            style={{
                backgroundColor: "#72d6cb",
              }}
              className="pt-4 mt-2">

        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;