import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image_url: '',
    category: 'general',
  });

  const loadEvents = async () => {
    setLoading(true);
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (data) setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image_url: '',
      category: 'general',
    });
    setEditingId(null);
    setImageFile(null);
  };

  const handleEdit = (evt) => {
    setEditingId(evt.id);
    setFormData({
      title: evt.title || '',
      date: evt.date || '',
      time: evt.time || '',
      location: evt.location || '',
      description: evt.description || '',
      image_url: evt.image_url || '',
      category: evt.category || 'general',
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = formData.image_url;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('events')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('events').getPublicUrl(fileName);
        finalImageUrl = data.publicUrl;
      }

      const payload = {
        ...formData,
        image_url: finalImageUrl,
      };

      if (editingId) {
        const { error } = await supabase
          .from('events')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('events').insert([payload]);
        if (error) throw error;
      }

      resetForm();
      loadEvents();
    } catch (err) {
      alert(`Error saving event: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    if (editingId === id) resetForm();
    loadEvents();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage Events</h1>

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-amber-600">
            {editingId ? 'Edit Event' : 'Add New Event'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-stone-500 hover:text-stone-800 underline"
            >
              Cancel Editing
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Title</label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border p-2.5 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border p-2.5 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Time</label>
            <input
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="e.g. 10:00 AM"
              className="w-full border p-2.5 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Location</label>
            <input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Main Sanctuary"
              className="w-full border p-2.5 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border p-2.5 rounded"
            >
              <option value="general">General</option>
              <option value="youth">Youth</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border p-1 rounded text-sm mb-2"
            />
            <input
              placeholder="...or paste Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full border p-2.5 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border p-2.5 rounded"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 text-green-950 font-semibold px-6 py-2.5 rounded hover:bg-amber-400 disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update Event' : 'Add Event'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-stone-200 text-stone-800 font-semibold px-6 py-2.5 rounded hover:bg-stone-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm text-stone-700">
          <thead className="bg-stone-100 uppercase text-xs text-stone-500 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr key={evt.id} className="border-b hover:bg-stone-50">
                <td className="p-4 font-medium text-stone-900">{evt.title}</td>
                <td className="p-4">{evt.date} {evt.time ? `(${evt.time})` : ''}</td>
                <td className="p-4 capitalize">{evt.category}</td>
                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => handleEdit(evt)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!loading && events.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-stone-500">
                  No events created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}