// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// interface HeaderProps {
//   visible?: boolean;
// }

// const Header: React.FC<HeaderProps> = ({ visible = true }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isDark, setIsDark] = useState(true);
//   const [showHeader, setShowHeader] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const location = useLocation();

//   // ---------------- ROUTE BASED COLOR ----------------
//   useEffect(() => {
//     const lightRoutes = ["/architecture", "/architecture/all", "/interior", "/interior/all", "/objects", "/objects/all", "/exhibition", "/exhibition/all", "/about", "/press"];
//     const isProjectDetail = location.pathname.includes("/project/");
//     if (isProjectDetail) {
//       setIsDark(false);
//       return;
//     }
//     const isLight = lightRoutes.some((r) => location.pathname.startsWith(r));
//     setIsDark(!isLight);
//   }, [location]);

//   // ---------------- BODY SCROLL LOCK ----------------
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "auto";
//   }, [menuOpen]);

//   // ---------------- SCROLL UP/DOWN HEADER ----------------
//   useEffect(() => {
//     const handleScroll = () => {
//       const y = window.scrollY;
//       if (y > lastScrollY && y > 100) setShowHeader(false);
//       else setShowHeader(true);
//       setLastScrollY(y);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // ---------------- SECTION COLOR SWITCH ----------------
//   useEffect(() => {
//     let lastY = window.scrollY;
//     let scrollingUp = false;

//     const onScroll = () => {
//       const currentY = window.scrollY;
//       scrollingUp = currentY < lastY;
//       lastY = currentY;
//     };

//     const sections = document.querySelectorAll(".image-section");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && scrollingUp) setIsDark(true);
//           else if (scrollingUp) setIsDark(false);
//         });
//       },
//       { threshold: 0.3 }
//     );

//     sections.forEach((sec) => observer.observe(sec));
//     window.addEventListener("scroll", onScroll);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       sections.forEach((sec) => observer.unobserve(sec));
//     };
//   }, []);

//   // ---------------- COLORS ----------------
//   const textColor = isDark ? "text-white " : "text-black "; // Bold for all
//   const hoverColor = isDark ? "hover:text-white/80" : "hover:text-black/80";
//   const underlineColor = isDark ? "after:bg-white" : "after:bg-black";

//   const navItems = [
//     { label: "Architecture", path: "/architecture/all" },
//     { label: "Interior", path: "/interior/all" },
//     { label: "Objects", path: "/objects/all" },
//     { label: "Exhibition", path: "/exhibition/all" },
//     { label: "About", path: "/about" },
//   ];

//   const handleLinkClick = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setMenuOpen(false);
//   };

//   // ---------------- HEADER BG ----------------
//   const desktopBg = showHeader ? scrolledClass(isDark) : "bg-transparent -translate-y-full";

//   const mobileBg = showHeader ? scrolledClass(isDark) : "bg-transparent -translate-y-full";

//   function scrolledClass(dark: boolean) {
//     return `transition-all duration-500 ${dark ? "bg-transparent" : "backdrop-blur-md bg-white/90 shadow-sm"}`;
//   }

//   return (
//     <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}>
//       {/* ---------- DESKTOP ---------- */}
//       <div className={`hidden md:flex justify-between items-center h-16 px-8 transition-all duration-500 ${location.pathname === "/" ? "bg-transparent" : desktopBg}`}>
//         <h1 className={`text-2xl cursor-pointer ${textColor} ${hoverColor}`}>
//           <Link to="/" onClick={handleLinkClick}>
//             Portfolio
//           </Link>
//         </h1>
//         <nav className="flex space-x-8">
//           {navItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.path}
//               onClick={handleLinkClick}
//               className={`relative ${textColor} ${hoverColor} transition-colors duration-300
//           after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1
//           ${underlineColor} after:transition-all after:duration-300 hover:after:w-full`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* ---------- MOBILE ---------- */}
//       <div className={`md:hidden flex justify-between items-center px-5 h-16 transition-transform duration-500 ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"} ${isDark ? "bg-transparent" : "bg-white/90"}`}>
//         <h1 className={`text-xl font-semibold ${textColor}`}>
//           <Link to="/" onClick={handleLinkClick}>
//             Portfolio
//           </Link>
//         </h1>
//         <button className={`${textColor}`} onClick={() => setMenuOpen(true)}>
//           <Menu size={26} />
//         </button>
//       </div>

