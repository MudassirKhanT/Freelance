import { useEffect, useState } from "react";
import API from "../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit } from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  description: string;
  location: string;
  contact: string;
  email: string;
  image?: string;
}

const StudioDashboard = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [form, setForm] = useState<Partial<Studio>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ Fetch studios
  const fetchStudios = async () => {
    try {
      const res = await API.get("/studio");
      setStudios(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  // ✅ Image handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit studio
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingId) {
        await API.put(`/studio/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/studio", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("✅ Studio saved successfully!");
      resetForm();
      fetchStudios();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save studio");
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setForm({});
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
    (document.getElementById("imageInput") as HTMLInputElement).value = "";
  };

  // ✅ Edit studio
  const handleEdit = (studio: Studio) => {
    setForm({
      title: studio.title,
      description: studio.description,
      location: studio.location,
      contact: studio.contact,
      email: studio.email,
    });
    setEditingId(studio._id);
    if (studio.image) setPreview(`http://localhost:5000${studio.image}`);
  };

  // ✅ Delete studio
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this studio?")) return;
    try {
      await API.delete(`/studio/${id}`);
      fetchStudios();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      {/* Form Section */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Studio" : "Create Studio"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="Location" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input placeholder="Contact" value={form.contact || ""} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <Input placeholder="Email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <Input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} />

          {preview && <img src={preview} alt="preview" className="rounded-lg shadow-md w-full h-48 object-cover mt-2" />}

          <Button type="submit" className="w-full">
            {editingId ? "Update Studio" : "Create Studio"}
          </Button>
        </form>
      </div>

      {/* Studios List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Studios</h2>

        {studios.length === 0 ? (
          <p className="text-gray-500">No studio entries yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <div key={studio._id} className="border rounded-xl p-4 shadow-sm bg-gray-50">
                <h3 className="font-bold text-lg">{studio.title}</h3>
                <p className="text-sm text-gray-600">{studio.location}</p>
                <p className="mt-2 text-gray-700 line-clamp-3">{studio.description}</p>
                {studio.image && <img src={`http://localhost:5000${studio.image}`} alt={studio.title} className="mt-2 rounded-lg h-32 w-full object-cover" />}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" onClick={() => handleEdit(studio)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" className="flex-1" onClick={() => handleDelete(studio._id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioDashboard;
