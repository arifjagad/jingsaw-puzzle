import React from 'react';
import PuzzlePiece from '../PuzzleGrid/PuzzlePiece';
import { PuzzlePiece as PuzzlePieceType } from './../../types';

type Props = {
  pieces: PuzzlePieceType[];
  gridSize: number;
  onDragStart: (e: React.DragEvent, piece: PuzzlePieceType) => void;
  onDragEnd: (e: React.DragEvent) => void;
};

const PuzzleTray = ({ pieces, gridSize, onDragStart, onDragEnd }: Props) => (
  <div className="bg-white p-6 rounded-xl shadow-lg w-full">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Kepingan Puzzle</h2>
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg h-48 w-full overflow-y-auto border-2 border-gray-200">
      {pieces.filter(p => p.currentPosition === null).map((piece) => (
        <div
          key={piece.id}
          draggable
          onDragStart={(e) => onDragStart(e, piece)}
          onDragEnd={onDragEnd}
          className="md:w-12 md:h-12 w-9 h-9 cursor-move relative overflow-hidden rounded-lg shadow-sm hover:shadow-md border border-gray-300"
        >
          <PuzzlePiece
            piece={piece}
            gridSize={gridSize}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        </div>
      ))}
    </div>
  </div>
);

export default PuzzleTray;