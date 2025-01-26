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
    <div className="grid xl:grid-cols-8 lg:grid-cols-6 sm:grid-cols-6 grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
      {pieces.filter(p => p.currentPosition === null).map((piece) => (
        <div
          key={piece.id}
          draggable
          onDragStart={(e) => onDragStart(e, piece)}
          onDragEnd={onDragEnd}
          className="aspect-square cursor-move relative overflow-hidden rounded-lg shadow-sm hover:shadow-md"
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