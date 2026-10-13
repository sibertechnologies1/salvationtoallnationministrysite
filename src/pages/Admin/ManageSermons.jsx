import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ManageSermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [targetSermonId, setTargetSermonId] = useState(null);

  const [heroData, setHeroData] = useState({
    eyebrow: 'Messages',
    title: 'All Sermons',
    description: 'Browse our full library of messages, videos, and audio teachings.',
    hero_bg_image_url: '',
  });

  const [heroImageFile, setHeroImageFile] = useState(null);
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

  const loadData = async () => {
    setLoading(true);
    const { data: sermonsData } = await supabase.from('sermons').select('*').order('date', { ascending: false });
    
    if (sermonsData && sermonsData.length > 0) {
      setSermons(sermonsData);
      // Use the first sermon row to hold the page hero settings
      const firstSermon = sermonsData[0];
      setTargetSermonId(firstSermon.id);
      setHeroData({
        eyebrow: firstSermon.hero_eyebrow || 'Messages',
        title: firstSermon.hero_title || 'All Sermons',
        description: firstSermon.hero_description || '',
        hero_bg_image_url: firstSermon.hero_bg_image_url || '',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

const handleHeroSubmit = async (e) => {
    e.preventDefault();
    if (!targetSermonId) {
      alert('Please create at least one real sermon record first to hold the page hero settings.');
      return;
    }
    setSavingHero(true);

    try {
      let finalHeroBg = heroData.hero_bg_image_url;

      if (heroImageFile) {
        const fileExt = heroImageFile.name.split('.').pop();
        const fileName = `hero_sermons_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('sermons')
          .upload(fileName, heroImageFile, { 
            upsert: true,
            contentType: heroImageFile.type || 'image/jpeg'
          });

        if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);

        const { data } = supabase.storage.from('sermons').getPublicUrl(fileName);
        finalHeroBg = data.publicUrl;
      }

      // Update hero columns directly on the existing target sermon record
      const { error } = await supabase
        .from('sermons')
        .update({
          hero_eyebrow: heroData.eyebrow,
          hero_title: heroData.title,
          hero_description: heroData.description,
          hero_bg_image_url: finalHeroBg || '',
        })
        .eq('id', targetSermonId);

      if (error) throw new Error(`Database update failed: ${error.message}`);

      alert('Sermons Page Hero updated successfully!');
      setHeroImageFile(null);
      loadData();
    } catch (err) {
      alert(`Error updating hero: ${err.message}`);
    } finally {
      setSavingHero(false);
    }
  };

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
      .upload(fileName, file, { upsert: true });

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
      loadData();
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
    loadData();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage Sermons Page</h1>

      {/* Hero Section Form */}
      <form onSubmit={handleHeroSubmit} className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
        <h2 className="text-lg font-semibold text-amber-600">Sermons Hero Section</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Eyebrow Text</label>
            <input
              value={heroData.eyebrow}
              onChange={(e) => setHeroData({ ...heroData, eyebrow: e.target.value })}
              className="w-full border p-2.5 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Headline</label>
            <input
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              className="w-full border p-2.5 rounded text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={heroData.description}
              onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
              className="w-full border p-2.5 rounded text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Hero Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setHeroImageFile(e.target.files[0])}
              className="w-full border p-1 rounded text-sm mb-2"
            />
            <input
              placeholder="...or paste Background Image URL"
              value={heroData.hero_bg_image_url}
              onChange={(e) => setHeroData({ ...heroData, hero_bg_image_url: e.target.value })}
              className="w-full border p-2.5 rounded text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={savingHero}
          className="bg-amber-500 text-green-950 font-semibold px-6 py-2 rounded hover:bg-amber-400 disabled:opacity-50 text-sm"
        >
          {savingHero ? 'Saving Hero...' : 'Save Hero Changes'}
        </button>
      </form>

      {/* Sermon Form */}
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