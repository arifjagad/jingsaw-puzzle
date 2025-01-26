// types.ts
import type { ReactNode, DragEvent } from 'react';

export interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number | null;
}

export type DragHandler = (
  e: DragEvent<HTMLDivElement>, 
  piece: PuzzlePiece
) => void;

export type DropHandler = (
  e: DragEvent<HTMLDivElement>, 
  targetPosition: number
) => void;

export interface PuzzleGridProps {
  pieces: PuzzlePiece[];
  gridSize: number;
  totalPieces: number;
  onDragStart: DragHandler;
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: DropHandler;
}

export interface PuzzlePieceProps {
  piece: PuzzlePiece;
  gridSize: number;
  onDragStart: DragHandler;
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
}

export interface PuzzleTrayProps {
  pieces: PuzzlePiece[];
  gridSize: number;
  onDragStart: DragHandler;
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
}

export interface ControlsProps {
  onReset: () => void;
  onShuffle: () => void;
}

export interface RewardSectionProps {
  hasCompleted: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface ReferenceImageProps {
  imageUrl?: string;
  altText?: string;
}