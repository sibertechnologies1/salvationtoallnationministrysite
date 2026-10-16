import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const defaultValues = [
  { title: "Worship", description: "We gather to honor God with all our heart, in spirit and in truth." },
  { title: "Community", description: "We are family, gathered from every background, walking life together." },
  { title: "Discipleship", description: "We grow in faith through the Word, prayer, and one another." },
  { title: "Service", description: "We serve our city and the nations with the love of Christ." },
];

export default function ManageAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [targetId, setTargetId] = useState(null);
  
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [pastorImageFile, setPastorImageFile] = useState(null);

  const [formData, setFormData] = useState({
    hero_eyebrow: 'Who We Are',
    hero_title: 'Our Story',
    hero_description: 'Rooted in faith, growing in community, reaching every nation.',
    hero_bg_image_url: '',
    story_content: '',
    core_values: defaultValues,
    pastor_name: 'Pastor Tiroug Boadzie Ebenezer',
    pastor_bio: '',
    pastor_image_url: '',
    cta_title: "We'd love to have you join us",
    cta_button_text: 'Plan your visit',
  });

  const loadData = async () => {
    setLoading(true);
    const { data } = await supabase.from('about').select('*').limit(1).maybeSingle();
    
    if (data) {
      setTargetId(data.id);
      setFormData({
        hero_eyebrow: data.hero_eyebrow || 'Who We Are',
        hero_title: data.hero_title || 'Our Story',
        hero_description: data.hero_description || '',
        hero_bg_image_url: data.hero_bg_image_url || '',
        story_content: data.story_content || '',
        core_values: data.core_values || defaultValues,
        pastor_name: data.pastor_name || 'Pastor Tiroug Boadzie Ebenezer',
        pastor_bio: data.pastor_bio || '',
        pastor_image_url: data.pastor_image_url || '',
        cta_title: data.cta_title || "We'd love to have you join us",
        cta_button_text: data.cta_button_text || 'Plan your visit',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleValueChange = (index, field, value) => {
    const updatedValues = [...formData.core_values];
    updatedValues[index][field] = value;
    setFormData({ ...formData, core_values: updatedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalHeroBg = formData.hero_bg_image_url;
      let finalPastorImg = formData.pastor_image_url;

      if (heroImageFile) {
        const fileExt = heroImageFile.name.split('.').pop();
        const fileName = `hero_about_${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('sermons').upload(fileName, heroImageFile, { upsert: true });
        if (uploadError) throw new Error(uploadError.message);
        const { data } = supabase.storage.from('sermons').getPublicUrl(fileName);
        finalHeroBg = data.publicUrl;
      }

      if (pastorImageFile) {
        const fileExt = pastorImageFile.name.split('.').pop();
        const fileName = `pastor_${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('sermons').upload(fileName, pastorImageFile, { upsert: true });
        if (uploadError) throw new Error(uploadError.message);
        const { data } = supabase.storage.from('sermons').getPublicUrl(fileName);
        finalPastorImg = data.publicUrl;
      }

      const payload = {
        ...formData,
        hero_bg_image_url: finalHeroBg,
        pastor_image_url: finalPastorImg,
      };

      let activeId = targetId;

      if (!activeId) {
        const { data: newRow, error: insertError } = await supabase.from('about').insert([payload]).select().single();
        if (insertError) throw new Error(insertError.message);
        activeId = newRow.id;
        setTargetId(activeId);
      } else {
        const { error } = await supabase.from('about').update(payload).eq('id', activeId);
        if (error) throw new Error(error.message);
      }

      alert('About Page updated successfully!');
      setHeroImageFile(null);
      setPastorImageFile(null);
      loadData();
    } catch (err) {
      alert(`Error saving about page: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage About Page</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Eyebrow Text</label>
              <input
                value={formData.hero_eyebrow}
                onChange={(e) => setFormData({ ...formData, hero_eyebrow: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Headline</label>
              <input
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Description</label>
              <textarea
                rows={2}
                value={formData.hero_description}
                onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
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
                value={formData.hero_bg_image_url}
                onChange={(e) => setFormData({ ...formData, hero_bg_image_url: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Our Story Section</h2>
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Story Content</label>
            <textarea
              rows={5}
              value={formData.story_content}
              onChange={(e) => setFormData({ ...formData, story_content: e.target.value })}
              className="w-full border p-2.5 rounded text-sm"
            />
          </div>
        </div>

        {/* Core Values Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.core_values.map((val, index) => (
              <div key={index} className="p-4 border rounded bg-stone-50 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Value Title {index + 1}</label>
                  <input
                    value={val.title}
                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                    className="w-full border p-2 rounded text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Value Description</label>
                  <textarea
                    rows={2}
                    value={val.description}
                    onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                    className="w-full border p-2 rounded text-sm bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Leadership (Meet Our Pastor)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Pastor's Name</label>
              <input
                value={formData.pastor_name}
                onChange={(e) => setFormData({ ...formData, pastor_name: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Pastor Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPastorImageFile(e.target.files[0])}
                className="w-full border p-1 rounded text-sm mb-2"
              />
              <input
                placeholder="...or paste Pastor Photo URL"
                value={formData.pastor_image_url}
                onChange={(e) => setFormData({ ...formData, pastor_image_url: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Pastor Bio</label>
              <textarea
                rows={3}
                value={formData.pastor_bio}
                onChange={(e) => setFormData({ ...formData, pastor_bio: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Closing CTA Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Closing Call To Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">CTA Heading</label>
              <input
                value={formData.cta_title}
                onChange={(e) => setFormData({ ...formData, cta_title: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Button Text</label>
              <input
                value={formData.cta_button_text}
                onChange={(e) => setFormData({ ...formData, cta_button_text: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-amber-500 text-green-950 font-semibold px-8 py-3 rounded hover:bg-amber-400 disabled:opacity-50 text-sm shadow"
        >
          {saving ? 'Saving All Changes...' : 'Save All About Page Changes'}
        </button>
      </form>
    </div>
  );
}