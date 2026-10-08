import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ManageSermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    pastor: '',
    date: '',
    thumbnail: '',
    embed_url: '',
    is_video: true,
    is_audio: false,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);

  const loadSermons = async () => {
    setLoading(true);
    const { data } = await supabase.from('sermons').select('*').order('date', { ascending: false });
    if (data) setSermons(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSermons();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      pastor: '',
      date: '',
      thumbnail: '',
      embed_url: '',
      is_video: true,
      is_audio: false,
    });
    setEditingId(null);
    setThumbnailFile(null);
    setMediaFile(null);
  };

  const uploadFile = async (file, bucket) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleEdit = (sermon) => {
    setEditingId(sermon.id);
    setFormData({
      title: sermon.title || '',
      pastor: sermon.pastor || '',
      date: sermon.date || '',
      thumbnail: sermon.thumbnail || '',
      embed_url: sermon.embed_url || '',
      is_video: Boolean(sermon.is_video),
      is_audio: Boolean(sermon.is_audio),
    });
    setThumbnailFile(null);
    setMediaFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalEmbedUrl = formData.embed_url;
      let finalThumbnail = formData.thumbnail;

      if (mediaFile) {
        finalEmbedUrl = await uploadFile(mediaFile, 'sermons');
      }

      if (thumbnailFile) {
        finalThumbnail = await uploadFile(thumbnailFile, 'sermons');
      }

      if (!finalThumbnail && finalEmbedUrl) {
        finalThumbnail = finalEmbedUrl;
      }

      const payload = {
        ...formData,
        embed_url: finalEmbedUrl,
        thumbnail: finalThumbnail,
      };

      if (editingId) {
        const { error } = await supabase
          .from('sermons')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('sermons').insert([payload]);
        if (error) throw error;
      }

      resetForm();
      loadSermons();
    } catch (err) {
      alert(`Error saving sermon: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;
    await supabase.from('sermons').delete().eq('id', id);
    if (editingId === id) resetForm();
    loadSermons();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage Sermons</h1>

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-amber-600">
            {editingId ? 'Edit Sermon' : 'Add New Sermon'}
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
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Speaker / Pastor Name</label>
            <input
              value={formData.pastor}
              onChange={(e) => setFormData({ ...formData, pastor: e.target.value })}
              placeholder="e.g. Pastor John Doe"
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
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Media File / Video Link</label>
            <input
              type="file"
              accept="video/*,audio/*"
              onChange={(e) => setMediaFile(e.target.files[0])}
              className="w-full border p-1 rounded text-sm mb-2"
            />
            <input
              placeholder="...or paste YouTube/Vimeo/Audio URL"
              value={formData.embed_url}
              onChange={(e) => setFormData({ ...formData, embed_url: e.target.value })}
              className="w-full border p-2.5 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Thumbnail (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="w-full border p-1 rounded text-sm mb-2"
            />
            <input
              placeholder="...or paste Thumbnail Image URL"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full border p-2.5 rounded"
            />
          </div>
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={formData.is_video}
              onChange={(e) => setFormData({ ...formData, is_video: e.target.checked })}
            />
            Video
          </label>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={formData.is_audio}
              onChange={(e) => setFormData({ ...formData, is_audio: e.target.checked })}
            />
            Audio
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 text-green-950 font-semibold px-6 py-2.5 rounded hover:bg-amber-400 disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update Sermon' : 'Add Sermon'}
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
              <th className="p-4">Speaker</th>
              <th className="p-4">Date</th>
              <th className="p-4">Type</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sermons.map((sermon) => (
              <tr key={sermon.id} className="border-b hover:bg-stone-50">
                <td className="p-4 font-medium text-stone-900">{sermon.title}</td>
                <td className="p-4">{sermon.pastor || '—'}</td>
                <td className="p-4">{sermon.date}</td>
                <td className="p-4">{sermon.is_video ? 'Video' : sermon.is_audio ? 'Audio' : 'Image'}</td>
                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => handleEdit(sermon)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sermon.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!loading && sermons.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-stone-500">
                  No sermons created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}