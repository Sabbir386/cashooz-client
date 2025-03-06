import React from "react";

const PartnersModal = ({ isOpen, onClose, modalContentUrl, modalTitle }) => {
  //console.log(modalContentUrl);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-10/12 md:w-2/3 lg:w-1/2 h-4/5 overflow-hidden relative shadow-xl">
        <button
          className="absolute top-4 right-4 text-white bg-green-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="bg-[#1f1f2e] text-white py-4 px-6 flex items-center">
          <h2 className="text-lg font-bold">{modalTitle}</h2>
        </div>
        <div className="h-[calc(100%-4rem)]">
          <iframe
            src={modalContentUrl}
            title={modalTitle}
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PartnersModal;
