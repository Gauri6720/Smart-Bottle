import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const AlertStrip = ({ tds, temp }) => {
  let alert = {
    message: "All readings are normal.",
    type: "success",
    icon: <CheckCircle className="w-5 h-5" />
  };

  if (tds > 900) {
    alert = {
      message: "Water quality is poor. Avoid drinking.",
      type: "error",
      icon: <AlertCircle className="w-5 h-5" />
    };
  } else if (tds >= 600) {
    alert = {
      message: "TDS is moderate. Consider filtering.",
      type: "warning",
      icon: <AlertTriangle className="w-5 h-5" />
    };
  } else if (temp > 40) {
    alert = {
      message: "Water is too hot.",
      type: "error",
      icon: <AlertCircle className="w-5 h-5" />
    };
  }

  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    error: "bg-red-50 text-red-700 border-red-100"
  };

  return (
    <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${styles[alert.type]}`}>
      {alert.icon}
      <span className="font-medium">{alert.message}</span>
    </div>
  );
};

export default AlertStrip;
