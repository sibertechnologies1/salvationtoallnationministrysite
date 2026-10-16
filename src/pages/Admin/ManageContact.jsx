import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ManageContact() {
  const [savingHero, setSavingHero] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [heroImageFile, setHeroImageFile] = useState(null);

  const [heroData, setHeroData] = useState({
    eyebrow: 'Get In Touch',
    title: 'Contact Us',
    description: 'We would love to hear from you.',
    hero_bg_image_url: '',
  });

  const loadData = async () => {
    const { data } = await supabase.from('contact').select('*').limit(1).maybeSingle();
    if (data) {
      setTargetId(data.id);
      setHeroData({
        eyebrow: data.hero_eyebrow || 'Get In Touch',
        title: data.hero_title || 'Contact Us',
        description: data.hero_description || '',
        hero_bg_image_url: data.hero_bg_image_url || '',
      });
    }
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
        const fileName = `hero_contact_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('sermons')
          .upload(fileName, heroImageFile, { upsert: true });

        if (uploadError) throw new Error(uploadError.message);

        const { data } = supabase.storage.from('sermons').getPublicUrl(fileName);
        finalHeroBg = data.publicUrl;
      }

      let activeId = targetId;

      if (!activeId) {
        const { data: newRow, error: insertError } = await supabase
          .from('contact')
          .insert([{
            hero_eyebrow: heroData.eyebrow,
            hero_title: heroData.title,
            hero_description: heroData.description,
            hero_bg_image_url: finalHeroBg || '',
          }])
          .select()
          .single();

        if (insertError) throw new Error(insertError.message);
        activeId = newRow.id;
        setTargetId(activeId);
      } else {
        const { error } = await supabase
          .from('contact')
          .update({
            hero_eyebrow: heroData.eyebrow,
            hero_title: heroData.title,
            hero_description: heroData.description,
            hero_bg_image_url: finalHeroBg || '',
          })
          .eq('id', activeId);

        if (error) throw new Error(error.message);
      }

      alert('Contact Page Hero updated successfully!');
      setHeroImageFile(null);
      loadData();
    } catch (err) {
      alert(`Error updating hero: ${err.message}`);
    } finally {
      setSavingHero(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage Contact Page</h1>

      <form onSubmit={handleHeroSubmit} className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
        <h2 className="text-lg font-semibold text-amber-600">Contact Hero Section</h2>

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
    </div>
  );
}