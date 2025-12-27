import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  visible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ visible = true }) => {
  const navigate = useNavigate();

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
              LİNEDORİ
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
              LİNEDORİ
            </Link>
          </h1>

          <button className={`${textColor} cursor-pointer`} onClick={() => setMenuOpen(true)}>
            <Menu size={26} />
          </button>
        </div>

        {/* ---------- MOBILE FULLSCREEN MODAL ---------- */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-white z-[999] flex flex-col justify-between animate-slideDown">
            <button className="absolute top-6 right-6 text-black hover:opacity-70" onClick={() => setMenuOpen(false)}>
              <X size={36} />
            </button>
            <button className="absolute top-8 left-8 text-xl cursor-pointer text-black font-semibold hover:opacity-70" onClick={() => navigate("/")}>
              LİNEDORİ
            </button>

            <nav className="flex flex-col space-y-6 text-lg font-bold text-black px-8 mt-20">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={handleLinkClick}
                  className="relative hover:opacity-70
           after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
           after:w-full after:bg-black after:hidden"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
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
            bg-black text-white hover:bg-black/80 transition-all duration-300 cursor-pointer"
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </button>
      )}
    </>
  );
};

export default Header;
