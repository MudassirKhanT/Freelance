// import { useEffect, useState } from "react";
// import Header from "@/components/layout/Header";
// import axios from "axios";

// interface Studio {
//   _id: string;
//   title: string;
//   description: string;
//   image?: string;
//   location?: string;
//   contact?: string;
//   email?: string;
// }

// interface TeamMember {
//   _id: string;
//   name: string;
//   role: string;
//   description: string;
//   image?: string;
// }

// const About = () => {
//   const tabs = ["studio", "people", "press"];
//   const [studio, setStudio] = useState<Studio | null>(null);
//   const [team, setTeam] = useState<TeamMember[]>([]);
//   const [activeTab, setActiveTab] = useState("studio");

//   // Fetch Studio Data
//   useEffect(() => {
//     const fetchStudio = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/studio");
//         if (res.data && res.data.length > 0) setStudio(res.data[0]);
//       } catch (err) {
//         console.error("Error fetching studio:", err);
//       }
//     };
//     fetchStudio();
//   }, []);

//   // Fetch Team Data
//   useEffect(() => {
//     const fetchTeam = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/team");
//         setTeam(res.data);
//       } catch (err) {
//         console.error("Error fetching team:", err);
//       }
//     };
//     fetchTeam();
//   }, []);

//   // Smooth scroll between sections
//   const handleTabClick = (tab: string) => {
//     setActiveTab(tab);
//     const section = document.getElementById(tab);
//     if (section) section.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="relative bg-white text-black font-sans overflow-x-hidden">
//       {/* Header */}
//       <div className="absolute top-0 left-0 w-full z-20">
//         <Header />
//       </div>

//       {/* Tabs */}
//       <div className="container mx-auto px-4 pt-28  pb-5 flex space-x-6 justify-start">
//         {tabs.map((tab) => {
//           const isActive = activeTab === tab;
//           return (
//             <button key={tab} onClick={() => handleTabClick(tab)} className={`relative px-3 py-1 mb-10 text-base font-semibold transition-all duration-300 ${isActive ? "text-gray-800" : "text-gray-400 hover:text-gray-600"}`}>
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           );
//         })}
//       </div>

//       {/* ===== STUDIO SECTION ===== */}
//       <section id="studio" className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#f4f3f1]">
//         {/* Left: Image */}
//         <div className="w-full md:w-1/2 h-[40vh] md:h-screen">{studio?.image ? <img src={`http://localhost:5000${studio.image}`} alt={studio.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">No Image Available</div>}</div>

//         {/* Right: Details */}
//         <div className="w-full md:w-1/2 p-8 md:p-16 text-center md:text-left">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Times_New_Roman']">{studio?.title || "Our Studio"}</h2>
//           <p className="text-base md:text-lg mb-6 leading-relaxed font-['Times_New_Roman'] text-gray-800">{studio?.description || "Welcome to our creative studio where design and innovation meet timeless architecture."}</p>
//           <div className="font-['Times_New_Roman'] font-semibold space-y-2 text-gray-700 text-sm md:text-base">
//             <p>📍 {studio?.location || "Location not provided"}</p>
//             <p>📞 {studio?.contact || "Contact unavailable"}</p>
//             <p>✉️ {studio?.email || "Email not available"}</p>
//           </div>
//         </div>
//       </section>

//       {/* ===== PEOPLE SECTION ===== */}
//       <section id="people" className="bg-white py-20">
//         {/* HEADER */}
//         <div className="text-center mb-20 px-6">
//           <h2 className="text-3xl md:text-4xl font-['Times_New_Roman'] font-semibold text-gray-900 mb-4">Our Team</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">Meet our creative professionals driving innovation every day.</p>
//         </div>

//         {/* TEAM LIST */}
//         <div className="max-w-6xl mx-auto flex flex-col space-y-16 space-x-4 px-6 md:px-12 lg:px-30">
//           {team.map((member) => (
//             <div
//               key={member._id}
//               className="
//           grid
//           grid-cols-1
//           md:grid-cols-[260px_1fr]
//           gap-15
//           items-center
//         "
//             >
//               {/* IMAGE — SIZE UNCHANGED */}
//               <div className="flex justify-center md:justify-start">
//                 <img
//                   src={member.image ? `http://localhost:5000${member.image}` : "https://via.placeholder.com/400x500"}
//                   alt={member.name}
//                   className="
//               w-[240px]
//               sm:w-[260px]
//               h-[300px]
//               sm:h-[320px]
//               object-cover
//             "
//                 />
//               </div>

//               {/* CONTENT */}
//               <div className="text-center md:text-left">
//                 <h3 className="text-blue-700 text-2xl font-semibold leading-tight mb-1">{member.name}</h3>

//                 {member.role && <p className="text-blue-700 text-lg mb-4">{member.role}</p>}

//                 <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto md:mx-0">{member.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== PRESS SECTION ===== */}
//       <section id="press" className="bg-[#ffff] py-3 px-1 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Times_New_Roman']">Press & Media</h2>
//         <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-base md:text-lg">Explore our latest mentions, collaborations, and design recognitions.</p>

//         <a href="/press" className="inline-block text-gray-800 hover:text-gray-600 font-medium transition-all duration-300">
//           View Presses →
//         </a>
//       </section>
//     </div>
//   );
// };

// export default About;

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

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/studio");
        if (res.data && res.data.length > 0) setStudio(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudio();
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/team");
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const section = document.getElementById(tab);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-white text-black overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      <div className="container mx-auto px-4 pt-28 pb-5 flex space-x-6 justify-start">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button key={tab} onClick={() => handleTabClick(tab)} className={`md:px-5 px-2 relative py-1 mb-10 text-base font-semibold cursor-pointer transition-all duration-300 ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          );
        })}
      </div>

      <section id="studio" className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#f4f3f1] 2xl:px-24">
        <div className="w-full md:w-1/2 h-[40vh] md:h-screen">{studio?.image ? <img src={`http://localhost:5000${studio.image}`} alt={studio.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">No Image Available</div>}</div>

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

      <section id="people" className="bg-white py-20 2xl:max-w-[1400px] 2xl:mx-auto">
        <div className="text-center mb-20 px-6">
          <h2 className="text-3xl md:text-4xl font-['Times_New_Roman'] font-semibold text-gray-900 mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">Meet our creative professionals driving innovation every day.</p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col space-y-16 space-x-19 px-6 md:px-12 lg:px-40">
          {team.map((member) => (
            <div key={member._id} className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-15 items-center">
              <div className="flex justify-center md:justify-start">
                <img src={member.image ? `http://localhost:5000${member.image}` : "https://via.placeholder.com/400x500"} alt={member.name} className="w-[240px] sm:w-[260px] h-[300px] sm:h-[320px] object-cover" />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-blue-700 text-2xl font-semibold leading-tight mb-1">{member.name}</h3>
                {member.role && <p className="text-blue-700 text-lg mb-4">{member.role}</p>}
                <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto md:mx-0">{member.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="press" className="bg-[#ffff] py-3 px-1 text-center 2xl:max-w-[1400px] 2xl:mx-auto">
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
