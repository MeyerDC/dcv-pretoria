import React from 'react';

const SupportComponent = () => {
    const handleDonate = () => {
        // Handle donation logic here
    };

    return (
        <div>
            <h1>Support Us</h1>
            <p>Help us continue our work by making a donation.</p>
            <button onClick={handleDonate}>Donate</button>
        </div>
    );
};

export default SupportComponent;