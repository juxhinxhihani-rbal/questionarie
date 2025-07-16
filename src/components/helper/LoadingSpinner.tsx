import React from "react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="flex items-center justify-between w-[100px]">
      <div className="w-5 h-5 rounded-full bg-[#eebe00] animate-[bounce_0.8s_infinite_ease-in-out]"></div>
      <div className="w-5 h-5 rounded-full bg-[#000000] animate-[bounce_0.8s_infinite_ease-in-out_0.3s]"></div>
      <div className="w-5 h-5 rounded-full bg-[#eebe00] animate-[bounce_0.8s_infinite_ease-in-out_0.6s]"></div>
      <div className="w-5 h-5 rounded-full bg-[#000000] animate-[bounce_0.8s_infinite_ease-in-out_0.9s]"></div>
    </div>
  </div>
);

export default LoadingSpinner;
