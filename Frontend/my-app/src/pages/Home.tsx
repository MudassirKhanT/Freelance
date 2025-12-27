import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types/Project";
import ProjectCard from "@/components/ProjectCard";
import Header from "@/components/layout/Header";

interface Studio {
  _id: string;
  title: string;
  description: string;
  image?: string;
  location?: string;
  contact?: string;
  email?: string;
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [studio, setStudio] = useState<Studio | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const firstSectionRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  /* ---------------- FETCH PROJECTS ---------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects/homepage/list");

        if (Array.isArray(res.data)) {
          const filtered = res.data.filter((p: Project) => p.toHomePage || p.isPrior);

          const sorted = filtered.sort((a: any, b: any) => {
            const aOrder = a.homePageOrder ?? Number.MAX_SAFE_INTEGER;
            const bOrder = b.homePageOrder ?? Number.MAX_SAFE_INTEGER;
            if (aOrder !== bOrder) return aOrder - bOrder;
            if (a.isPrior && !b.isPrior) return -1;
            if (!a.isPrior && b.isPrior) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

          setProjects(sorted);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  /* ---------------- FETCH STUDIO ---------------- */
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/studio");
        if (res.data && res.data.length > 0) setStudio(res.data[0]);
      } catch (err) {
        console.error("Error fetching studio:", err);
      }
    };

    fetchStudio();
  }, []);

  /* ---------------- HEADER VISIBILITY ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHeaderVisible(!(currentY > lastScrollY.current && currentY > 50));
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) {
            setHeaderVisible(false);
          }
        });
      },
      { threshold: [0.6] }
    );

    if (firstSectionRef.current) observer.observe(firstSectionRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  /* ---------------- DESKTOP LAYOUT PATTERN ---------------- */
  const layoutPattern = [1, 1, 2, 1, 1, 2, 2, 1, 1];

  const generateLayoutGroups = (items: Project[]) => {
    const groups: Project[][] = [];
    let i = 0;
    let patternIndex = 0;

    while (i < items.length) {
      const size = layoutPattern[patternIndex % layoutPattern.length];
      groups.push(items.slice(i, i + size));
      i += size;
      patternIndex++;
    }
    return groups;
  };

  const groups = generateLayoutGroups(projects);

  return (
    <section className="w-full min-h-screen bg-white overflow-hidden">
      <Header visible={headerVisible} />

      {/* ================= PROJECT SECTIONS ================= */}
      <div className="flex flex-col w-full">
        {groups.map((group, gi) => {
          /* -------- STUDIO + PROJECT SECTION -------- */
          if (gi === 6 && studio) {
            const projectForRight = group[0];

            return (
              <div key="studio-section">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
                  {/* LEFT : STUDIO */}
                  <div className="flex flex-col justify-center px-6 sm:px-10 md:px-20 md:h-[100vh] bg-[#f4f3f1]">
                    <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 mt-4 font-['Times_New_Roman']">{studio.title}</h2>

                      <p
                        className="font-['Times_New_Roman'] text-gray-800 leading-relaxed mb-6"
                        style={{
                          fontSize: studio.description.length > 450 ? "0.9rem" : studio.description.length > 300 ? "1rem" : studio.description.length > 150 ? "1.1rem" : "1.25rem",
                          lineHeight: "1.6rem",
                        }}
                      >
                        {studio.description}
                      </p>

                      <button
                        onClick={() => {
                          navigate("/about");
                          window.scrollTo({ top: 0, behavior: "instant" });
                        }}
                        className="text-gray-700 hover:text-gray-900 underline mb-5"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>

                  {/* RIGHT : PROJECT (FIXED FOR MOBILE) */}
                  <div className="relative w-full">{projectForRight && <ProjectCard project={projectForRight} onClick={(id) => navigate(`/projects/${id}`)} layout="half" />}</div>
                </div>

                {/* REMAINING PROJECTS */}
                {group.slice(1).map((proj) => (
                  <div key={proj._id} className="w-full">
                    <ProjectCard project={proj} onClick={(id) => navigate(`/projects/${id}`)} layout="full" />
                  </div>
                ))}
              </div>
            );
          }

          /* -------- SINGLE PROJECT -------- */
          if (group.length === 1) {
            const proj = group[0];
            return (
              <div key={proj._id} ref={gi === 0 ? firstSectionRef : undefined} className="w-full md:h-[100vh]">
                <ProjectCard project={proj} onClick={(id) => navigate(`/projects/${id}`)} layout="full" />
              </div>
            );
          }

          /* -------- MULTI PROJECT GROUP -------- */
          return (
            <div key={`group-${gi}`} className="grid grid-cols-1 md:grid-cols-2 w-full">
              {group.map((proj) => (
                <div key={proj._id} className="w-full md:h-screen">
                  <ProjectCard project={proj} onClick={(id) => navigate(`/projects/${id}`)} layout="half" />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
