import React from 'react';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  promptContext: string;
}

export interface Page {
  pageNumber: number;
  content: string;
  image?: string;
}

export interface Book {
  title: string;
  pages: Page[];
}