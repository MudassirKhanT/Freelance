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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let aspectRatio = 1;
  if (project.images?.[0]) {
    const fileName = project.images[0].split("/").pop() || "";
    const parts = fileName.split(".");
    aspectRatio = parseFloat(`${parts[1]}.${parts[2]}`) || 1;
  }

  return (
    <div
      ref={ref}
      className={`
        relative w-full
        md:h-screen
        ${isVideo ? "cursor-default" : "cursor-pointer"}
      `}
      onClick={() => {
        if (!isVideo) onClick(project._id);
      }}
    >
      <div className="relative w-full overflow-hidden md:h-full" style={{ aspectRatio }}>
        {isVideo ? (
          <video
            src={`${backendUrl}/${project.videoFile}`}
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
            src={`${backendUrl}/${project.images[0]}`}
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

      {project.homePageOrder === 1 && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <span
            className="
              text-white font-extrabold
              text-2xl sm:text-3xl md:text-5xl lg:text-6xl
              tracking-widest
              cursor-pointer
              select-none
              pointer-events-auto
            "
            onClick={(e) => {
              e.stopPropagation();
              window.location.reload();
            }}
          >
            LİNEDORİ
          </span>
        </div>
      )}

      {!isVideo && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 md:p-8 text-white">
          <h1 className="text-lg md:text-2xl font-semibold">{project.title}</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
