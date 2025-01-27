import { Upload, Loader2 } from 'lucide-react';

type Props = {
  onReset: () => void;
  onShuffle: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gridSize: number;
  onGridSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
};

const Controls = ({ 
  onReset, 
  onShuffle, 
  onImageUpload, 
  gridSize, 
  onGridSizeChange,
  isLoading 
}: Props) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={onReset}
        disabled={isLoading}
        className="py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Mulai Ulang
      </button>
      <button
        onClick={onShuffle}
        disabled={isLoading}
        className="py-3 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Acak Ulang
      </button>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Ukuran Puzzle
      </label>
      <select
        value={gridSize}
        onChange={onGridSizeChange}
        className="w-full py-2 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm shadow-sm transition duration-150 ease-in-out hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none"
      >
        {Array.from({ length: 8 }, (_, i) => i + 3).map((size) => (
          <option key={size} value={size} className="py-1">
            {size} x {size}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload Gambar
      </label>
      <label className={`flex items-center justify-center w-full h-12 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none ${
        isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-blue-400'
      } focus:outline-none`}>
        <span className="flex items-center space-x-2">
          {isLoading ? (
            <Loader2 size={18} className="text-gray-400 animate-spin" />
          ) : (
            <Upload size={18} className="text-gray-400" />
          )}
          <span className="text-sm text-gray-600">
            {isLoading ? 'Memproses...' : 'Pilih gambar...'}
          </span>
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageUpload}
          disabled={isLoading}
        />
      </label>
      <p className="text-xs text-gray-500 mt-1">
        Gambar akan otomatis di-crop menjadi persegi (500x500 pixel)
      </p>
    </div>
  </div>
);

export default Controls;