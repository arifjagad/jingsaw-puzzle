import React, { useState, useEffect, useCallback } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { shuffleArray, cropImageToSquare, formatTime } from './utils/helpers';
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
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
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
    setTimer(0);
    setIsTimerRunning(true);
    setIsCompleted(false);
  }, [totalPieces]);

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, [initializePuzzle, gridSize]);

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Check puzzle completion
  useEffect(() => {
    if (pieces.length > 0 && !pieces.some(p => p.currentPosition === null)) {
      const isComplete = pieces.every(
        p => p.currentPosition === p.correctPosition
      );
      
      if (isComplete) {
        setIsTimerRunning(false);
        setIsCompleted(true);
        toast.success(
          `Selamat! Anda berhasil menyelesaikan puzzle dalam waktu ${formatTime(timer)}! 🎉`, 
          {
            duration: 3000,
            style: {
              background: '#4CAF50',
              color: '#fff',
              fontSize: '16px',
              padding: '16px',
            },
            icon: '🏆'
          }
        );
      }
    }
  }, [pieces, timer]);

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    if (isCompleted) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(piece));
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (isCompleted) {
      e.preventDefault();
      return;
    }
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isCompleted) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (isCompleted) {
      e.preventDefault();
      return;
    }
    e.currentTarget.classList.remove('border-blue-500');
  };

  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    if (isCompleted) {
      e.preventDefault();
      return;
    }
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
    setPieces(currentPieces => {
      const unplacedPieces = currentPieces.filter(p => p.currentPosition === null);
      const placedPieces = currentPieces.filter(p => p.currentPosition !== null);
      return [...placedPieces, ...shuffleArray(unplacedPieces)];
    });
  };

  const handleInsertAll = () => {
    setPieces(currentPieces => {
      const newPieces = [...currentPieces];
      const unplacedPieces = newPieces.filter(p => p.currentPosition === null);
      const placedPositions = new Set(
        newPieces
          .filter(p => p.currentPosition !== null)
          .map(p => p.currentPosition)
      );
      
      const availablePositions = Array.from(
        { length: totalPieces },
        (_, i) => i
      ).filter(pos => !placedPositions.has(pos));
      
      const shuffledPositions = shuffleArray([...availablePositions]);
      
      unplacedPieces.forEach((piece, index) => {
        const pieceIndex = newPieces.findIndex(p => p.id === piece.id);
        if (pieceIndex !== -1 && shuffledPositions[index] !== undefined) {
          newPieces[pieceIndex] = {
            ...newPieces[pieceIndex],
            currentPosition: shuffledPositions[index],
          };
        }
      });
      
      return newPieces;
    });
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
        <div className="lg:col-span-2 col-span-4 bg-white p-6 rounded-xl shadow-lg relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Area Puzzle</h2>
            <div className="text-lg font-mono bg-gray-100 px-3 py-1 rounded-lg">
              {formatTime(timer)}
            </div>
          </div>
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
            isCompleted={isCompleted}
          />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 col-span-4 grid gap-6">
          <div className="flex sm:flex-row flex-col gap-4 lg:order-1 order-2">
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
                pieces={pieces}
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
              onInsertAll={handleInsertAll}
              isCompleted={isCompleted}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;