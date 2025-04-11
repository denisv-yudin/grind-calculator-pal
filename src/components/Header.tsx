
import React from 'react';
import { Coffee } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-coffee-dark text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-center">
        <Coffee className="mr-2" size={28} />
        <h1 className="text-2xl font-bold">Кофемолка Калькулятор</h1>
      </div>
    </header>
  );
};

export default Header;
