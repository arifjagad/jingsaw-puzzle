import React, { useState, useEffect, useCallback } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { shuffleArray, cropImageToSquare } from './utils/helpers';
import type { PuzzlePiece } from './types';

// Components
import Layout from './components/Layout';
import PuzzleGrid from './components/PuzzleGrid';
import ReferenceImage from './components/ReferenceImage';
import PuzzleTray from './components/PuzzleTray';
import Controls from './components/Controls';

function App() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [gridSize, setGridSize] = useState(3);
  const [imageUrl, setImageUrl] = useState('/images/jingsaw-image.jpg');
  const [isLoading, setIsLoading] = useState(false);
  const totalPieces = gridSize * gridSize;

  const initializePuzzle = useCallback(() => {
    const initialPieces: PuzzlePiece[] = Array.from(
      { length: totalPieces },
      (_, i) => ({
        id: i,
        correctPosition: i,
        currentPosition: null,
      })
    );
    setPieces(shuffleArray([...initialPieces]));
  }, [totalPieces]);

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, [initializePuzzle, gridSize]);

  // Check puzzle completion
  useEffect(() => {
    if (pieces.length > 0 && !pieces.some(p => p.currentPosition === null)) {
      const isComplete = pieces.every(
        p => p.currentPosition === p.correctPosition
      );
      
      if (isComplete) {
        toast.success('Selamat! Anda berhasil menyelesaikan puzzle! 🎉', {
          duration: 3000,
          style: {
            background: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
            padding: '16px',
          },
          icon: '🏆'
        });
      }
    }
  }, [pieces]);

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(piece));
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-blue-500');
  };

  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500');

    const pieceData = e.dataTransfer.getData('text/plain');
    if (!pieceData) return;

    const draggedPiece: PuzzlePiece = JSON.parse(pieceData);
    
    if (draggedPiece.currentPosition === targetPosition) return;

    setPieces(currentPieces => {
      const newPieces = [...currentPieces];
      const targetPieceIndex = newPieces.findIndex(p => p.currentPosition === targetPosition);
      const draggedPieceIndex = newPieces.findIndex(p => p.id === draggedPiece.id);

      if (draggedPieceIndex === -1) return currentPieces;

      if (targetPieceIndex !== -1) {
        newPieces[targetPieceIndex] = {
          ...newPieces[targetPieceIndex],
          currentPosition: draggedPiece.currentPosition,
        };
      }

      newPieces[draggedPieceIndex] = {
        ...newPieces[draggedPieceIndex],
        currentPosition: targetPosition,
      };

      return newPieces;
    });
  };

  // Control Handlers
  const handleReset = () => {
    initializePuzzle();
  };

  const handleShuffle = () => {
    setPieces(currentPieces => 
      shuffleArray([...currentPieces]).map(p => ({ ...p, currentPosition: null }))
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const croppedImageUrl = await cropImageToSquare(file);
      setImageUrl(croppedImageUrl);
      handleReset();
    } catch (error) {
      toast.error('Gagal memproses gambar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGridSize(Number(e.target.value));
  };

  return (
    <>
      <Toaster position="top-center" />
      <Layout>
        {/* Puzzle Area */}
        <div className="lg:col-span-2 col-span-4 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Area Puzzle</h2>
          <PuzzleGrid
            pieces={pieces}
            gridSize={gridSize}
            totalPieces={totalPieces}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            imageUrl={imageUrl}
          />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 col-span-4 grid gap-6">
          <div className="flex gap-4 lg:order-1 order-2">
            <ReferenceImage imageUrl={imageUrl} />
            
            {/* Controls Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Pengaturan</h2>
              <Controls 
                onReset={handleReset}
                onShuffle={handleShuffle}
                onImageUpload={handleImageUpload}
                gridSize={gridSize}
                onGridSizeChange={handleGridSizeChange}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Puzzle Tray */}
          <div className="lg:order-2 order-1">
            <PuzzleTray
              pieces={pieces}
              gridSize={gridSize}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              imageUrl={imageUrl}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;