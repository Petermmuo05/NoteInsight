export type User = {
  id: string;
  firstName: string;
  email: string;
  image: string | null;
  token: string;
};

export interface Quiz {
  question: string;
  answer: string;
}

export interface Summary {
  summaryText: string;
}

export interface NoteData {
  id: number;
  createdAt: string; // Use ISO 8601 format; you can parse this to Date if needed
  preview: string;
  isFavorite: boolean;
  title: string | null;
  fileName: string;
  summary: Summary;
  tag: Tag;
  quiz: Quiz[];
}

export interface Tag {
  id: number;
  name: string;
  isDefault: boolean;
}
