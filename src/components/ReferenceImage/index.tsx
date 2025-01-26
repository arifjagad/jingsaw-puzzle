import { useState } from 'react';

const ReferenceImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Referensi</h2>
      <div 
        className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src="/images/jingsaw-image.jpg" 
          alt="Reference"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-xs w-full">
            <img
              src="/images/jingsaw-image.jpg"
              alt="Reference Full Size"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferenceImage;