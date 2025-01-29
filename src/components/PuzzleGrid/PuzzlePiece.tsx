import React from 'react';
import type { PuzzlePiece } from './../../types';

type Props = {
  piece: PuzzlePiece;
  gridSize: number;
  onDragStart: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onDragEnd: (e: React.DragEvent) => void;
  imageUrl: string;
  isCompleted: boolean;
};

const PuzzlePiece = ({ piece, gridSize, onDragStart, onDragEnd, imageUrl, isCompleted }: Props) => (
  <div
    draggable={!isCompleted}
    onDragStart={(e) => onDragStart(e, piece)}
    onDragEnd={onDragEnd}
    className={`absolute inset-0 bg-cover bg-center ${
      isCompleted ? 'cursor-default' : 'cursor-move'
    }`}
    style={{
      backgroundImage: `url("${imageUrl}")`,
      backgroundPosition: `${-(piece.correctPosition % gridSize) * 100}% ${
        -Math.floor(piece.correctPosition / gridSize) * 100
      }%`,
      backgroundSize: `${gridSize * 100}%`,
    }}
  />
);

export default PuzzlePiece;