import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "./firebase.init";

const analytics = getAnalytics(app);

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, "page_view", { page_path: location.pathname });
  }, [location]);

  return null;
};

export default AnalyticsTracker;
