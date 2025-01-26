import React from 'react';

type Props = {
  onReset: () => void;
  onShuffle: () => void;
};

const Controls = ({ onReset, onShuffle }: Props) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex gap-4">
      <button
        onClick={onReset}
        className="flex-1 py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium shadow-sm"
      >
        Mulai Ulang
      </button>
      <button
        onClick={onShuffle}
        className="flex-1 py-3 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium shadow-sm"
      >
        Acak Ulang
      </button>
    </div>
  </div>
);

export default Controls;