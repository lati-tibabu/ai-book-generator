
import React from 'react';
import { FeatherIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-7xl text-center mb-8">
        <div className="flex items-center justify-center gap-4">
            <FeatherIcon className="w-10 h-10 text-brand-secondary" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 text-transparent bg-clip-text">
                AI Book Generator
            </h1>
        </div>
      <p className="mt-3 text-lg text-slate-400">
        Turn your ideas into beautifully formatted books with the power of AI.
      </p>
    </header>
  );
};

export default Header;
