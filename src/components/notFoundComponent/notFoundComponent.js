import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../language-context/language-contextComponent';

function NotFoundComponent() {
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const { heading, text } = translations[language].notFound;

  React.useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page-card">
      <h1 className="page-heading">404</h1>
      <p>{heading}</p>
      <p>{text}</p>
    </div>
  );
}

export default NotFoundComponent;
