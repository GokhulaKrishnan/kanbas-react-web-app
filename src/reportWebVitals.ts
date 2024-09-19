import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

type OnPerfEntry = (metric: any) => void; // Use a more general type for the callback

const reportWebVitals = (onPerfEntry?: OnPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
