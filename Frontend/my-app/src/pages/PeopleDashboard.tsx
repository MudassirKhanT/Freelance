// import React, { useState, useEffect, useRef } from "react";
// import axios from "../services/api";
// import { Button } from "@/components/ui/button";
// import { FileText } from "lucide-react";

// const PeopleDashboard = () => {
//   const [team, setTeam] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     description: "",
//     image: null,
//   });
//   const [preview, setPreview] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const fileInputRef = useRef(null);

//   // ✅ Fetch all team members
//   const fetchTeam = async () => {
//     try {
//       const res = await axios.get("/team");
//       setTeam(res.data);
//     } catch (err) {
//       console.error("Error fetching team:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   // ✅ Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       const file = files[0];
//       setFormData({ ...formData, image: file });
//       setPreview(URL.createObjectURL(file));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Add / Update member
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("role", formData.role);
//       data.append("description", formData.description);
//       if (formData.image) data.append("image", formData.image);

//       if (editId) {
//         await axios.put(`/team/${editId}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await axios.post("/team", data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       // Reset form after success
//       setFormData({ name: "", role: "", description: "", image: null });
//       setPreview(null);
//       setEditId(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       fetchTeam();
//     } catch (err) {
//       console.error("Error submitting form:", err);
//     }
//   };

//   // ✅ Edit member
//   const handleEdit = (member) => {
//     setFormData({
//       name: member.name,
//       role: member.role,
//       description: member.description,
//       image: null, // user can choose a new one
//     });
//     setPreview(member.image ? `http://localhost:5000${member.image}` : null);
//     setEditId(member._id);
//   };

//   // ✅ Delete member
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this member?")) return;
//     try {
//       await axios.delete(`/team/${id}`);
//       fetchTeam();
//     } catch (err) {
//       console.error("Error deleting member:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Team Members</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 p-4 rounded-md shadow-sm">
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" required />
//         <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="border p-2 w-full rounded" required />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded" />
//         <input type="file" name="image" accept="image/*" onChange={handleChange} ref={fileInputRef} className="border p-2 w-full rounded bg-white" />

//         {/* Preview */}
//         {preview && (
//           <div className="mt-2">
//             <img src={preview} alt="Preview" className="h-40 w-40 object-cover rounded border" />
//           </div>
//         )}

//         <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition">
//           {editId ? "Update Member" : "Add Member"}
//         </button>
//       </form>

//       {/* Team Section */}
//       <div className="bg-white shadow-md rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-6">People</h2>

//         {/* Grid Layout (like Projects) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {team.map((member) => (
//             <div key={member._id} className="border rounded-xl shadow-sm bg-gray-50 hover:shadow-lg transition-all duration-300">
//               {/* Image on top */}
//               {member.image && <img src={`http://localhost:5000${member.image}`} alt={member.name} className="rounded-t-xl w-full h-52 object-cover" />}

//               {/* Details */}
//               <div className="p-4">
//                 <h3 className="font-bold text-lg mb-1">{member.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{member.role}</p>

//                 {/* Optional PDF link */}
//                 {member.pdfFile && (
//                   <a href={`http://localhost:5000/${member.pdfFile}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center gap-2 bg-black text-white font-medium px-6 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition-all w-full">
//                     <FileText className="w-5 h-5" />
//                     <span>View PDF</span>
//                   </a>
//                 )}

//                 {/* Action Buttons (same colors as Projects) */}
//                 <div className="flex gap-2 mt-4">
//                   <Button variant="outline" className="flex-1" onClick={() => handleEdit(member)}>
//                     Edit
//                   </Button>
//                   <Button variant="destructive" className="flex-1" onClick={() => handleDelete(member._id)}>
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PeopleDashboard;

import React, { useState, useEffect, useRef } from "react";
import axios from "../services/api";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Trash2 } from "lucide-react";

const PeopleDashboard = () => {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ Fetch team members
  const fetchTeam = async () => {
    try {
      const res = await axios.get("/team");
      setTeam(res.data);
    } catch (err) {
      console.error("Error fetching team:", err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      if (editId) {
        await axios.put(`/team/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/team", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ name: "", role: "", description: "", image: null });
      setPreview(null);
      setEditId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchTeam();
    } catch (err) {
      console.error("Error saving member:", err);
    }
  };

  // ✅ Edit
  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      image: null,
    });
    setPreview(member.image ? `http://localhost:5000${member.image}` : null);
    setEditId(member._id);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`/team/${id}`);
      fetchTeam();
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Team Management</h2>

      {/* ✅ Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm mb-12">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" required />
        <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="border p-2 w-full rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded" />
        <div className="w-full">
          <div onClick={() => fileInputRef.current?.click()} className="border rounded-lg px-4 py-3 bg-white text-gray-500 cursor-pointer hover:border-gray-400 transition">
            {formData.image ? formData.image.name : "Choose an image (PNG, JPG, JPEG)"}
          </div>

          <input type="file" name="image" accept="image/*" onChange={handleChange} ref={fileInputRef} className="hidden" />
        </div>

        {/* ✅ Preview Image */}
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="Preview" className="h-48 w-48 object-contain rounded-lg border shadow-sm bg-white" />
          </div>
        )}

        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
          {editId ? "Update Member" : "Add Member"}
        </button>
      </form>

      {/* ✅ Team Grid Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">People</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member._id} className="border rounded-xl shadow-sm bg-gray-50 hover:shadow-lg transition-all duration-300">
              {/* Image */}
              {member.image && <img src={`http://localhost:5000${member.image}`} alt={member.name} className="rounded-t-xl w-full object-cover bg-white p-2 max-h-64" />}

              {/* Details */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{member.role}</p>

                {member.pdfFile && (
                  <a href={`http://localhost:5000/${member.pdfFile}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center gap-2 bg-black text-white font-medium px-6 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition-all w-full">
                    <FileText className="w-5 h-5" />
                    <span>View PDF</span>
                  </a>
                )}

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" onClick={() => handleEdit(member)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>

                  <Button variant="destructive" className="flex-1" onClick={() => handleDelete(member._id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleDashboard;