//       {/* ---------- MOBILE FULLSCREEN MODAL ---------- */}
//       {menuOpen && (
//         <div className="fixed top-0 left-0 w-screen h-screen bg-white z-[999] flex flex-col justify-between transition-transform duration-500 ease-in-out animate-slideDown">
//           <button className="absolute top-6 right-6 text-black hover:opacity-70 transition" onClick={() => setMenuOpen(false)}>
//             <X size={36} />
//           </button>

//           <nav className="flex flex-col space-y-6 text-xl font-semibold text-black px-8 mt-20">
//             {navItems.map((item, idx) => (
//               <Link
//                 key={idx}
//                 to={item.path}
//                 onClick={handleLinkClick}
//                 className="relative hover:opacity-70 transition-colors duration-300
//                   after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1
//                   after:bg-black after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           <div className="flex justify-between px-8 pb-8 text-sm font-medium">
//             <div>
//               <p className="font-semibold mb-1">STUDIO</p>
//               <p>264 Canal Street</p>
//               <p>#6W</p>
//               <p>New York, NY 10013</p>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold mb-1">CONTACT US</p>
//               <a href="mailto:studio@valledevalle.com" className="italic hover:underline text-black">
//                 studio@valledevalle.com↗
//               </a>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---------- ANIMATION STYLE ---------- */}
//       <style>{`
//         @keyframes slideDown {
//           0% { transform: translateY(-100%); opacity: 0; }
//           100% { transform: translateY(0); opacity: 1; }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.5s ease-in-out forwards;
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;

// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// interface HeaderProps {
//   visible?: boolean;
// }

// const Header: React.FC<HeaderProps> = ({ visible = true }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isDark, setIsDark] = useState(true);
//   const [showHeader, setShowHeader] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const location = useLocation();

//   // ---------------- ROUTE BASED COLOR ----------------
//   useEffect(() => {
//     const lightRoutes = ["/architecture", "/architecture/all", "/interior", "/interior/all", "/objects", "/objects/all", "/exhibition", "/exhibition/all", "/about", "/press"];

//     const isProjectDetail = location.pathname.includes("/project/");
//     if (isProjectDetail) {
//       setIsDark(false);
//       return;
//     }

//     const isLight = lightRoutes.some((r) => location.pathname.startsWith(r));
//     setIsDark(!isLight);
//   }, [location]);

//   // ---------------- BODY SCROLL LOCK ----------------
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "auto";
//   }, [menuOpen]);

//   // ---------------- SCROLL UP/DOWN HEADER ----------------
//   useEffect(() => {
//     const handleScroll = () => {
//       const y = window.scrollY;
//       if (y > lastScrollY && y > 100) setShowHeader(false);
//       else setShowHeader(true);
//       setLastScrollY(y);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // ---------------- SECTION COLOR SWITCH ----------------
//   useEffect(() => {
//     let lastY = window.scrollY;
//     let scrollingUp = false;

//     const onScroll = () => {
//       const currentY = window.scrollY;
//       scrollingUp = currentY < lastY;
//       lastY = currentY;
//     };

//     const sections = document.querySelectorAll(".image-section");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && scrollingUp) setIsDark(true);
//           else if (scrollingUp) setIsDark(false);
//         });
//       },
//       { threshold: 0.3 }
//     );

//     sections.forEach((sec) => observer.observe(sec));
//     window.addEventListener("scroll", onScroll);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       sections.forEach((sec) => observer.unobserve(sec));
//     };
//   }, []);

