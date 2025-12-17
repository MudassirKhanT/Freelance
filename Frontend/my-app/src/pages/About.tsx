import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import axios from "axios";

interface Studio {
  _id: string;
  title: string;
  description: string;
  image?: string;
  location?: string;
  contact?: string;
  email?: string;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
}

const About = () => {
  const tabs = ["studio", "people", "press"];
  const [studio, setStudio] = useState<Studio | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [activeTab, setActiveTab] = useState("studio");

  // Fetch Studio Data
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

  // Fetch Team Data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/team");
        setTeam(res.data);
      } catch (err) {
        console.error("Error fetching team:", err);
      }
    };
    fetchTeam();
  }, []);

  // Smooth scroll between sections
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const section = document.getElementById(tab);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-white text-black font-sans overflow-x-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 pt-28  pb-5 flex space-x-6 justify-start">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button key={tab} onClick={() => handleTabClick(tab)} className={`relative px-3 py-1 mb-10 text-base font-semibold transition-all duration-300 ${isActive ? "text-gray-800" : "text-gray-400 hover:text-gray-600"}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          );
        })}
      </div>

      {/* ===== STUDIO SECTION ===== */}
      <section id="studio" className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#f4f3f1]">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-screen">{studio?.image ? <img src={`http://localhost:5000${studio.image}`} alt={studio.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">No Image Available</div>}</div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Times_New_Roman']">{studio?.title || "Our Studio"}</h2>
          <p className="text-base md:text-lg mb-6 leading-relaxed font-['Times_New_Roman'] text-gray-800">{studio?.description || "Welcome to our creative studio where design and innovation meet timeless architecture."}</p>
          <div className="font-['Times_New_Roman'] font-semibold space-y-2 text-gray-700 text-sm md:text-base">
            <p>📍 {studio?.location || "Location not provided"}</p>
            <p>📞 {studio?.contact || "Contact unavailable"}</p>
            <p>✉️ {studio?.email || "Email not available"}</p>
          </div>
        </div>
      </section>

      {/* ===== PEOPLE SECTION ===== */}
      <section id="people" className="py-20 bg-white">
        <div className="text-center px-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-['Times_New_Roman']">Our Team</h2>
          <p className="text-gray-600 text-base md:text-lg">Meet our creative professionals driving innovation every day.</p>
        </div>

        <div className="flex flex-col space-y-20 px-6 md:px-24">
          {team.map((member) => (
            <div key={member._id} className="flex flex-col md:flex-row items-center md:items-start md:gap-16 gap-10">
              {/* IMAGE */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                <img
                  src={member.image ? `http://localhost:5000${member.image}` : "https://via.placeholder.com/500x500"}
                  alt={member.name}
                  className="
              w-full 
              h-auto 
              max-h-[420px]
              object-contain   /* <-- Full image visible, not cut */
              shadow-sm
            "
                />
              </div>

              {/* TEXT CONTENT */}
              <div className="w-full md:w-2/3 text-left">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                  {member.name}
                  {member.role && <span className="text-gray-500 font-normal">, {member.role}</span>}
                </h3>

                <p className="text-gray-800 text-base md:text-lg leading-relaxed max-w-2xl">{member.description || "A passionate team member contributing to our success."}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRESS SECTION ===== */}
      <section id="press" className="bg-[#ffff] py-20 text-center border-t border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Times_New_Roman']">Press & Media</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-base md:text-lg">Explore our latest mentions, collaborations, and design recognitions.</p>

        <a href="/press" className="inline-block text-gray-800 hover:text-gray-600 font-medium transition-all duration-300">
          View Presses →
        </a>
      </section>
    </div>
  );
};

export default About;
