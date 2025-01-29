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
  imageUrl: string;
  isCompleted: boolean;
};

const PuzzleGrid = ({
  pieces,
  gridSize,
  totalPieces,
  imageUrl,
  isCompleted,
  ...handlers
}: Props) => (
  <div
    className={`grid border-4 border-dashed ${
      isCompleted ? 'border-green-200' : 'border-gray-200'
    } p-4 rounded-lg`}
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
          className={`border-2 ${
            isCompleted
              ? 'border-green-200'
              : piece
              ? 'border-blue-200'
              : 'border-gray-200'
          } aspect-square relative overflow-hidden rounded-lg ${
            !piece ? 'bg-gray-50' : ''
          } ${!isCompleted && 'hover:border-blue-400'}`}
          onDragOver={!isCompleted ? handlers.onDragOver : undefined}
          onDragLeave={!isCompleted ? handlers.onDragLeave : undefined}
          onDrop={!isCompleted ? (e) => handlers.onDrop(e, i) : undefined}
        >
          {piece && (
            <PuzzlePiece
              piece={piece}
              gridSize={gridSize}
              onDragStart={handlers.onDragStart}
              onDragEnd={handlers.onDragEnd}
              imageUrl={imageUrl}
              isCompleted={isCompleted}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default PuzzleGrid;