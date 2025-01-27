import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { shuffleArray } from './utils/helpers';
import type { PuzzlePiece } from './types';

// Components
import Layout from './components/Layout';
import PuzzleGrid from './components/PuzzleGrid';
import ReferenceImage from './components/ReferenceImage';
import RewardSection from './components/RewardSection';
import PuzzleTray from './components/PuzzleTray';
import Controls from './components/Controls';

function App() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [hasCompletedPuzzle, setHasCompletedPuzzle] = useState(false);
  const gridSize = 10;
  const totalPieces = gridSize * gridSize;

  // Initialize puzzle
  useEffect(() => {
    const initialPieces: PuzzlePiece[] = Array.from(
      { length: totalPieces },
      (_, i) => ({
        id: i,
        correctPosition: i,
        currentPosition: null,
      })
    );
    setPieces(shuffleArray([...initialPieces]));
    setHasCompletedPuzzle(false);
  }, [totalPieces]);

  // Check puzzle completion
  useEffect(() => {
    if (pieces.length > 0 && !pieces.some(p => p.currentPosition === null)) {
      const isComplete = pieces.every(
        p => p.currentPosition === p.correctPosition
      );
      
      if (isComplete && !hasCompletedPuzzle) {
        setHasCompletedPuzzle(true);
        toast.success('Selamat! Anda berhasil menyelesaikan puzzle! Silahkan klik tombol reward untuk mendapatkan hadiah! 🎉', {
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
  }, [pieces, hasCompletedPuzzle]);

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
  const handleRewardClick = () => {
    if (!hasCompletedPuzzle) {
      toast.error('Selesaikan puzzle terlebih dahulu untuk membuka hadiah! 🎮');
      return;
    }
    setIsRewardOpen(true);
  };

  const handleReset = () => {
    const initialPieces: PuzzlePiece[] = Array.from(
      { length: totalPieces },
      (_, i) => ({
        id: i,
        correctPosition: i,
        currentPosition: null,
      })
    );
    setHasCompletedPuzzle(false);
    setPieces(shuffleArray([...initialPieces]));
  };

  const handleShuffle = () => {
    setHasCompletedPuzzle(false);
    setPieces(currentPieces => 
      shuffleArray([...currentPieces]).map(p => ({ ...p, currentPosition: null }))
    );
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
          />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 col-span-4 grid gap-6">
          <div className="flex gap-4 lg:order-1 order-2">
            <ReferenceImage />
            
            {/* Reward Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Hadiah</h2>
              <RewardSection
                hasCompleted={hasCompletedPuzzle}
                isOpen={isRewardOpen}
                onOpen={handleRewardClick}
                onClose={() => setIsRewardOpen(false)}
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
            />
          </div>

          {/* Controls */}
          <div className="lg:order-3 order-3">
            <Controls 
              onReset={handleReset}
              onShuffle={handleShuffle}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;