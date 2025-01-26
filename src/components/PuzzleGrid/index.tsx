import React from 'react';
import PuzzlePiece from './PuzzlePiece';
import { PuzzlePiece as PuzzlePieceType } from './../../types';

type Props = {
  pieces: PuzzlePieceType[];
  gridSize: number;
  onDragStart: (e: React.DragEvent, piece: PuzzlePieceType) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetPosition: number) => void;
  totalPieces: number;
};

const PuzzleGrid = ({
  pieces,
  gridSize,
  totalPieces,
  ...handlers
}: Props) => (
  <div
    className="grid gap-1 border-4 border-dashed border-gray-200 p-4 rounded-lg"
    style={{ 
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      aspectRatio: '1/1'
    }}
  >
    {Array.from({ length: totalPieces }).map((_, i) => {
      const piece = pieces.find(p => p.currentPosition === i);
      return (
        <div
          key={i}
          className={`border-2 border-gray-200 aspect-square relative overflow-hidden rounded-lg ${
            !piece ? 'bg-gray-50' : ''
          } hover:border-blue-400`}
          onDragOver={handlers.onDragOver}
          onDragLeave={handlers.onDragLeave}
          onDrop={(e) => handlers.onDrop(e, i)}
        >
          {piece && (
            <PuzzlePiece
              piece={piece}
              gridSize={gridSize}
              onDragStart={handlers.onDragStart}
              onDragEnd={handlers.onDragEnd}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default PuzzleGrid;