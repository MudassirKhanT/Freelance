import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/layout/Header";

interface Press {
  _id: string;
  title: string;
  date: string;
  description: string;
  link?: string;
  image?: string;
}

const PressPage = () => {
  const [press, setPress] = useState<Press[]>([]);

  useEffect(() => {
    const fetchPress = async () => {
      const res = await axios.get("http://localhost:5000/api/press");
      setPress(res.data);
    };
    fetchPress();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#ffffff]">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Main Content */}
      <div className="pt-24">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {press.map((p) => (
            <div key={p._id} className="flex flex-col w-full">
              {/* Image occupying screen height fraction */}
              <div className="h-[80vh] sm:h-[90vh] lg:h-screen">{p.image ? <img src={`http://localhost:5000${p.image}`} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100" />}</div>

              {/* Description Section */}
              <div className="flex flex-col items-center justify-center text-center py-8 px-4 bg-[#ffffff]">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{p.date}</p>
                <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed max-w-[90%]">{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-black-900 hover:underline">
                    View Press
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PressPage;
