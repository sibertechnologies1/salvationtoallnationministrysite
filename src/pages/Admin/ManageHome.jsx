import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';

const defaultHomeData = {
  hero_eyebrow: 'SALVATION TO ALL NATIONS',
  hero_title: 'Light for every nation, hope for every heart.',
  hero_description: 'A community gathered from every tribe and tongue, walking together in faith, worship, and service to Christ.',
  welcome_heading: 'You are welcome here',
  welcome_text: "Salvation To All Nations is a family gathered from every background and nation, united in faith. Whether you're taking your first step toward God or you've walked with Him for years, there's a place for you at our table.",
  stat_1_number: '12+',
  stat_1_label: 'YEARS ACTIVE',
  stat_2_number: '30+',
  stat_2_label: 'NATIONS REACHED',
  stat_3_number: '500+',
  stat_3_label: 'MEMBERS',
  about_title: 'A family bound by faith, not by borders.',
  about_text: "Salvation To All Nations exists to bring the hope of Christ to every tribe, tongue, and nation. Since our founding, we've grown into a community rooted in worship, discipleship, and service, welcoming anyone who seeks a place to belong.",
  giving_heading: 'Your generosity fuels the mission',
  giving_text: 'Every gift helps us reach more nations, disciple more believers, and serve our community with the love of Christ. Thank you for partnering with us, we really appreciate your support.',
};

export default function ManageHome() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(defaultHomeData);

  useEffect(() => {
    async function loadContent() {
      const { data, error } = await supabase.from('homepage_content').select('*').limit(1).single();
      if (!error && data) {
        setFormData(data);
      }
      setLoading(false);
    }
    loadContent();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Upsert creates the row if it doesn't exist yet, or updates if it does
    const { error } = await supabase.from('homepage_content').upsert([formData]);
    
    setSaving(false);
    if (error) {
      alert(`Error saving: ${error.message}`);
    } else {
      alert('Home page content updated successfully!');
    }
  };

  if (loading) return <p className="p-8 text-stone-600">Loading home page content...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-sm border border-stone-200">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage Home Page</h1>

      {/* Hero Section */}
      <fieldset className="p-5 border border-stone-200 rounded-lg space-y-4">
        <legend className="font-semibold text-amber-600 px-2 text-sm uppercase tracking-wider">
          Hero Section
        </legend>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Eyebrow Text</label>
          <input
            name="hero_eyebrow"
            value={formData.hero_eyebrow || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Headline</label>
          <input
            name="hero_title"
            value={formData.hero_title || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <textarea
            name="hero_description"
            value={formData.hero_description || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
            rows={3}
          />
        </div>
      </fieldset>

      {/* Welcome Section & Stats */}
      <fieldset className="p-5 border border-stone-200 rounded-lg space-y-4">
        <legend className="font-semibold text-amber-600 px-2 text-sm uppercase tracking-wider">
          Welcome Section & Stats
        </legend>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Heading</label>
          <input
            name="welcome_heading"
            value={formData.welcome_heading || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Text</label>
          <textarea
            name="welcome_text"
            value={formData.welcome_text || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Stat 1 Number</label>
            <input
              name="stat_1_number"
              value={formData.stat_1_number || ''}
              onChange={handleChange}
              className="w-full border border-stone-300 p-2 rounded mb-2 text-sm"
            />
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Stat 1 Label</label>
            <input
              name="stat_1_label"
              value={formData.stat_1_label || ''}
              onChange={handleChange}
              className="w-full border border-stone-300 p-2 rounded text-sm"
            />
          </div>

          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Stat 2 Number</label>
            <input
              name="stat_2_number"
              value={formData.stat_2_number || ''}
              onChange={handleChange}
              className="w-full border border-stone-300 p-2 rounded mb-2 text-sm"
            />
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Stat 2 Label</label>
            <input
              name="stat_2_label"
              value={formData.stat_2_label || ''}
              onChange={handleChange}
              className="w-full border border-stone-300 p-2 rounded text-sm"
            />
          </div>

          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Stat 3 Number</label>
            <input
              name="stat_3_number"
              value={formData.stat_3_number || ''}
              onChange={handleChange}
              className="w-full border border-stone-300 p-2 rounded mb-2 text-sm"
            />
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Stat 3 Label</label>
            <input
              name="stat_3_label"
              value={formData.stat_3_label || ''}
              onChange={handleChange}
              className="w-full border border-stone-300 p-2 rounded text-sm"
            />
          </div>
        </div>
      </fieldset>

      {/* About Teaser Section */}
      <fieldset className="p-5 border border-stone-200 rounded-lg space-y-4">
        <legend className="font-semibold text-amber-600 px-2 text-sm uppercase tracking-wider">
          About Section Teaser
        </legend>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">About Title</label>
          <input
            name="about_title"
            value={formData.about_title || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">About Text</label>
          <textarea
            name="about_text"
            value={formData.about_text || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
            rows={3}
          />
        </div>
      </fieldset>

      {/* Giving Section */}
      <fieldset className="p-5 border border-stone-200 rounded-lg space-y-4">
        <legend className="font-semibold text-amber-600 px-2 text-sm uppercase tracking-wider">
          Giving Banner Section
        </legend>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Giving Heading</label>
          <input
            name="giving_heading"
            value={formData.giving_heading || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Giving Text</label>
          <textarea
            name="giving_text"
            value={formData.giving_text || ''}
            onChange={handleChange}
            className="w-full border border-stone-300 p-2.5 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
            rows={3}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={saving}
        className="bg-amber-500 text-green-950 font-semibold px-6 py-3 rounded transition-colors hover:bg-amber-400 active:scale-95 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}