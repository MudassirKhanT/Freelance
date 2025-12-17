// import { useEffect, useState } from "react";
// import { getPress, createPress, updatePress, deletePress } from "@/services/api";

// interface PressItem {
//   _id?: string;
//   title: string;
//   date: string;
//   image: string;
//   description: string;
//   link: string;
// }

// const PressDashboard = () => {
//   const [press, setPress] = useState<PressItem[]>([]);
//   const [form, setForm] = useState<PressItem>({
//     title: "",
//     date: "",
//     image: "",
//     description: "",
//     link: "",
//   });
//   const [editId, setEditId] = useState<string | null>(null);

//   // ✅ Fetch press articles
//   const fetchPress = async () => {
//     try {
//       const res = await getPress();
//       setPress(res.data);
//     } catch (err) {
//       console.error("Error fetching press:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPress();
//   }, []);

//   // ✅ Handle add/update
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await updatePress(editId, form as any);
//       } else {
//         await createPress(form as any);
//       }

//       // ✅ Clear form after submit
//       setForm({ title: "", date: "", image: "", description: "", link: "" });
//       setEditId(null);
//       fetchPress();
//     } catch (err) {
//       console.error("Error saving press:", err);
//     }
//   };

//   // ✅ Handle edit
//   const handleEdit = (item: PressItem) => {
//     setForm(item);
//     setEditId(item._id || null);
//   };

//   // ✅ Handle delete
//   const handleDelete = async (id?: string) => {
//     if (!id) return;
//     try {
//       await deletePress(id);
//       fetchPress();
//     } catch (err) {
//       console.error("Error deleting press:", err);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl">
//       <h2 className="text-2xl font-bold mb-6">Press Management</h2>

//       {/* Add/Edit Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <input type="text" placeholder="Title" className="w-full border p-2 rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
//         <input type="date" className="w-full border p-2 rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />

//         {/* ✅ Image URL Input */}
//         <input type="text" placeholder="Image URL" className="w-full border p-2 rounded" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />

//         {/* ✅ Image Preview (only when URL is present) */}
//         {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded-md border mb-3" />}

//         <textarea placeholder="Description" className="w-full border p-2 rounded" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//         <input type="text" placeholder="Press Link" className="w-full border p-2 rounded" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
//         <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
//           {editId ? "Update" : "Add"} Press
//         </button>
//       </form>

//       {/* Display Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {press.map((p) => (
//           <div key={p._id} className="border rounded-lg p-4 shadow-sm flex flex-col items-start">
//             {/* ✅ Image Display inside Card */}
//             {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded mb-3" />}

//             <h3 className="font-semibold text-lg">{p.title}</h3>
//             <p className="text-sm text-gray-600 mb-1">{p.date}</p>
//             <p className="text-sm text-gray-700 mb-2">{p.description}</p>

//             {p.link && (
//               <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-2">
//                 View Press
//               </a>
//             )}

//             <div className="flex justify-between w-full mt-2">
//               <button onClick={() => handleEdit(p)} className="text-blue-500 hover:underline">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PressDashboard;

// import { useEffect, useState } from "react";
// import { getPress, createPress, updatePress, deletePress } from "@/services/api";

// interface PressItem {
//   _id?: string;
//   title: string;
//   date: string;
//   image?: string;
//   description: string;
//   link: string;
// }

// const PressDashboard = () => {
//   const [press, setPress] = useState<PressItem[]>([]);
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     file: null as File | null,
//     description: "",
//     link: "",
//   });
//   const [preview, setPreview] = useState<string | null>(null);
//   const [editId, setEditId] = useState<string | null>(null);

//   // ✅ Fetch Press Articles
//   const fetchPress = async () => {
//     try {
//       const res = await getPress();
//       setPress(res.data);
//     } catch (err) {
//       console.error("Error fetching press:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPress();
//   }, []);

