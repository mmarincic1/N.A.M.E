import { Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import { useState } from "react";
import RequestItem from "./RequestItem";


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

const DoctorPanel = () => {

  
  
  let location = useLocation();
  let activeMember = null;
  let niz = ["Placeholder","Placeholder","Placeholder","Placeholder","Placeholder","Placeholder"];
  const listItems = niz.map((d,index) => < RequestItem index={index}/>
  );
  return (
    <div className="mx-auto w-75 mt-5">
      
    
      <div className="list-group" id="list-tab" role="tablist">
        {listItems}
      </div>

      {

      }
   
    <div class="col-8">
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
        <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
        <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
        <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
      </div>
    </div>
  </div>
  );
};

export default DoctorPanel;