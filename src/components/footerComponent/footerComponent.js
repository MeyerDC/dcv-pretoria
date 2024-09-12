import React from "react";
import "./footerComponent.css";
import * as Icon from 'react-feather';

const FooterComponent = () => {
return (
    <footer>
        <div className="social-media-links">
            <a href="https://www.instagram.com/dcv.pretoria/">
                <Icon.Instagram className="icon-ig"/>
            </a>
            <a href="https://www.facebook.com/share/zpH9XFFATVyH1hqk/?mibextid=qi2Omg">
                <Icon.Facebook className="icon-fb"/>
            </a>
            <p>&copy; DCV Pretoria 2024. All rights reserved.</p>
        </div>
    </footer>
);
};

export default FooterComponent;