//   // ✅ Handle Text Change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // ✅ Handle File Input & Preview
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setForm({ ...form, file });

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     } else {
//       setPreview(null);
//     }
//   };

//   // ✅ Handle Add / Update
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("date", form.date);
//     formData.append("description", form.description);
//     formData.append("link", form.link);
//     if (form.file) formData.append("image", form.file);

//     try {
//       if (editId) {
//         await updatePress(editId, formData); // PUT request with FormData
//       } else {
//         await createPress(formData); // POST request with FormData
//       }

//       resetForm();
//       fetchPress();
//     } catch (err) {
//       console.error("Error saving press:", err);
//     }
//   };

//   // ✅ Reset Form
//   const resetForm = () => {
//     setForm({ title: "", date: "", file: null, description: "", link: "" });
//     setPreview(null);
//     setEditId(null);
//   };

//   // ✅ Handle Edit
//   const handleEdit = (item: PressItem) => {
//     setForm({
//       title: item.title,
//       date: item.date,
//       file: null,
//       description: item.description,
//       link: item.link,
//     });
//     setPreview(item.image || null);
//     setEditId(item._id || null);
//   };

//   // ✅ Handle Delete
//   const handleDelete = async (id?: string) => {
//     if (!id) return;
//     try {
//       await deletePress(id);
//       fetchPress();
//     } catch (err) {
//       console.error("Error deleting press:", err);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl">
//       <h2 className="text-2xl font-bold mb-6">Press Management</h2>

//       {/* ✅ Add/Edit Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <input type="text" name="title" placeholder="Title" className="w-full border p-2 rounded" value={form.title} onChange={handleChange} required />
//         <input type="date" name="date" className="w-full border p-2 rounded" value={form.date} onChange={handleChange} required />

//         {/* ✅ File Upload Input */}
//         <input type="file" accept="image/*" className="w-full border p-2 rounded" onChange={handleFileChange} />

//         {/* ✅ Preview */}
//         {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md border mb-3" />}

//         <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" value={form.description} onChange={handleChange} />
//         <input type="text" name="link" placeholder="Press Link" className="w-full border p-2 rounded" value={form.link} onChange={handleChange} />
//         <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
//           {editId ? "Update Press" : "Add Press"}
//         </button>
//       </form>

//       {/* ✅ Press Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {press.map((p) => (
//           <div key={p._id} className="border rounded-lg p-4 shadow-sm flex flex-col items-start">
//             {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded mb-3" />}
//             <h3 className="font-semibold text-lg">{p.title}</h3>
//             <p className="text-sm text-gray-600 mb-1">{p.date}</p>
//             <p className="text-sm text-gray-700 mb-2">{p.description}</p>

//             {p.link && (
//               <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-2">
//                 View Press
//               </a>
//             )}

//             <div className="flex justify-between w-full mt-2">
//               <button onClick={() => handleEdit(p)} className="text-blue-500 hover:underline">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PressDashboard;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "../services/api";
// import { Button } from "@/components/ui/button";
// import { FileText } from "lucide-react";
// interface PressItem {
//   _id?: string;
//   title: string;
//   date: string;
//   image: string;
//   description: string;
//   link: string;
// }

// const PressDashboard = () => {
//   const [press, setPress] = useState<PressItem[]>([]);
//   const [form, setForm] = useState<any>({
//     title: "",
//     date: "",
//     image: null,
//     description: "",
//     link: "",
//   });
//   const [editId, setEditId] = useState<string | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // ✅ Fetch press articles
//   const fetchPress = async () => {
//     try {
//       const res = await axios.get("/press");
//       setPress(res.data);
//     } catch (err) {
//       console.error("Error fetching press:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPress();
//   }, []);

//   // ✅ Handle form field changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, files } = e.target as HTMLInputElement;
//     if (name === "image" && files && files[0]) {
//       const file = files[0];
//       setForm({ ...form, image: file });
//       setPreview(URL.createObjectURL(file));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // ✅ Add / Update Press
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("title", form.title);
//       data.append("date", form.date);
//       data.append("description", form.description);
//       data.append("link", form.link);
//       if (form.image) data.append("image", form.image);

//       if (editId) {
//         await axios.put(`/press/${editId}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await axios.post("/press", data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // ✅ Reset form
//       setForm({ title: "", date: "", image: null, description: "", link: "" });
//       setEditId(null);
//       setPreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       fetchPress();
//     } catch (err) {
//       console.error("Error saving press:", err);
//     }
//   };

//   // ✅ Edit Press Item
//   const handleEdit = (item: PressItem) => {
//     setForm({
//       title: item.title,
//       date: item.date,
//       image: item.image,
//       description: item.description,
//       link: item.link,
//     });
//     setEditId(item._id || null);
//     setPreview(`http://localhost:5000${item.image}`);
//   };

//   // ✅ Delete Press Item
//   const handleDelete = async (id?: string) => {
//     if (!id) return;
//     try {
//       await axios.delete(`/press/${id}`);
//       fetchPress();
//     } catch (err) {
//       console.error("Error deleting press:", err);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl">
//       <h2 className="text-2xl font-bold mb-6">Press Management</h2>

//       {/* ✅ Add / Edit Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <input type="text" name="title" placeholder="Title" className="w-full border p-2 rounded" value={form.title} onChange={handleChange} required />
//         <input type="date" name="date" className="w-full border p-2 rounded" value={form.date} onChange={handleChange} required />
//         <input type="file" name="image" accept="image/*" className="w-full border p-2 rounded bg-white" onChange={handleChange} ref={fileInputRef} />

//         {/* ✅ Preview Image */}
//         {preview && (
//           <div className="mt-2">
//             <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded border" />
//           </div>
//         )}

//         <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" value={form.description} onChange={handleChange} />
//         <input type="text" name="link" placeholder="Press Link" className="w-full border p-2 rounded" value={form.link} onChange={handleChange} />

//         <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
//           {editId ? "Update Press" : "Add Press"}
//         </button>
//       </form>

//       {/* ✅ Display Press Cards
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {press.map((p) => (
//           <div key={p._id} className="border rounded-lg p-4 shadow-sm flex flex-col items-start">
//             {p.image && <img src={`http://localhost:5000${p.image}`} alt={p.title} className="w-full h-48 object-cover rounded mb-3" />}
//             <h3 className="font-semibold text-lg">{p.title}</h3>
//             <p className="text-sm text-gray-600 mb-1">{p.date}</p>
//             <p className="text-sm text-gray-700 mb-2">{p.description}</p>
//             {p.link && (
//               <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-2">
//                 View Press
//               </a>
//             )}
//             <div className="flex justify-between w-full mt-2">
//               <button onClick={() => handleEdit(p)} className="text-blue-500 hover:underline">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div> */}
//       {/* Press Section */}
//       <div className="bg-white shadow-md rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-6">Press</h2>

//         {(() => {
//           const [currentPage, setCurrentPage] = useState(1);
//           const pressPerPage = 9;

//           const indexOfLast = currentPage * pressPerPage;
//           const indexOfFirst = indexOfLast - pressPerPage;
//           const currentPress = press.slice(indexOfFirst, indexOfLast);
//           const totalPages = Math.ceil(press.length / pressPerPage);

//           const handlePageChange = (page: number) => setCurrentPage(page);

//           return (
//             <>
//               {/* Grid Layout (same as Projects) */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentPress.map((p) => (
//                   <div key={p._id} className="border rounded-xl shadow-sm bg-gray-50 hover:shadow-lg transition-all duration-300">
//                     {/* Image */}
//                     {p.image && <img src={`http://localhost:5000${p.image}`} alt={p.title} className="rounded-t-xl w-full h-52 object-cover" />}

//                     {/* Details */}
//                     <div className="p-4">
//                       <h3 className="font-bold text-lg mb-1">{p.title}</h3>
//                       <p className="text-sm text-gray-600 mb-2">{p.date}</p>

//                       {p.link && (
//                         <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 bg-black text-white font-medium px-6 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition-all w-full">
//                           <FileText className="w-5 h-5" />
//                           <span>View Press</span>
//                         </a>
//                       )}

//                       {/* Buttons */}
//                       <div className="flex gap-2 mt-4">
//                         <Button variant="outline" className="flex-1" onClick={() => handleEdit(p)}>
//                           Edit
//                         </Button>
//                         <Button variant="destructive" className="flex-1" onClick={() => handleDelete(p._id)}>
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination (same as Projects) */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
//                   <Button variant="outline" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
//                     Prev
//                   </Button>

//                   {[...Array(totalPages)].map((_, i) => (
//                     <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 rounded-lg border transition-all duration-200 ${currentPage === i + 1 ? "bg-black text-white border-black" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"}`}>
//                       {i + 1}
//                     </button>
//                   ))}

//                   <Button variant="outline" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
//                     Next
//                   </Button>
//                 </div>
//               )}
//             </>
//           );
//         })()}
//       </div>
//     </div>
//   );
// };

// export default PressDashboard;

import React, { useEffect, useState, useRef } from "react";
import axios from "../services/api";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Trash2 } from "lucide-react";

interface PressItem {
  _id?: string;
  title: string;
  date: string;
  image: string;
  description: string;
  link: string;
}

const PressDashboard = () => {
  const [press, setPress] = useState<PressItem[]>([]);
  const [form, setForm] = useState<any>({
    title: "",
    date: "",
    image: null,
    description: "",
    link: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pressPerPage = 9;
  const indexOfLast = currentPage * pressPerPage;
  const indexOfFirst = indexOfLast - pressPerPage;
  const currentPress = press.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(press.length / pressPerPage);

  // Fetch Press
  const fetchPress = async () => {
    try {
      const res = await axios.get("/press");
      setPress(res.data);
    } catch (err) {
      console.error("Error fetching press:", err);
    }
  };

  useEffect(() => {
    fetchPress();
  }, []);

  // Handle Form Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("date", form.date);
      data.append("description", form.description);
      data.append("link", form.link);
      if (form.image) data.append("image", form.image);

      if (editId) {
        await axios.put(`/press/${editId}`, data, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axios.post("/press", data, { headers: { "Content-Type": "multipart/form-data" } });
      }

      // Reset
      setForm({ title: "", date: "", image: null, description: "", link: "" });
      setEditId(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchPress();
    } catch (err) {
      console.error("Error saving press:", err);
    }
  };

  // Edit
  const handleEdit = (item: PressItem) => {
    setForm({
      title: item.title,
      date: item.date,
      image: item.image,
      description: item.description,
      link: item.link,
    });
    setEditId(item._id || null);
    setPreview(`http://localhost:5000${item.image}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to form for editing
  };

  // Delete
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(`/press/${id}`);
      fetchPress();
    } catch (err) {
      console.error("Error deleting press:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* ✅ Form Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">{editId ? "Edit Press" : "Add New Press"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Title" className="w-full border p-2 rounded" value={form.title} onChange={handleChange} required />
          <input type="date" name="date" className="w-full border p-2 rounded" value={form.date} onChange={handleChange} required />
          <div className="w-full">
            {/* CLICKABLE PLACEHOLDER BOX */}
            <div onClick={() => fileInputRef.current?.click()} className="w-full border rounded-lg px-4 py-3 bg-white text-gray-500 cursor-pointer hover:border-gray-400 transition">
              {FormData.image ? FormData.image.name : "Choose an image (PNG, JPG, JPEG)"}
            </div>

            {/* HIDDEN REAL FILE INPUT */}
            <input type="file" name="image" accept="image/*" onChange={handleChange} ref={fileInputRef} className="hidden" />
          </div>

          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded border" />
            </div>
          )}

          <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" value={form.description} onChange={handleChange} />
          <input type="text" name="link" placeholder="Press Link" className="w-full border p-2 rounded" value={form.link} onChange={handleChange} />

          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            {editId ? "Update Press" : "Add Press"}
          </button>
        </form>
      </div>

      {/* ✅ Press Cards Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Press</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPress.map((p) => (
            <div key={p._id} className="border rounded-xl shadow-sm bg-gray-50 hover:shadow-lg transition-all duration-300">
              {p.image && <img src={`http://localhost:5000${p.image}`} alt={p.title} className="rounded-t-xl w-full h-52 object-cover" />}

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{p.date}</p>

                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 bg-black text-white font-medium px-6 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition-all w-full">
                    <FileText className="w-5 h-5" />
                    <span>View Press</span>
                  </a>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" onClick={() => handleEdit(p)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" className="flex-1" onClick={() => handleDelete(p._id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
            <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Prev
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-lg border transition-all duration-200 ${currentPage === i + 1 ? "bg-black text-white border-black" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"}`}>
                {i + 1}
              </button>
            ))}

            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PressDashboard;
