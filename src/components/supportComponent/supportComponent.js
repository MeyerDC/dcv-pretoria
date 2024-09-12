import React from "react";
import "./supportComponent.css";

const SupportComponent = () => {
  return (
    <div className="support-body">
      <p>Help us continue our work by making a donation.</p>
      <div className="banking-details">
        <h2>Banking Details</h2>
        <p>Account Name: DEUTSCHER CARNEVALS VEREIN CLUB</p>
        <p>Bank: FNB</p>
        <p>Account Number: 63116276337</p>
        <p>Branch Code: 210835</p>
      </div>
      <div className="contact-details">
        <h2>Contact Details</h2>
        <p>
          Email:{" "}
          <a href="mailto:dcv.pretoria@gmail.com">dcv.pretoria@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default SupportComponent;