//   // ---------------- COLORS ----------------
//   const textColor = isDark ? "text-white " : "text-black ";
//   const hoverColor = isDark ? "hover:text-white/80" : "hover:text-black/80";
//   const underlineColor = isDark ? "after:bg-white" : "after:bg-black";

//   const navItems = [
//     { label: "Architecture", path: "/architecture/all" },
//     { label: "Interior", path: "/interior/all" },
//     { label: "Objects", path: "/objects/all" },
//     { label: "Exhibition", path: "/exhibition/all" },
//     { label: "About", path: "/about" },
//   ];

//   const handleLinkClick = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setMenuOpen(false);
//   };

//   // ---------------- HEADER BG ----------------
//   const desktopBg = showHeader ? scrolledClass(isDark) : "bg-transparent -translate-y-full";

//   function scrolledClass(dark: boolean) {
//     return `transition-all duration-500 ${dark ? "bg-transparent" : "backdrop-blur-md bg-white/90 shadow-sm"}`;
//   }

//   return (
//     <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}>
//       {/* ---------- DESKTOP ---------- */}
//       <div className={`hidden md:flex justify-between items-center h-16 px-8 transition-all duration-500 ${location.pathname === "/" ? "bg-transparent" : desktopBg}`}>
//         <h1 className={`text-2xl cursor-pointer ${textColor} ${hoverColor}`}>
//           <Link to="/" onClick={handleLinkClick}>
//             Portfolio
//           </Link>
//         </h1>

//         <nav className="flex space-x-8">
//           {navItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.path}
//               onClick={handleLinkClick}
//               className={`relative ${textColor} ${hoverColor}
//                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
//                 after:w-full ${underlineColor}
//                 hover:after:block after:hidden`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* ---------- MOBILE ---------- */}
//       <div className={`md:hidden flex justify-between items-center px-5 h-16 transition-transform duration-500 ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"} ${isDark ? "bg-transparent" : "bg-white/90"}`}>
//         <h1 className={`text-xl font-semibold ${textColor}`}>
//           <Link to="/" onClick={handleLinkClick}>
//             Portfolio
//           </Link>
//         </h1>

//         <button className={`${textColor}`} onClick={() => setMenuOpen(true)}>
//           <Menu size={26} />
//         </button>
//       </div>

//       {/* ---------- MOBILE FULLSCREEN MODAL ---------- */}
//       {menuOpen && (
//         <div className="fixed top-0 left-0 w-screen h-screen bg-white z-[999] flex flex-col justify-between transition-transform duration-500 ease-in-out animate-slideDown">
//           <button className="absolute top-6 right-6 text-black hover:opacity-70 transition" onClick={() => setMenuOpen(false)}>
//             <X size={36} />
//           </button>

//           <nav className="flex flex-col space-y-6 text-xl font-semibold text-black px-8 mt-20">
//             {navItems.map((item, idx) => (
//               <Link
//                 key={idx}
//                 to={item.path}
//                 onClick={handleLinkClick}
//                 className="relative hover:opacity-70
//                   after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
//                   after:w-full after:bg-black hover:after:block after:hidden"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           <div className="flex justify-between px-8 pb-8 text-sm font-medium">
//             <div>
//               <p className="font-semibold mb-1">STUDIO</p>
//               <p>264 Canal Street</p>
//               <p>#6W</p>
//               <p>New York, NY 10013</p>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold mb-1">CONTACT US</p>
//               <a href="mailto:studio@valledevalle.com" className="italic hover:underline text-black">
//                 studio@valledevalle.com↗
//               </a>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---------- ANIMATION STYLE ---------- */}
//       <style>{`
//         @keyframes slideDown {
//           0% { transform: translateY(-100%); opacity: 0; }
//           100% { transform: translateY(0); opacity: 1; }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.5s ease-in-out forwards;
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUp } from "lucide-react";

interface HeaderProps {
  visible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ visible = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const location = useLocation();

