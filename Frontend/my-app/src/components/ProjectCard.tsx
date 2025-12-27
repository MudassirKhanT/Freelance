// import { useRef } from "react";
// import type { Project } from "../types/Project";

// interface ProjectCardProps {
//   project: Project;
//   onClick: (id: string) => void;
//   layout?: "full" | "half";
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, layout = "full" }) => {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const isVideo = !!project.videoFile;

//   return (
//     <div
//       ref={ref}
//       className={`relative overflow-hidden w-full h-full ${isVideo ? "cursor-default" : "cursor-pointer"}`}
//       onClick={() => {
//         if (!isVideo) onClick(project._id);
//       }}
//     >
//       {/* ✅ Display video or image */}
//       <div className="relative w-full h-full overflow-hidden">
//         {isVideo ? <video src={`http://localhost:5000/${project.videoFile}`} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /> : project.images?.[0] ? <img src={`http://localhost:5000/${project.images[0]}`} alt={project.title} className="absolute inset-0 w-full h-full object-cover" draggable={false} /> : <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">No Preview</div>}
//       </div>

//       {/* ✅ Show text overlay only for non-video projects */}
//       {!isVideo && (
//         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 md:p-8 text-white">
//           <h1 className="text-2xl md:text-3xl font-semibold">{project.title}</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectCard;

// MOBILE VIEW

// import { useRef } from "react";
// import type { Project } from "../types/Project";

// interface ProjectCardProps {
//   project: Project;
//   onClick: (id: string) => void;
//   layout?: "full" | "half";
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, layout = "full" }) => {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const isVideo = !!project.videoFile;

//   // 🔹 Extract aspect ratio from filename (date.aspect.ratio.jpg)
//   let aspectRatio = 1;
//   if (project.images?.[0]) {
//     const fileName = project.images[0].split("/").pop() || "";
//     const parts = fileName.split(".");
//     aspectRatio = parseFloat(`${parts[1]}.${parts[2]}`) || 1;
//   }

//   return (
//     <div
//       ref={ref}
//       className={`relative w-full ${isVideo ? "cursor-default" : "cursor-pointer"}`}
//       onClick={() => {
//         if (!isVideo) onClick(project._id);
//       }}
//     >
//       {/* MEDIA WRAPPER */}
//       <div
//         className="relative w-full overflow-hidden"
//         style={{ aspectRatio }} // ✅ MOBILE: natural height
//       >
//         {isVideo ? (
//           <video
//             src={`http://localhost:5000/${project.videoFile}`}
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="
//               w-full h-auto object-contain
//               md:absolute md:inset-0
//               md:w-full md:h-full md:object-cover
//             "
//           />
//         ) : project.images?.[0] ? (
//           <img
//             src={`http://localhost:5000/${project.images[0]}`}
//             alt={project.title}
//             draggable={false}
//             className="
//               w-full h-auto object-contain
//               block

//               md:absolute md:inset-0
//               md:w-full md:h-full md:object-cover
//             "
//           />
//         ) : (
//           <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 text-gray-500">No Preview</div>
//         )}
//       </div>

//       {/* TEXT OVERLAY (desktop only look preserved) */}
//       {!isVideo && (
//         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 md:p-8 text-white">
//           <h1 className="text-lg md:text-3xl font-semibold">{project.title}</h1>
//         </div>
//       )}
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

  // 🔹 Extract aspect ratio from filename (date.aspect.ratio.jpg)
  let aspectRatio = 1;
  if (project.images?.[0]) {
    const fileName = project.images[0].split("/").pop() || "";
    const parts = fileName.split(".");
    aspectRatio = parseFloat(`${parts[1]}.${parts[2]}`) || 1;
  }

  return (
    <div
      ref={ref}
      className={`relative w-full md:h-full ${isVideo ? "cursor-default" : "cursor-pointer"}`}
      onClick={() => {
        if (!isVideo) onClick(project._id);
      }}
    >
      {/* ================= MEDIA WRAPPER ================= */}
      <div
        className="relative w-full overflow-hidden md:h-full"
        style={{ aspectRatio }} // ✅ mobile natural height
      >
        {isVideo ? (
          <video
            src={`http://localhost:5000/${project.videoFile}`}
            autoPlay
            loop
            muted
            playsInline
            className="            
    w-full h-full object-cover
    md:absolute md:inset-0
    md:w-full md:h-full md:object-cover
  "
          />
        ) : project.images?.[0] ? (
          <img
            src={`http://localhost:5000/${project.images[0]}`}
            alt={project.title}
            draggable={false}
            className="
              w-full h-auto object-contain block
              md:absolute md:inset-0
              md:w-full md:h-full md:object-cover
            "
          />
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 text-gray-500">No Preview</div>
        )}
      </div>

      {/* ================= TEXT OVERLAY ================= */}
      {!isVideo && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 md:p-8 text-white">
          <h1 className="text-lg md:text-3xl font-semibold">{project.title}</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
