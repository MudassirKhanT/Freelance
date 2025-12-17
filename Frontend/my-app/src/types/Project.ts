// export interface Project {
//   _id: string;
//   title: string;
//   category: "Architecture" | "Interior" | "Objects" | "Exhibition";
//   subCategory: "Residential" | "Commercial" | "All" | "Lighting";
//   description?: string;
//   images: string[];
// }
export interface Project {
  _id: string;
  title: string;
  category: "Architecture" | "Interior" | "Objects" | "Exhibition";
  subCategory: "Residential" | "Commercial" | "All" | "Lighting" | "Furniture";
  description?: string;
  images: string[];
  pdfFile?: string;

  // 🆕 Added fields
  isPrior: boolean; // Used for prioritizing projects (Yes/No)
  videoFile?: string;
  toHomePage: boolean; // Determines if project appears on Home Page
  homePageOrder?: number; // Optional order number for homepage
  createdAt: string; // ISO date string (used for sorting by latest)
  updatedAt?: string; // Optional, for tracking updates
  contactDescription?: string;
}
