import React, { useState } from "react";
import * as Icon from "react-feather";
import "./shareButton.css";
import { shareImage } from "../../utils/share";
import { toBlob } from "../../utils/shareCard";
import { useLanguage } from "../language-context/language-contextComponent";

// Builds a picture when pressed and hands it to the phone's share sheet;
// on a computer the picture is saved instead.
// build: async () => canvas
const ShareButton = ({ build, filename, text, label, outline = false, disabled = false }) => {
  const [state, setState] = useState("idle");
  const { language, translations } = useLanguage();
  const t = translations[language].share;

  const share = async () => {
    setState("busy");
    try {
      const blob = await toBlob(await build());
      const result = await shareImage(blob, filename, text);
      setState(result === "saved" ? "saved" : "idle");
    } catch (e) {
      setState("failed");
    }
  };

  return (
    <span className="share-button">
      <button
        type="button"
        className={`dcv-btn ${outline ? "dcv-btn-outline" : ""}`}
        onClick={share}
        disabled={disabled || state === "busy"}
      >
        <Icon.Share2 />
        <span>{label}</span>
      </button>
      {state === "saved" && <span className="share-note">{t.saved}</span>}
      {state === "failed" && <span className="share-note">{t.failed}</span>}
    </span>
  );
};

export default ShareButton;
