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
  let niz = [{'ime':'Lionel Messi','opis':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'},{'ime':'Ime','opis':'opis'},{'ime':'Ime','opis':'opis'},{'ime':'Ime','opis':'opis'},{'ime':'Ime','opis':'opis'},{'ime':'Ime','opis':'opis'}];
  const listItems = niz.map((d,index) => < RequestItem key={index} index={index} ime={d.ime} opis={d.opis}/>
  );
  return (
    <div className="mx-auto w-75 mt-5">
      
    
      <div className="list-group" id="list-tab" role="tablist">
        {listItems}
      </div>

      {

      }
   
    <div className="col-8">
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
        <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
        <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
        <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
      </div>
    </div>
  </div>
  );
};

export default DoctorPanel;