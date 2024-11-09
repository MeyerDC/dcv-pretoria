import React from "react";
import "./supportComponent.css";

const SupportComponent = () => {
  return (
    <div className="support-body">
      <p>Helfen Sie uns, unsere Arbeit fortzusetzen, indem Sie eine Spende machen.</p>
      <div className="banking-details">
        <h2>Bankverbindung</h2>
        <p>Kontoinhaber: DEUTSCHER CARNEVALS VEREIN CLUB</p>
        <p>Bank: FNB</p>
        <p>Kontonummer: 63116276337</p>
        <p>Bankleitzahl: 210835</p>
      </div>
      <div className="contact-details">
        <h2>Kontaktdaten</h2>
        <p>
          Email:{" "}
          <a href="mailto:dcv.pretoria@gmail.com">dcv.pretoria@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default SupportComponent;