  // ---------------- ROUTE BASED COLOR ----------------
  useEffect(() => {
    const lightRoutes = ["/architecture", "/architecture/all", "/interior", "/interior/all", "/objects", "/objects/all", "/exhibition", "/exhibition/all", "/about", "/press", "/project"];

    const isProjectDetail = location.pathname.includes("/project/");
    if (isProjectDetail) {
      setIsDark(false);
      return;
    }

    const isLight = lightRoutes.some((r) => location.pathname.startsWith(r));
    setIsDark(!isLight);
  }, [location]);

  // ---------------- BODY SCROLL LOCK FOR MOBILE MENU ----------------
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // ---------------- SHOW BACK TO TOP BUTTON ----------------
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isDark ? "text-white" : "text-black";
  const hoverColor = isDark ? "hover:text-white/80" : "hover:text-black/80";
  const underlineColor = isDark ? "after:bg-white" : "after:bg-black";

  const navItems = [
    { label: "Architecture", path: "/architecture/all" },
    { label: "Interior", path: "/interior/all" },
    { label: "Objects", path: "/objects/all" },
    { label: "Exhibition", path: "/exhibition/all" },
    { label: "About", path: "/about" },
  ];

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ---------------- HEADER NON-STICKY ---------------- */}
      <header className={`${location.pathname === "/" ? "absolute" : "relative"} top-0 left-0 w-full z-40 transition-all duration-300`}>
        {/* ---------- DESKTOP ---------- */}
        <div
          className={`hidden md:flex justify-between items-center h-16 px-8
          ${location.pathname === "/" ? "bg-transparent" : isDark ? "bg-transparent" : "bg-white/90 backdrop-blur-md"}`}
        >
          <h1 className={`text-2xl cursor-pointer ${textColor} ${hoverColor}`}>
            <Link to="/" onClick={handleLinkClick}>
              Portfolio
            </Link>
          </h1>

          <nav className="flex space-x-8">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={handleLinkClick}
                className={`relative ${textColor} ${hoverColor}
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-full ${underlineColor}
                  hover:after:block after:hidden`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ---------- MOBILE ---------- */}
        <div
          className={`md:hidden flex justify-between items-center px-5 h-16
          ${isDark ? "bg-transparent" : "bg-white/90 backdrop-blur-md"}`}
        >
          <h1 className={`text-xl font-semibold ${textColor}`}>
            <Link to="/" onClick={handleLinkClick}>
              Portfolio
            </Link>
          </h1>

          <button className={`${textColor}`} onClick={() => setMenuOpen(true)}>
            <Menu size={26} />
          </button>
        </div>

        {/* ---------- MOBILE FULLSCREEN MODAL ---------- */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-white z-[999] flex flex-col justify-between animate-slideDown">
            <button className="absolute top-6 right-6 text-black hover:opacity-70" onClick={() => setMenuOpen(false)}>
              <X size={36} />
            </button>

            <nav className="flex flex-col space-y-6 text-xl font-semibold text-black px-8 mt-20">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={handleLinkClick}
                  className="relative hover:opacity-70
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                    after:w-full after:bg-black hover:after:block after:hidden"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex justify-between px-8 pb-8 text-sm font-medium">
              <div>
                <p className="font-semibold mb-1">STUDIO</p>
                <p>264 Canal Street</p>
                <p>#6W</p>
                <p>New York, NY 10013</p>
              </div>
              <div className="text-right">
                <p className="font-semibold mb-1">CONTACT US</p>
                <a href="mailto:studio@valledevalle.com" className="italic hover:underline text-black">
                  studio@valledevalle.com↗
                </a>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes slideDown {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideDown {
            animation: slideDown 0.5s ease forwards;
          }
        `}</style>
      </header>

      {/* ---------------- BACK TO TOP BUTTON (SMALL, NO SHADOW) ---------------- */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-[9999] p-2.5 rounded-full
            bg-black text-white hover:bg-black/80 transition-all duration-300"
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </button>
      )}
    </>
  );
};

export default Header;
