import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet marker icon paths in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AVAILABLE_ICONS = [
  'FaMapMarkerAlt', 'FaPhoneAlt', 'FaEnvelope', 'FaClock', 'FaCheck', 'FaPlus',
  'FaFacebookF', 'FaInstagram', 'FaYoutube', 'FaCross', 'FaChurch', 'FaHeart',
  'FaCalendarAlt', 'FaUsers', 'FaGlobe', 'FaPray', 'FaHandHoldingHeart'
];

function ChangeMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export default function ManageContact() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [heroImageFile, setHeroImageFile] = useState(null);

  // Map state
  const [mapCenter, setMapCenter] = useState([6.8527612, -1.713953]); // Default Barekese, Ghana
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const defaultValues = {
    hero_eyebrow: 'Get In Touch',
    hero_title: 'We Would Love to Hear From You',
    hero_description: 'Whether you have a question, need prayer, want to learn more about the ministry, or simply want to connect, we are here for you.',
    hero_bg_image_url: '',
    
    info_eyebrow: 'Reach Out',
    info_title: 'We Are Here for You',
    info_description: 'Connecting with our church family should be simple. Reach us through any of the channels below or visit us in Barekese.',
    phone_number: '050 215 6703',
    email_address: 'info@salvationtoallnations.org',
    location_address: 'Barekese, Ghana',
    sunday_time: '9:00 AM',
    wednesday_time: '6:30 PM',
    friday_time: '7:00 PM',

    icon_location: 'FaMapMarkerAlt',
    icon_phone: 'FaPhoneAlt',
    icon_email: 'FaEnvelope',
    icon_service: 'FaClock',

    icon_listen: 'FaCheck',
    icon_pray: 'FaPlus',

    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31690.52219077371!2d-1.7139529999999998!3d6.852761200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdba460a71cb585%3A0xe71e6202af929219!2sBarekese!5e0!3m2!1sen!2sgh!4v1788211370471!5m2!1sen!2sgh',
    web3forms_access_key: '93b8f36f-c72b-4877-968a-fa51efca540c',

    prayer_eyebrow: 'Prayer & Support',
    prayer_title: "You Don't Have to Walk Alone",
    prayer_description: 'Whatever you are facing, we believe there is power in prayer. Share your prayer request with us and our team will stand with you in faith.',

    social_eyebrow: 'Stay Connected',
    social_title: 'Connect With Us Online',
    social_description: 'Stay connected with Salvation to All Nations Ministry for messages, events, ministry updates, and other moments from our fellowship.',
    facebook_url: 'https://facebook.com',
    instagram_url: 'https://instagram.com',
    youtube_url: 'https://youtube.com',

    icon_facebook: 'FaFacebookF',
    icon_instagram: 'FaInstagram',
    icon_youtube: 'FaYoutube',

    scripture_quote: 'Encourage one another and build each other up.',
    scripture_ref: '1 Thessalonians 5:11',
    scripture_message: 'Thank you for reaching out to Salvation to All Nations Ministry. We look forward to connecting with you and walking alongside you in faith.',
  };

  const [formData, setFormData] = useState(defaultValues);

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('contact').select('*').limit(1).maybeSingle();
    
    if (data && !error) {
      setTargetId(data.id);
      setFormData({
        ...defaultValues,
        ...data,
      });
      if (data.location_address) {
        setSearchQuery(data.location_address);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Search Location via Nominatim API
  const handleSearchLocation = async (query) => {
    setSearchQuery(query);
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const results = await response.json();
      setSearchResults(results);
    } catch (err) {
      console.error('Location search failed:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectResult = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    setMapCenter([lat, lon]);
    updateEmbedAndAddress(lat, lon, result.display_name);
    setSearchResults([]);
    setSearchQuery(result.display_name);
  };

  const handleMarkerDragEnd = async (e) => {
    const { lat, lng } = e.target.getLatLng();
    setMapCenter([lat, lng]);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const placeName = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      updateEmbedAndAddress(lat, lng, placeName);
      setSearchQuery(placeName);
    } catch {
      updateEmbedAndAddress(lat, lng, `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
  };

  const updateEmbedAndAddress = (lat, lng, addressName) => {
    const generatedEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    setFormData((prev) => ({
      ...prev,
      google_maps_url: generatedEmbedUrl,
      location_address: addressName,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalHeroBg = formData.hero_bg_image_url;

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

      const payload = {
        ...formData,
        hero_bg_image_url: finalHeroBg,
      };

      let activeId = targetId;

      if (!activeId) {
        const { data: newRow, error: insertError } = await supabase
          .from('contact')
          .insert([payload])
          .select()
          .single();

        if (insertError) throw new Error(insertError.message);
        activeId = newRow.id;
        setTargetId(activeId);
      } else {
        const { error } = await supabase
          .from('contact')
          .update(payload)
          .eq('id', activeId);

        if (error) throw new Error(error.message);
      }

      alert('Contact Page updated successfully!');
      setHeroImageFile(null);
      loadData();
    } catch (err) {
      alert(`Error updating contact page: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-stone-600">Loading contact settings...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold font-serif text-green-950">Manage Contact Page</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Interactive Map & Location Search Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Interactive Map Location Picker</h2>
          
          <div className="relative">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Search Location
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchLocation(e.target.value)}
              placeholder="Search city, street, or venue..."
              className="w-full border p-2.5 rounded text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />
            
            {searchResults.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border rounded-b shadow-lg max-h-60 overflow-y-auto mt-1">
                {searchResults.map((result, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectResult(result)}
                    className="p-3 text-sm hover:bg-stone-100 cursor-pointer border-b last:border-b-0 text-stone-700"
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}
            {searching && (
              <div className="text-xs text-stone-400 mt-1">Searching location...</div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-2">
              Adjust Marker Position on Map (Drag to fine-tune exact location)
            </label>
            <div className="w-full h-[360px] border rounded-xl overflow-hidden shadow-inner relative z-10">
              <MapContainer
                center={mapCenter}
                zoom={15}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <ChangeMapCenter center={mapCenter} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={mapCenter}
                  draggable={true}
                  eventHandlers={{ dragend: handleMarkerDragEnd }}
                />
              </MapContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Generated Embed URL</label>
              <input
                readOnly
                value={formData.google_maps_url}
                className="w-full border p-2.5 rounded text-xs font-mono bg-stone-50 text-stone-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Location Address</label>
              <input
                value={formData.location_address}
                onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Contact Hero Section</h2>
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

        {/* Contact Info & Service Times Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Contact Info & Service Times</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Phone Number</label>
              <input
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Email Address</label>
              <input
                value={formData.email_address}
                onChange={(e) => setFormData({ ...formData, email_address: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Sunday Worship Time</label>
              <input
                value={formData.sunday_time}
                onChange={(e) => setFormData({ ...formData, sunday_time: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Wednesday Study Time</label>
              <input
                value={formData.wednesday_time}
                onChange={(e) => setFormData({ ...formData, wednesday_time: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Friday Prayer Night Time</label>
              <input
                value={formData.friday_time}
                onChange={(e) => setFormData({ ...formData, friday_time: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Web3Forms Access Key</label>
              <input
                value={formData.web3forms_access_key}
                onChange={(e) => setFormData({ ...formData, web3forms_access_key: e.target.value })}
                className="w-full border p-2.5 rounded text-sm font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Cards Icons Customization */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Contact Information Card Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Location Icon</label>
              <select
                value={formData.icon_location}
                onChange={(e) => setFormData({ ...formData, icon_location: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Phone Icon</label>
              <select
                value={formData.icon_phone}
                onChange={(e) => setFormData({ ...formData, icon_phone: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Email Icon</label>
              <select
                value={formData.icon_email}
                onChange={(e) => setFormData({ ...formData, icon_email: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Service Times Icon</label>
              <select
                value={formData.icon_service}
                onChange={(e) => setFormData({ ...formData, icon_service: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contact Form Side Icons */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Contact Form Side Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">'We Listen' Feature Icon</label>
              <select
                value={formData.icon_listen}
                onChange={(e) => setFormData({ ...formData, icon_listen: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">'We Pray' Feature Icon</label>
              <select
                value={formData.icon_pray}
                onChange={(e) => setFormData({ ...formData, icon_pray: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Prayer Banner Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Prayer Banner Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Prayer Eyebrow</label>
              <input
                value={formData.prayer_eyebrow}
                onChange={(e) => setFormData({ ...formData, prayer_eyebrow: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Prayer Title</label>
              <input
                value={formData.prayer_title}
                onChange={(e) => setFormData({ ...formData, prayer_title: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Prayer Description</label>
              <textarea
                rows={2}
                value={formData.prayer_description}
                onChange={(e) => setFormData({ ...formData, prayer_description: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="p-6 bg-white rounded-lg border border-stone-200 space-y-4">
          <h2 className="text-lg font-semibold text-amber-600">Social Media Links & Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Social Eyebrow</label>
              <input
                value={formData.social_eyebrow}
                onChange={(e) => setFormData({ ...formData, social_eyebrow: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Social Title</label>
              <input
                value={formData.social_title}
                onChange={(e) => setFormData({ ...formData, social_title: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Social Description</label>
              <textarea
                rows={2}
                value={formData.social_description}
                onChange={(e) => setFormData({ ...formData, social_description: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Facebook URL</label>
              <input
                value={formData.facebook_url}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Facebook Icon</label>
              <select
                value={formData.icon_facebook}
                onChange={(e) => setFormData({ ...formData, icon_facebook: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Instagram URL</label>
              <input
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Instagram Icon</label>
              <select
                value={formData.icon_instagram}
                onChange={(e) => setFormData({ ...formData, icon_instagram: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">YouTube URL</label>
              <input
                value={formData.youtube_url}
                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">YouTube Icon</label>
              <select
                value={formData.icon_youtube}
                onChange={(e) => setFormData({ ...formData, icon_youtube: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
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
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Scripture Reference</label>
              <input
                value={formData.scripture_ref}
                onChange={(e) => setFormData({ ...formData, scripture_ref: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Closing Message</label>
              <textarea
                rows={2}
                value={formData.scripture_message}
                onChange={(e) => setFormData({ ...formData, scripture_message: e.target.value })}
                className="w-full border p-2.5 rounded text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 text-green-950 font-semibold px-8 py-3 rounded hover:bg-amber-400 disabled:opacity-50 text-sm shadow"
          >
            {saving ? 'Saving Changes...' : 'Save All Contact Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}