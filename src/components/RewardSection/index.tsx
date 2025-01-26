import React from 'react';

interface RewardSectionProps {
  hasCompleted: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const RewardSection: React.FC<RewardSectionProps> = ({
  hasCompleted,
  isOpen,
  onOpen,
  onClose
}) => {
  return (
    <div className="relative w-full xl:h-64 lg:h-48 sm:h-72 h-32">
      {!isOpen ? (
        <button
          onClick={onOpen}
          className={`
            w-full h-full rounded-lg
            transition-all duration-500 ease-in-out
            border-2 border-dashed
            ${hasCompleted 
              ? 'border-green-400 hover:border-green-500 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200' 
              : 'border-gray-300 bg-gray-50 cursor-not-allowed'
            }
          `}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className={`
              transform transition-transform duration-300
              ${hasCompleted ? 'hover:scale-110 animate-bounce' : ''}
            `}>
              <svg 
                className={`w-16 h-16 ${hasCompleted ? 'text-green-500' : 'text-gray-400'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
                />
              </svg>
            </div>
            <p className={`text-sm font-medium ${hasCompleted ? 'text-green-600' : 'text-gray-500'}`}>
              {hasCompleted ? 'Klik untuk membuka hadiah!' : 'Selesaikan puzzle terlebih dahulu'}
            </p>
          </div>
        </button>
      ) : (
        <div 
          className="w-full h-full rounded-lg shadow-lg bg-white
                     border-2 border-green-400
                     transform animate-fadeIn"
        >
          <div className="h-full flex flex-col items-center justify-center space-y-4 p-6">
            <div className="text-5xl animate-bounce">🎉</div>
            <h3 className="text-xl font-bold text-center text-green-600">
              Selamat!
            </h3>
            <p className="text-center text-gray-600">
              Kamu telah menyelesaikan puzzle dengan baik!
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg
                       hover:bg-green-600 transition-colors duration-200
                       transform hover:scale-105 active:scale-95"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardSection;