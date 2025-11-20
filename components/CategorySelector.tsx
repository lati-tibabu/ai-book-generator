
import React from 'react';
import { Category } from '../types';

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold text-center text-white mb-2">Choose a Category</h2>
      <p className="text-center text-slate-400 mb-8">Select a starting point to give the AI context for your book.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className="group bg-slate-800 border border-slate-700 rounded-xl p-6 text-left hover:bg-slate-700 hover:border-brand-secondary transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-slate-700 group-hover:bg-brand-secondary rounded-lg mb-4 transition-colors">
              <category.icon className="w-6 h-6 text-slate-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
            <p className="text-slate-400 text-sm">{category.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
