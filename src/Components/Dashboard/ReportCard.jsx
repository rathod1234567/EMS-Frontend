
import React from 'react';

const ReportCard = ({ icon, text, number, color }) => {
  return (
    <div className="rounded flex bg-white shadow-md overflow-hidden">
      <div className={`text-2xl sm:text-3xl flex justify-center items-center ${color} text-white px-3 sm:px-4 py-3`}>
        {icon}
      </div>
      <div className="pl-3 sm:pl-4 py-3">
        <p className="text-sm sm:text-base md:text-lg font-semibold">{text}</p>
        <p className="text-base sm:text-lg md:text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default ReportCard;