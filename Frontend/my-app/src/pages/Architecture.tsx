import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Project } from "../types/Project";
import Header from "@/components/layout/Header";

const Architecture: React.FC = () => {
  const { subcategory } = useParams<{ subcategory?: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  // Redirect to /architecture/all by default
  useEffect(() => {
    if (!subcategory) navigate("/architecture/all", { replace: true });
  }, [subcategory, navigate]);

  // Fetch all projects
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  // Filter by subcategory — exclude Home Page projects
  const filteredProjects = projects.filter((p) => {
    const category = p.category?.toLowerCase() || "";
    const subCat = p.subCategory?.toLowerCase() || "";
    if (category !== "architecture" || p.toHomePage) return false;
    if (!subcategory || subcategory.toLowerCase() === "all") return true;
    return subCat === subcategory.toLowerCase();
  });

  const tabs = ["all", "residential", "commercial"];
  const activeTab = (subcategory || "all").toLowerCase();

  return (
    <div className="w-full relative bg-white">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Tabs (clean, no underline, with better spacing) */}
      <div
        className="
    container mx-auto
    px-4 sm:px-4
    pt-28 pb-15
    flex flex-nowrap sm:flex-wrap
    gap-2 sm:gap-4
    justify-start
    max-w-full
    overflow-x-auto
  "
      >
        {tabs.map((sub) => {
          const isActive = activeTab === sub;
          return (
            <Link
              key={sub}
              to={`/architecture/${sub}`}
              className={`
          px-2 sm:px-5
          py-1
          font-semibold
          text-md sm:text-base
          whitespace-nowrap
          transition-colors duration-300
          ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"}
        `}
            >
              {sub.charAt(0).toUpperCase() + sub.slice(1)}
            </Link>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="w-full">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] w-full">
            {filteredProjects.slice(0, 30).map((project) => (
              <div key={project._id} onClick={() => navigate(`/projects/${project._id}`)} className="relative cursor-pointer group overflow-hidden">
                {/* IMAGE WRAPPER */}
                <div className="relative w-full h-full">
                  {/* FIRST IMAGE */}
                  <img
                    src={`http://localhost:5000/${project.images[0]}`}
                    alt={project.title}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      img.style.objectFit = img.naturalHeight > img.naturalWidth ? "contain" : "cover";
                    }}
                    className="
                w-full h-full
                transition-opacity duration-700 ease-in-out
                opacity-100 group-hover:opacity-0
              "
                  />

                  {/* SECOND IMAGE (hover swap) */}
                  {project.images[1] && (
                    <img
                      src={`http://localhost:5000/${project.images[1]}`}
                      alt={project.title}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        img.style.objectFit = img.naturalHeight > img.naturalWidth ? "contain" : "cover";
                      }}
                      className="
                  absolute top-0 left-0
                  w-full h-full
                  opacity-0 transition-opacity duration-700 ease-in-out
                  group-hover:opacity-100
                "
                    />
                  )}
                </div>

                {/* OVERLAY */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 text-white pointer-events-none">
                  <h2 className="text-lg sm:text-xl font-semibold">{project.title}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Coming Soon Section */
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 animate-pulse">Coming Soon</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md">
              Exciting new designs are on their way in our <span className="font-semibold">{subcategory ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1) : "Architecture"}</span> collection.
            </p>
            <div className="mt-8">
              <div className="w-24 h-1 bg-black mx-auto rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Architecture;
