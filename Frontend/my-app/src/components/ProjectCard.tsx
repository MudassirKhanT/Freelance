// import type { Project } from "@/types/Project";
// import Header from "@/components/layout/Header";
// import { useState, useRef, useEffect } from "react";

// interface ProjectCardProps {
//   project: Project;
//   onClick: (id: string) => void;
//   layout?: "full" | "half"; // added to support different layouts
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, layout = "full" }) => {
//   const [headerVisible, setHeaderVisible] = useState(true);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           setHeaderVisible(entry.isIntersecting && entry.intersectionRatio > 0.9);
//         });
//       },
//       { threshold: 0.9 }
//     );

//     if (cardRef.current) observer.observe(cardRef.current);
//     return () => {
//       if (cardRef.current) observer.unobserve(cardRef.current);
//     };
//   }, []);

//   return (
//     <div ref={cardRef} className={`relative snap-start overflow-hidden ${layout === "full" ? "w-full h-screen" : "w-full h-[70vh]"}`}>
//       {/* 🔹 Project Image */}
//       <img src={`http://localhost:5000/${project.images?.[0]}`} alt={project.title} className="w-full h-full object-cover" />

//       {/* 🔹 Header Overlay */}
//       <Header visible={headerVisible} />

//       {/* 🔹 Text Overlay */}
//       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8 text-white">
//         <h1 className="text-2xl md:text-3xl font-semibold">{project.title}</h1>
//         <p className="text-sm opacity-90">{project.category}</p>
//       </div>

//       {/* 🔹 Clickable Overlay */}
//       <div className="absolute inset-0 cursor-pointer" onClick={() => onClick(project._id)}></div>
//     </div>
//   );
// };

// export default ProjectCard;
// import { useState, useRef, useEffect } from "react";
// import Header from "@/components/layout/Header";
// import type { Project } from "../types/Project";

// interface ProjectCardProps {
//   project: Project;
//   onClick: (id: string) => void;
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
//   const [headerVisible, setHeaderVisible] = useState(true);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           setHeaderVisible(entry.isIntersecting && entry.intersectionRatio > 0.9);
//         });
//       },
//       { threshold: 0.9 }
//     );

//     if (cardRef.current) observer.observe(cardRef.current);
//     return () => {
//       if (cardRef.current) observer.unobserve(cardRef.current);
//     };
//   }, []);

//   return (
//     <div ref={cardRef} className="relative w-full h-screen overflow-hidden snap-start" onClick={() => onClick(project._id)}>
//       {/* Fullscreen image */}
//       <img src={`http://localhost:5000/${project.images?.[0]}`} alt={project.title} className="w-full h-full object-cover" />

//       {/* Header overlay */}
//       <Header visible={headerVisible} />

//       {/* Project info overlay */}
//       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
//         <h1 className="text-3xl font-semibold">{project.title}</h1>
//         <p className="text-sm">{project.category}</p>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

// import { useState, useRef, useEffect } from "react";
// import Header from "@/components/layout/Header";
// import type { Project } from "../types/Project";

// interface ProjectCardProps {
//   project: Project;
//   onClick: (id: string) => void;
//   layout?: "full" | "half";
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, layout = "full" }) => {
//   const [headerVisible, setHeaderVisible] = useState(true);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           setHeaderVisible(entry.isIntersecting && entry.intersectionRatio > 0.9);
//         });
//       },
//       { threshold: 0.9 }
//     );

//     if (cardRef.current) observer.observe(cardRef.current);
//     return () => {
//       if (cardRef.current) observer.unobserve(cardRef.current);
//     };
//   }, []);

//   return (
//     <div ref={cardRef} className={`relative overflow-hidden ${layout === "full" ? "w-full h-full" : "w-full h-full"}`}>
//       {/* Image */}
//       <img src={`http://localhost:5000/${project.images?.[0]}`} alt={project.title} className="w-full h-full object-cover" />

//       {/* Header overlay */}
//       <Header visible={headerVisible} />

//       {/* Text overlay */}
//       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8 text-white">
//         <h1 className="text-2xl md:text-3xl font-semibold">{project.title}</h1>
//         <p className="text-sm opacity-90">{project.category}</p>
//       </div>

//       {/* Click layer */}
//       <div className="absolute inset-0 cursor-pointer" onClick={() => onClick(project._id)}></div>
//     </div>
//   );
// };

// export default ProjectCard;
//Usefull
// import { useState, useRef, useEffect } from "react";
// import Header from "@/components/layout/Header";
// import type { Project } from "../types/Project";

// interface ProjectCardProps {
//   project: Project;
//   onClick: (id: string) => void;
//   layout?: "full" | "half";
//   headerDisabled?: boolean; // ✅ new prop
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({
//   project,
//   onClick,
//   layout = "full",
//   headerDisabled = false, // ✅ default false
// }) => {
//   const [headerVisible, setHeaderVisible] = useState(true);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (headerDisabled) return; // ✅ Skip observer when header is off

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           setHeaderVisible(entry.isIntersecting && entry.intersectionRatio > 0.9);
//         });
//       },
//       { threshold: 0.9 }
//     );

//     if (cardRef.current) observer.observe(cardRef.current);
//     return () => {
//       if (cardRef.current) observer.unobserve(cardRef.current);
//     };
//   }, [headerDisabled]);

//   return (
//     <div ref={cardRef} className={`relative overflow-hidden ${layout === "full" ? "w-full h-full" : "w-full h-full"}`}>
//       {/* Image */}
//       <img src={`http://localhost:5000/${project.images?.[0]}`} alt={project.title} className="w-full h-full object-cover" />

//       {/* Header overlay (conditionally rendered) */}
//       {!headerDisabled && <Header visible={headerVisible} />}

//       {/* Text overlay */}
//       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8 text-white">
//         <h1 className="text-2xl md:text-3xl font-semibold">{project.title}</h1>
//         <p className="text-sm opacity-90">{project.category}</p>
//       </div>

//       {/* Click layer */}
//       <div className="absolute inset-0 cursor-pointer" onClick={() => onClick(project._id)}></div>
//     </div>
//   );
// };

// export default ProjectCard;

// Fully Working

// import { useRef } from "react";
// import type { Project } from "../types/Project";

// interface ProjectCardProps {
//   project: Project;
//   onClick: (id: string) => void;
//   layout?: "full" | "half";
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, layout = "full" }) => {
//   // Keep this minimal — no Header here anymore
//   const ref = useRef<HTMLDivElement | null>(null);

//   return (
//     <div ref={ref} className={`relative overflow-hidden ${layout === "full" ? "w-full h-full" : "w-full h-full"}`} onClick={() => onClick(project._id)}>
//       <img src={`http://localhost:5000/${project.images?.[0]}`} alt={project.title} className="w-full h-full object-cover" draggable={false} />

//       {/* Text overlay bottom */}
//       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8 text-white">
//         <h1 className="text-2xl md:text-3xl font-semibold">{project.title}</h1>
//         <p className="text-sm opacity-90">{project.category}</p>
//       </div>
//       <div className="absolute inset-0 cursor-pointer" onClick={() => onClick(project._id)}></div>
//     </div>
//   );
// };

// export default ProjectCard;

import { useRef } from "react";
import type { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
  layout?: "full" | "half";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, layout = "full" }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVideo = !!project.videoFile;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden w-full h-full ${isVideo ? "cursor-default" : "cursor-pointer"}`}
      onClick={() => {
        if (!isVideo) onClick(project._id);
      }}
    >
      {/* ✅ Display video or image */}
      <div className="relative w-full h-full overflow-hidden">
        {isVideo ? <video src={`http://localhost:5000/${project.videoFile}`} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /> : project.images?.[0] ? <img src={`http://localhost:5000/${project.images[0]}`} alt={project.title} className="absolute inset-0 w-full h-full object-cover" draggable={false} /> : <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">No Preview</div>}
      </div>

      {/* ✅ Show text overlay only for non-video projects */}
      {!isVideo && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-semibold">{project.title}</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
