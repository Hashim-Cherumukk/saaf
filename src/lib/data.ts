// src/lib/data.ts

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "qamees" | "perfumes";
  isNew?: boolean;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White Qamees",
    price: 85,
    image: "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "qamees",
    description: "Premium cotton blend for everyday elegance.",
  },
  {
    id: "2",
    name: "Midnight Oud Perfume",
    price: 120,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "perfumes",
    description: "Deep, woody notes with a touch of saffron.",
  },
  {
    id: "3",
    name: "Royal Black Qamees",
    price: 95,
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "qamees",
    description: "Tailored fit with intricate cuff detailing.",
  },
  {
    id: "4",
    name: "Desert Rose Elixir",
    price: 110,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop", // Placeholder
    category: "perfumes",
    description: "Floral and warm, perfect for evening wear.",
  }
];