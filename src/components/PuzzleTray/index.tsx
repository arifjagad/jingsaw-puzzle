import React from 'react';
import PuzzlePiece from '../PuzzleGrid/PuzzlePiece';
import { PuzzlePiece as PuzzlePieceType } from './../../types';

type Props = {
  pieces: PuzzlePieceType[];
  gridSize: number;
  onDragStart: (e: React.DragEvent, piece: PuzzlePieceType) => void;
  onDragEnd: (e: React.DragEvent) => void;
  imageUrl: string;
  onInsertAll: () => void;
  isCompleted: boolean;
};

const PuzzleTray = ({ pieces, gridSize, onDragStart, onDragEnd, imageUrl, onInsertAll, isCompleted }: Props) => {
  const unplacedPieces = pieces.filter(p => p.currentPosition === null);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Kepingan Puzzle</h2>
        {!isCompleted && unplacedPieces.length > 0 && (
          <button
            onClick={onInsertAll}
            className="py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Masukkan Semua
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg h-48 w-full overflow-y-auto border-2 border-gray-200">
        {unplacedPieces.map((piece) => (
          <div
            key={piece.id}
            draggable={!isCompleted}
            onDragStart={(e) => onDragStart(e, piece)}
            onDragEnd={onDragEnd}
            className={`sm:w-16 sm:h-16 w-12 h-12 ${
              isCompleted ? 'cursor-default' : 'cursor-move'
            } relative overflow-hidden rounded-lg shadow-sm hover:shadow-md border border-gray-300`}
          >
            <PuzzlePiece
              piece={piece}
              gridSize={gridSize}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              imageUrl={imageUrl}
              isCompleted={isCompleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleTray;