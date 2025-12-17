// import { useState } from "react";
// import axios from "axios";
// import { Mail } from "lucide-react";
// interface Props {
//   projectTitle: string;
// }

// const ObjectsContact: React.FC<Props> = ({ projectTitle }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const data = Object.fromEntries(formData.entries());

//     try {
//       setLoading(true);
//       setErrorMsg("");
//       const response = await axios.post("http://localhost:5000/api/contact", {
//         ...data,
//         project: projectTitle,
//       });

//       if (response.status === 200) {
//         setSuccess(true);
//         e.currentTarget.reset();
//         setTimeout(() => {
//           setModalOpen(false);
//           setSuccess(false);
//         }, 2500);
//       } else {
//         setErrorMsg("Failed to send message. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setErrorMsg("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Trigger button */}
//       <button onClick={() => setModalOpen(true)} className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 mt-4">
//         <Mail className="w-5 h-5" />
//         Get in Touch
//       </button>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fadeIn">
//             <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold" onClick={() => setModalOpen(false)}>
//               ×
//             </button>

//             {!success ? (
//               <>
//                 <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Get in Touch</h2>
//                 <p className="text-center text-gray-600 mb-6">
//                   Interested in <span className="font-semibold">{projectTitle}</span>? Fill out the form below and we will contact you soon!
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <input type="text" name="name" placeholder="Your Name" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
//                   <input type="email" name="email" placeholder="Your Email" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
//                   <input type="text" name="subject" placeholder="Subject" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
//                   <textarea name="message" placeholder="Message" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" rows={4}></textarea>

//                   <button type="submit" disabled={loading} className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition flex justify-center items-center gap-2">
//                     {loading ? "Sending..." : "Send Message"}
//                   </button>

//                   {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}
//                 </form>
//               </>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <svg className="w-16 h-16 text-green-500 mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                 </svg>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
//                 <p className="text-gray-600 text-center">Your message has been sent successfully. We will get back to you soon!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ObjectsContact;

import { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";

interface Props {
  projectTitle: string;
}

const ObjectsContact: React.FC<Props> = ({ projectTitle }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      setErrorMsg("");
      const response = await axios.post("http://localhost:5000/api/contact", {
        ...data,
        project: projectTitle,
      });

      if (response.status === 200) {
        setSuccess(true);
        e.currentTarget.reset();
        setTimeout(() => {
          setModalOpen(false);
          setSuccess(false);
        }, 2500);
      } else {
        setErrorMsg("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger link (replaces button) */}
      <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-gray-600 hover:text-black transition text-base underline-offset-4 ">
        <Mail className="w-4 h-4" />
        Get in Touch
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl relative animate-fadeIn">
            {/* Close button */}
            <button className="absolute top-3 right-4 text-gray-600 hover:text-black text-3xl leading-none transition" onClick={() => setModalOpen(false)}>
              &times;
            </button>

            {!success ? (
              <>
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-2xl font-semibold text-gray-900 text-center">Get in Touch</h2>
                  <p className="text-center text-gray-600 text-sm mt-2">
                    Interested in <span className="font-semibold">{projectTitle}</span>? Fill out the form below — we’ll reach out soon.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                  <input type="text" name="name" placeholder="Your Name" required className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700" />
                  <input type="email" name="email" placeholder="Your Email" required className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700" />
                  <input type="text" name="subject" placeholder="Subject" required className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700" />
                  <textarea name="message" placeholder="Message" rows={4} required className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700 resize-none"></textarea>

                  <button type="submit" disabled={loading} className="w-full bg-gray-800 text-white py-2 text-sm hover:bg-gray-900 transition">
                    {loading ? "Sending..." : "Send Message"}
                  </button>

                  {errorMsg && <p className="text-red-500 text-center text-sm mt-2">{errorMsg}</p>}
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="w-16 h-16 text-green-500 mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Success!</h3>
                <p className="text-gray-600 text-sm text-center">Your message has been sent successfully. We’ll get back to you soon!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ObjectsContact;
