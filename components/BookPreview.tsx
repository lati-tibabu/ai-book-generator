
import React, { useState, useRef } from 'react';
import { Book } from '../types';
import BookPage from './BookPage';
import { DownloadIcon } from './Icons';

// This is a workaround for the global jsPDF object from the CDN
declare const jspdf: any;
declare const html2canvas: any;

interface BookPreviewProps {
  book: Book;
}

const BookPreview: React.FC<BookPreviewProps> = ({ book }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Reset refs when book changes
  pageRefs.current = [];

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !pageRefs.current.includes(el)) {
      pageRefs.current.push(el);
    }
  };

  const handleDownloadPdf = async () => {
    if (!book) return;
    setIsDownloading(true);

    try {
      const { jsPDF } = jspdf;
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [500, 700] // A custom size that matches our BookPage component's styling
      });

      // Sort refs based on DOM order to ensure pages are in order
      const sortedPages = book.pages.sort((a, b) => a.pageNumber - b.pageNumber);
      
      // We need to capture the elements. Note: Since refs might be out of order if re-rendered,
      // we should trust the mapping index or ensure refs are sorted.
      // A simpler way is to query the DOM within the parent container, 
      // but for now, let's assume the map renders in order.
      
      const elements = document.querySelectorAll('.book-page-container');

      for (let i = 0; i < elements.length; i++) {
        const pageElement = elements[i] as HTMLElement;
        if (pageElement) {
          const canvas = await html2canvas(pageElement, {
            scale: 2, // Increase scale for better resolution
            backgroundColor: null, // Use element's background
            useCORS: true, // Important for images
            allowTaint: true,
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          
          if (i > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }
      }
      pdf.save(`${book.title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        alert("Sorry, there was an error creating the PDF. Please try again.");
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 px-4">
        <h2 className="text-3xl font-bold text-white">{book.title}</h2>
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-bold py-2 px-5 rounded-lg transition-colors"
        >
          {isDownloading ? (
             <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <DownloadIcon className="w-5 h-5" />
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        {book.pages.sort((a,b) => a.pageNumber - b.pageNumber).map((page) => (
          <div key={page.pageNumber} className="book-page-container">
             <BookPage content={page.content} pageNumber={page.pageNumber} image={page.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPreview;
