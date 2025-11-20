
import React, { useState, useCallback } from 'react';
import { Book, Category } from './types';
import { generateBookContent } from './services/geminiService';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import PromptInput from './components/PromptInput';
import BookPreview from './components/BookPreview';
import Loader from './components/Loader';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
  const [isCategorySelectorOpen, setIsCategorySelectorOpen] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setIsCategorySelectorOpen(false);
    setBook(null);
    setError(null);
  };

  const handleGenerateBook = useCallback(async () => {
    if (!prompt || !selectedCategory) {
      setError('Please select a category and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBook(null);

    try {
      const generatedBook = await generateBookContent(prompt, selectedCategory);
      setBook(generatedBook);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the book.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, selectedCategory]);
  
  const resetFlow = () => {
      setBook(null);
      setPrompt('');
      setIsCategorySelectorOpen(true);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />

      {isCategorySelectorOpen && (
        <CategorySelector categories={CATEGORIES} onSelect={handleCategorySelect} />
      )}

      {!isCategorySelectorOpen && selectedCategory && (
        <main className="w-full max-w-7xl mt-8 flex-grow">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerateBook}
            isLoading={isLoading}
            selectedCategory={selectedCategory}
            onChangeCategory={() => setIsCategorySelectorOpen(true)}
          />

          {isLoading && <Loader />}

          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
              <p className="font-bold">Generation Failed</p>
              <p>{error}</p>
            </div>
          )}

          {book ? (
            <BookPreview book={book} />
          ) : (
            !isLoading && (
              <div className="mt-16 text-center text-slate-500">
                <h2 className="text-2xl font-semibold">Your generated book will appear here.</h2>
                <p className="mt-2">Enter a prompt and click "Generate Book" to get started.</p>
              </div>
            )
          )}
        </main>
      )}
    </div>
  );
};

export default App;
