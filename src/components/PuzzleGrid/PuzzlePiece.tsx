import React from 'react';
import type { PuzzlePiece } from './../../types';

type Props = {
  piece: PuzzlePiece;
  gridSize: number;
  onDragStart: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onDragEnd: (e: React.DragEvent) => void;
};

const PuzzlePiece = ({ piece, gridSize, onDragStart, onDragEnd }: Props) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, piece)}
    onDragEnd={onDragEnd}
    className="absolute inset-0 bg-cover bg-center cursor-move"
    style={{
      backgroundImage: 'url("/images/jingsaw-image.jpg")',
      backgroundPosition: `${-(piece.correctPosition % gridSize) * 100}% ${
        -Math.floor(piece.correctPosition / gridSize) * 100
      }%`,
      backgroundSize: `${gridSize * 100}%`,
    }}
  />
);

export default PuzzlePiece;