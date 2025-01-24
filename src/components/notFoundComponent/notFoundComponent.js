// components/notFoundComponent/notFoundComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundComponent() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting to the homepage...</p>
    </div>
  );
}

export default NotFoundComponent;