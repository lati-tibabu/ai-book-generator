
import React from 'react';
import { Category } from '../types';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  selectedCategory: Category;
  onChangeCategory: () => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onGenerate,
  isLoading,
  selectedCategory,
  onChangeCategory,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-brand-primary/50 text-brand-light rounded-md">
            <selectedCategory.icon className="w-5 h-5"/>
          </div>
          <span className="font-semibold text-lg text-slate-300">Category: {selectedCategory.name}</span>
        </div>
        <button
          onClick={onChangeCategory}
          className="text-sm text-brand-secondary hover:text-blue-400 transition-colors"
        >
          Change
        </button>
      </div>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`e.g., A curious squirrel who wants to travel to the moon...`}
        className="w-full h-32 p-4 bg-slate-900 border border-slate-600 rounded-lg text-gray-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-secondary hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Book'
        )}
      </button>
    </div>
  );
};

export default PromptInput;
