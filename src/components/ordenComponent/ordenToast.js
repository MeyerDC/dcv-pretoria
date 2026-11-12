import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icon from "react-feather";
import { awardDue } from "../../utils/orden";
import { useOrden } from "./useOrden";
import MedalCanvas from "./medalCanvas";

// Hands out any Orden that is due and announces it for 11 seconds.
const OrdenToast = () => {
  const [fresh, setFresh] = useState(null);
  const { list, t } = useOrden();
  const { pathname } = useLocation();

  useEffect(() => {
    let hide;
    const check = () => {
      const ids = awardDue();
      if (ids.length === 0) return;
      setFresh(ids[ids.length - 1]);
      clearTimeout(hide);
      hide = setTimeout(() => setFresh(null), 11000);
    };
    check();
    const timer = setInterval(check, 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(hide);
    };
  }, []);

  const orden = fresh && list.find((o) => o.id === fresh);
  if (!orden || pathname.startsWith("/orden")) return null;

  return (
    <div className="orden-toast" role="status">
      <MedalCanvas orden={orden} size={62} />
      <div className="orden-toast-text">
        <strong>{t.toast}</strong>
        <span>{orden.name}</span>
        <Link to="/orden" onClick={() => setFresh(null)}>
          {t.view}
        </Link>
      </div>
      <button type="button" className="orden-toast-close" onClick={() => setFresh(null)} aria-label={t.close}>
        <Icon.X />
      </button>
    </div>
  );
};

export default OrdenToast;
