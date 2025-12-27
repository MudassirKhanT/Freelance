import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Project } from "../types/Project";
import Header from "@/components/layout/Header";
import { FileDown, X } from "lucide-react";
import ObjectsContact from "./ObjectsContact";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const zoomRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Fetch project
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error("Error fetching project:", err));
  }, [id]);

  // HEADER SHOW/HIDE
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 50) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Disable scroll when modal open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [selectedIndex]);

  // Touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!project || selectedIndex === null) return;
    const diff = (touchStartX ?? 0) - (touchEndX ?? 0);
    if (Math.abs(diff) > 50) {
      if (diff > 0 && selectedIndex < project.images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (diff < 0 && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!project) return <p className="pt-20 text-center">Loading...</p>;

  return (
    <div className="w-full bg-[#f4f3f1] overflow-x-hidden">
      {/* ---------------------------------- */}
      {/*   FIXED — HEADER OUTSIDE IMAGE    */}
      {/* ---------------------------------- */}
      <Header visible={headerVisible} />

      {/* ================= COVER IMAGE ================= */}
      <div
        className="
    relative w-full
    overflow-hidden
    p-0 pb-0            /* ✅ no bottom padding on mobile */
    md:pb-0
    md:h-auto md:aspect-[1800/1402]
    cursor-pointer
  "
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("header") || target.closest(".header-modal")) return;
          setSelectedIndex(0);
        }}
      >
        <img
          src={`http://localhost:5000/${project.images[0]}`}
          alt={project.title}
          draggable={false}
          className="
    w-full h-auto
    object-contain
    block

    md:absolute md:inset-0
    md:w-full md:h-full md:object-cover
  "
        />
      </div>

      {/* INFO SECTION */}
      <div className="container mx-auto px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="flex flex-col justify-center items-center text-center gap-6 md:pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{project.title}</h2>

            {project.contactDescription && (
              <ul className="space-y-2 text-gray-700 text-base md:text-lg leading-relaxed">
                {project.contactDescription
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <li key={index}>{line.trim()}</li>
                  ))}
              </ul>
            )}

            <div className="flex items-center justify-center gap-6 mt-4">
              {project.pdfFile && (
                <a href={`http://localhost:5000/${project.pdfFile}`} download className="inline-flex items-center gap-2 text-gray-700 hover:text-black font-medium">
                  <FileDown className="w-5 h-5" />
                  <span>Download PDF</span>
                </a>
              )}

              <ObjectsContact projectTitle={project.title} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-center md:text-left md:pr-6">
            <div className="text-gray-800 text-base md:text-lg leading-relaxed space-y-4">
              {project.description?.split(/\n\s*\n/).map((block, idx) => (
                <p key={idx}>{block.trim()}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE GRID */}
      <div className="w-full bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-3 sm:gap-3 md:gap-4">
          {project.images.slice(1, 31).map((img, idx) => {
            const fileName = img.split("/").pop() || "";
            const parts = fileName.split(".");
            const ratio = parseFloat(`${parts[1]}.${parts[2]}`) || 1;
            const isLandscape = ratio > 1;

            return (
              <div
                key={idx}
                onClick={() => setSelectedIndex(idx + 1)}
                className={`
            overflow-hidden cursor-pointer bg-gray-50
            ${isLandscape ? "md:col-span-2" : "md:col-span-1"}
            md:h-[550px] sm:h-[320px]
          `}
              >
                <img
                  src={`http://localhost:5000/${img}`}
                  alt={`${project.title} ${idx}`}
                  className="
              w-full
              h-auto
              object-contain
              md:h-full md:object-fill
            "
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {selectedIndex !== null && (
        <div
          ref={zoomRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedIndex(null);
              setZoom(1);
            }
          }}
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={`http://localhost:5000/${project.images[selectedIndex]}`}
              className="object-contain max-w-full max-h-full transition-transform"
              style={{ transform: `scale(${zoom})` }}
              onWheel={(e) => {
                e.preventDefault();
                if (e.deltaY < 0) setZoom((z) => Math.min(z + 0.2, 3));
                else setZoom((z) => Math.max(z - 0.2, 1));
              }}
            />

            <button
              onClick={() => {
                setSelectedIndex(null);
                setZoom(1);
              }}
              className="absolute top-6 right-8 text-white cursor-pointer"
            >
              <X size={34} />
            </button>
          </div>

          {/* ZOOM BUTTONS */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-white">
            <button onClick={() => setZoom((z) => Math.max(z - 0.2, 1))} className="text-3xl cursor-pointer px-3 pb-1 bg-gray-700 bg-opacity-60 rounded-full">
              −
            </button>
            <button onClick={() => setZoom((z) => Math.min(z + 0.2, 3))} className="text-3xl cursor-pointer px-3 pb-1 bg-gray-700 bg-opacity-60 rounded-full">
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
