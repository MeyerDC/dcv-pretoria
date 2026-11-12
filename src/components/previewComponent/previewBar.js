import React from "react";
import { Link } from "react-router-dom";
import "./previewComponent.css";
import { setPreviewMode, useFeatures } from "../../utils/features";
import { useLanguage } from "../language-context/language-contextComponent";

// Reminds whoever switched on preview mode that the public does not see this.
const PreviewBar = () => {
  const { previewMode } = useFeatures();
  const { language, translations } = useLanguage();
  if (!previewMode) return null;
  const t = translations[language].preview;

  return (
    <div className="preview-bar">
      <span>{t.barText}</span>
      <Link to="/preview">{t.barLink}</Link>
      <button type="button" className="preview-button" onClick={() => setPreviewMode(false)}>
        {t.switchOff}
      </button>
    </div>
  );
};

export default PreviewBar;
