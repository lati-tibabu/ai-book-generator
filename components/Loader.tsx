
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center text-center">
      <div className="relative w-24 h-24">
        <div className="absolute border-4 border-t-4 border-t-brand-secondary border-slate-700 rounded-full w-full h-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-secondary">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-white">Generating Your Book...</h2>
      <p className="text-slate-400 mt-2">The AI is writing, please wait a moment.</p>
    </div>
  );
};

export default Loader;
