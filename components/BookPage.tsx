
import React from 'react';

interface BookPageProps {
  content: string;
  pageNumber: number;
  image?: string;
}

const BookPage: React.FC<BookPageProps> = ({ content, pageNumber, image }) => {
  return (
    <div className="w-[500px] h-[700px] bg-paper text-slate-800 p-8 flex flex-col shadow-2xl rounded-sm font-serif overflow-hidden relative">
      
      {image && (
        <div className="w-full h-[300px] mb-6 rounded-sm overflow-hidden border border-slate-200/50 shadow-sm shrink-0 bg-slate-100">
            <img 
                src={image} 
                alt={`Illustration for page ${pageNumber}`}
                className="w-full h-full object-cover"
            />
        </div>
      )}

      <div className="flex-grow text-lg leading-relaxed whitespace-pre-wrap overflow-hidden">
        {content}
      </div>
      
      <div className="text-center mt-4 text-sm text-slate-500 shrink-0">
        - {pageNumber} -
      </div>
    </div>
  );
};

export default BookPage;
