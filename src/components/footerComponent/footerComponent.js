import React from "react";
import "./footerComponent.css";
import * as Icon from 'react-feather';

const FooterComponent = () => {
return (
    <footer>
        <div className="social-media-links">
            <a href="https://www.instagram.com">
                <Icon.Instagram className="icon"/>
            </a>
            <p>&copy; DCV Pretoria 2024. All rights reserved.</p>
        </div>
    </footer>
);
};

export default FooterComponent;
