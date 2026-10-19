import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ManageGiving() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [heroImageFile, setHeroImageFile] = useState(null);

  const [formData, setFormData] = useState({
    hero_eyebrow: 'Give & Support',
    hero_title: 'Your Giving Makes a Difference',
    hero_description: 'Your generosity helps us spread the Gospel, support ministry work, and reach lives.',
    hero_bg_image_url: '',
    intro_eyebrow: 'Partner With Us',
    intro_title: 'Give With a Willing Heart',
    intro_description: 'We are grateful for every gift and every person who chooses to partner with this ministry.',
    momo_mtn_number: '054 352 1234',
    momo_mtn_name: 'Tiroug Boadzie Ebenezer',
    momo_telecel_number: '050 215 1234',
    momo_telecel_name: 'Tiroug Boadzie Ebenezer',
    momo_airteltigo_number: '026 820 1234',
    momo_airteltigo_name: 'Tiroug Boadzie Ebenezer',
    bank_name: 'GCB',
    bank_account_number: 'XXXXXXXX',
    bank_account_name: 'Tiroug Boadzie Ebenezer',
    bank_branch: 'Suami Magazine',
    scripture_quote: 'God loves a cheerful giver.',
    scripture_ref: '2 Corinthians 9:7',
  });

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('giving').select('*').limit(1).maybeSingle();
    
    if (data && !error) {
      setTargetId(data.id);
      setFormData({
        hero_eyebrow: data.hero_eyebrow || 'Give & Support',
        hero_title: data.hero_title || 'Your Giving Makes a Difference',
        hero_description: data.hero_description || '',
        hero_bg_image_url: data.hero_bg_image_url || '',
        intro_eyebrow: data.intro_eyebrow || 'Partner With Us',
        intro_title: data.intro_title || 'Give With a Willing Heart',
        intro_description: data.intro_description || '',
        momo_mtn_number: data.momo_mtn_number || '',
        momo_mtn_name: data.momo_mtn_name || '',
        momo_telecel_number: data.momo_telecel_number || '',
        momo_telecel_name: data.momo_telecel_name || '',
        momo_airteltigo_number: data.momo_airteltigo_number || '',
        momo_airteltigo_name: data.momo_airteltigo_name || '',
        bank_name: data.bank_name || '',
        bank_account_number: data.bank_account_number || '',
        bank_account_name: data.bank_account_name || '',
        bank_branch: data.bank_branch || '',
        scripture_quote: data.scripture_quote || 'God loves a cheerful giver.',
        scripture_ref: data.scripture_ref || '2 Corinthians 9:7',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalHeroBg = formData.hero_bg_image_url;

      if (heroImageFile) {
        const fileExt = heroImageFile.name.split('.').pop();
        const fileName = `hero_giving_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('sermons')
          .upload(fileName, heroImageFile, { upsert: true });

        if (uploadError) throw new Error(uploadError.message);

        const { data } = supabase.storage.from('sermons').getPublicUrl(fileName);
        finalHeroBg = data.publicUrl;
      }

      const payload = {
        ...formData,
        hero_bg_image_url: finalHeroBg,
      };

      let activeId = targetId;

      if (!activeId) {
        const { data: newRow, error: insertError } = await supabase
          .from('giving')
          .insert([payload])
          .select()
          .single();

        if (insertError) throw new Error(insertError.message);
        activeId = newRow.id;
        setTargetId(activeId);
      } else {
        const { error } = await supabase
          .from('giving')
          .update(payload)
          .eq('id', activeId);

        if (error) throw new Error(error.message);
      }

      alert('Giving Page updated successfully!');
      setHeroImageFile(null);
      loadData();
    } catch (err) {
      alert(`Error updating giving page: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage Giving Page</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Giving Hero Section</h2>
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

        {/* Intro Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Introduction Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Intro Eyebrow</label>
              <input
                value={formData.intro_eyebrow}
                onChange={(e) => setFormData({ ...formData, intro_eyebrow: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Intro Title</label>
              <input
                value={formData.intro_title}
                onChange={(e) => setFormData({ ...formData, intro_title: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Intro Description</label>
              <textarea
                rows={2}
                value={formData.intro_description}
                onChange={(e) => setFormData({ ...formData, intro_description: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile Money Accounts */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Mobile Money Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded bg-stone-50 space-y-2">
              <p className="font-semibold text-sm text-stone-700">MTN MoMo</p>
              <input
                value={formData.momo_mtn_number}
                onChange={(e) => setFormData({ ...formData, momo_mtn_number: e.target.value })}
                placeholder="Number"
                className="w-full border p-2 rounded text-sm bg-white"
              />
              <input
                value={formData.momo_mtn_name}
                onChange={(e) => setFormData({ ...formData, momo_mtn_name: e.target.value })}
                placeholder="Account Name"
                className="w-full border p-2 rounded text-sm bg-white"
              />
            </div>

            <div className="p-4 border rounded bg-stone-50 space-y-2">
              <p className="font-semibold text-sm text-stone-700">Telecel Cash</p>
              <input
                value={formData.momo_telecel_number}
                onChange={(e) => setFormData({ ...formData, momo_telecel_number: e.target.value })}
                placeholder="Number"
                className="w-full border p-2 rounded text-sm bg-white"
              />
              <input
                value={formData.momo_telecel_name}
                onChange={(e) => setFormData({ ...formData, momo_telecel_name: e.target.value })}
                placeholder="Account Name"
                className="w-full border p-2 rounded text-sm bg-white"
              />
            </div>

            <div className="p-4 border rounded bg-stone-50 space-y-2">
              <p className="font-semibold text-sm text-stone-700">AirtelTigo Money</p>
              <input
                value={formData.momo_airteltigo_number}
                onChange={(e) => setFormData({ ...formData, momo_airteltigo_number: e.target.value })}
                placeholder="Number"
                className="w-full border p-2 rounded text-sm bg-white"
              />
              <input
                value={formData.momo_airteltigo_name}
                onChange={(e) => setFormData({ ...formData, momo_airteltigo_name: e.target.value })}
                placeholder="Account Name"
                className="w-full border p-2 rounded text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Bank Transfer Information */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Bank Transfer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Bank Name</label>
              <input
                value={formData.bank_name}
                onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Account Number</label>
              <input
                value={formData.bank_account_number}
                onChange={(e) => setFormData({ ...formData, bank_account_number: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Account Name</label>
              <input
                value={formData.bank_account_name}
                onChange={(e) => setFormData({ ...formData, bank_account_name: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Branch</label>
              <input
                value={formData.bank_branch}
                onChange={(e) => setFormData({ ...formData, bank_branch: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Closing Scripture Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Closing Scripture Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Scripture Quote</label>
              <input
                value={formData.scripture_quote}
                onChange={(e) => setFormData({ ...formData, scripture_quote: e.target.value })}
                placeholder="e.g. God loves a cheerful giver."
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Scripture Reference</label>
              <input
                value={formData.scripture_ref}
                onChange={(e) => setFormData({ ...formData, scripture_ref: e.target.value })}
                placeholder="e.g. 2 Corinthians 9:7"
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
          {saving ? 'Saving Changes...' : 'Save All Giving Changes'}
        </button>
      </form>
    </div>
  );
}