import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f4f3f1] text-black py-10 px-6 md:px-16 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Column 1 : Brand & Address */}
        <div>
          <h2 className="font-semibold mb-3 uppercase">LİNEDORİ</h2>
          <p>101 Dr. D. N. Road,</p>
          <p>1st Floor, Ravi Building,</p>
          <p>Fort, Mumbai 400026</p>

          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="block mt-3 hover:underline">
            Google Maps
          </a>

          <p className="mt-3">COA Number</p>
        </div>

        {/* Column 2 : Contact */}
        <div>
          <h2 className="font-semibold mb-3 uppercase">Contact</h2>

          <a href="mailto:hello@finedori.xyz" className="block hover:underline">
            hello@finedori.xyz
          </a>

          <div className="mt-4 space-y-1">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              Instagram
            </a>
          </div>
        </div>

        {/* Column 3 : Quick Links */}
        <div>
          <h2 className="font-semibold mb-3 uppercase">Quick Links</h2>

          <div className="space-y-1">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm">© 2025 Linedart. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
