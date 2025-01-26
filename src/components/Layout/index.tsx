import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
    <div className="max-w-7xl mx-auto mb-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Puzzle Game</h1>
      <p className="text-gray-600 text-center">Susun potongan gambar untuk menyelesaikan puzzle</p>
    </div>
    
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
      {children}
    </div>
  </div>
);

export default Layout;