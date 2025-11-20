
import { Category } from './types';
import { BookIcon, ChefHatIcon, RocketIcon, WrenchIcon, HeartPulseIcon, BrainCircuitIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  {
    id: 'childrens-story',
    name: "Children's Story",
    description: "Whimsical and imaginative tales for young readers.",
    icon: BookIcon,
    promptContext: "You are a beloved children's book author. Write a short, heartwarming, and imaginative story suitable for children aged 4-8. Use simple language, positive themes, and clear moral lessons. The story should be broken into several short pages."
  },
  {
    id: 'cookbook-recipe',
    name: "Cookbook Recipe",
    description: "Delicious recipes with clear, step-by-step instructions.",
    icon: ChefHatIcon,
    promptContext: "You are a master chef creating a recipe for a cookbook. Provide a clear, concise, and easy-to-follow recipe. Include an introduction, a list of ingredients, and numbered step-by-step instructions. The final output should feel like a page from a professional cookbook."
  },
  {
    id: 'sci-fi-novella',
    name: "Sci-Fi Novella",
    description: "Futuristic adventures, alien worlds, and mind-bending concepts.",
    icon: RocketIcon,
    promptContext: "You are a Nebula Award-winning science fiction author. Write the beginning of a compelling sci-fi novella. Establish a unique world, introduce an intriguing character, and present a central conflict or mystery. Your tone should be evocative and thought-provoking."
  },
  {
    id: 'technical-manual',
    name: "Technical Manual",
    description: "Precise and informative guides for complex subjects.",
    icon: WrenchIcon,
    promptContext: "You are an expert technical writer. Create a section of a user manual. Your writing must be extremely clear, precise, and unambiguous. Use numbered or bulleted lists for procedures. The goal is to help a user understand and operate a complex system."
  },
  {
    id: 'self-help-guide',
    name: "Self-Help Guide",
    description: "Inspirational and practical advice for personal growth.",
    icon: HeartPulseIcon,
    promptContext: "You are a compassionate and insightful self-help author. Write a chapter for a self-help book. Offer actionable advice, empathetic insights, and motivational encouragement. Use a supportive and clear tone to guide the reader towards personal improvement."
  },
  {
    id: 'philosophy-text',
    name: "Philosophy Text",
    description: "Deep explorations of fundamental questions about existence.",
    icon: BrainCircuitIcon,
    promptContext: "You are a renowned philosopher. Write an excerpt from a philosophical text. Explore a complex concept with intellectual rigor. Define terms clearly, present a logical argument, and consider potential counterarguments. The language should be academic and precise."
  }
];
