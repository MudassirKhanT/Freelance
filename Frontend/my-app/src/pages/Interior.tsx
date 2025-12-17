// Filter by category and subcategory
// const filteredProjects = projects.filter((p) => {
//   const category = p.category?.toLowerCase() || "";
//   const subCat = p.subCategory?.toLowerCase() || "";
//   if (category !== "interior") return false;
//   if (!subcategory || subcategory.toLowerCase() === "all") return true;
//   return subCat === subcategory.toLowerCase();
// });
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Project } from "../types/Project";
import Header from "@/components/layout/Header";

const Interior: React.FC = () => {
  const { subcategory } = useParams<{ subcategory?: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  // Redirect to /interior/all by default
  useEffect(() => {
    if (!subcategory) navigate("/interior/all", { replace: true });
  }, [subcategory, navigate]);

  // Fetch all projects
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  // Filter interior projects only (excluding Home Page ones)
  const filteredProjects = projects.filter((p) => {
    const category = p.category?.toLowerCase() || "";
    const subCat = p.subCategory?.toLowerCase() || "";

    if (category !== "interior" || p.toHomePage) return false;
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

      {/* Tabs (clean, no underline, proper spacing) */}
      <div
        className="
    container mx-auto px-4 pt-28 pb-15 
    flex flex-wrap gap-4 
    justify-start sm:justify-start 
    max-w-full ml-4
  "
      >
        {tabs.map((sub) => {
          const isActive = activeTab === sub;
          return (
            <Link
              key={sub}
              to={`/interior/${sub}`}
              className={`
          px-3 py-1 
          font-semibold text-base 
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
              <div key={project._id} className="relative cursor-pointer overflow-hidden group h-[85vh] sm:h-[90vh]" onClick={() => navigate(`/projects/${project._id}`)}>
                {/* First Image */}
                <img src={`http://localhost:5000/${project.images[0]}`} alt={project.title} className="w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0" />

                {/* Second Image (hover swap) */}
                {project.images[1] && <img src={`http://localhost:5000/${project.images[1]}`} alt={project.title} className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />}

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 text-white">
                  <h2 className="text-lg sm:text-xl font-semibold">{project.title}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Coming Soon
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 animate-pulse">Coming Soon</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md">
              Exciting new designs are on their way in our <span className="font-semibold">{subcategory ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1) : "Interior"}</span> collection.
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

export default Interior;
