import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useTheme } from './AdminLayout';

export default function ManageEvents() {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [targetEventId, setTargetEventId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [heroImageFile, setHeroImageFile] = useState(null);

  const [heroData, setHeroData] = useState({
    eyebrow: 'Join Us',
    title: 'Upcoming Events',
    description: 'Gather with us for worship, fellowship, and community, every event is a chance to belong.',
    hero_bg_image_url: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image_url: '',
    category: 'general',
  });

  const loadData = async () => {
    setLoading(true);
    const { data: eventsData } = await supabase.from('events').select('*').order('date', { ascending: true });
    
    if (eventsData && eventsData.length > 0) {
      setEvents(eventsData);
      const firstEvent = eventsData[0];
      setTargetEventId(firstEvent.id);
      setHeroData({
        eyebrow: firstEvent.hero_eyebrow || 'Join Us',
        title: firstEvent.hero_title || 'Upcoming Events',
        description: firstEvent.hero_description || '',
        hero_bg_image_url: firstEvent.hero_bg_image_url || '',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setSavingHero(true);

    try {
      let finalHeroBg = heroData.hero_bg_image_url;

      if (heroImageFile) {
        const fileExt = heroImageFile.name.split('.').pop();
        const fileName = `hero_events_${Date.now()}.${fileExt}`;

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

      let activeId = targetEventId;

      if (!activeId) {
        const { data: existingEvents } = await supabase.from('events').select('id').limit(1);
        if (existingEvents && existingEvents.length > 0) {
          activeId = existingEvents[0].id;
        }
      }

      if (!activeId) {
        const { data: newRow, error: insertError } = await supabase
          .from('events')
          .insert([{
            title: 'Community Gathering',
            date: new Date().toISOString().split('T')[0],
            category: 'general',
            hero_eyebrow: heroData.eyebrow,
            hero_title: heroData.title,
            hero_description: heroData.description,
            hero_bg_image_url: finalHeroBg || '',
          }])
          .select()
          .single();

        if (insertError) throw new Error(`Failed to create hero row: ${insertError.message}`);
        activeId = newRow.id;
        setTargetEventId(activeId);
      } else {
        const { error } = await supabase
          .from('events')
          .update({
            hero_eyebrow: heroData.eyebrow,
            hero_title: heroData.title,
            hero_description: heroData.description,
            hero_bg_image_url: finalHeroBg || '',
          })
          .eq('id', activeId);

        if (error) throw new Error(`Database update failed: ${error.message}`);
      }

      alert('Events Page Hero updated successfully!');
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
          .from('sermons')
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('sermons').getPublicUrl(fileName);
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
      loadData();
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
    loadData();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className={`text-2xl font-bold font-serif transition-colors ${theme?.heading_text || 'text-green-950'}`}>
        Manage Events Page
      </h1>

      {/* Hero Section Form */}
      <form onSubmit={handleHeroSubmit} className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
        <h2 className={`text-lg font-semibold transition-colors ${theme?.section_title_text || 'text-amber-600'}`}>Events Hero Section</h2>

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

      {/* Event Item Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={`text-lg font-semibold transition-colors ${theme?.section_title_text || 'text-amber-600'}`}>
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