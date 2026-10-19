import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import DynamicIcon from "../../components/DynamicIcon/DynamicIcon";

export default function ContactInformation() {
  const [info, setInfo] = useState({
    info_eyebrow: "Reach Out",
    info_title: "We Are Here for You",
    info_description: "Connecting with our church family should be simple. Reach us through any of the channels below or visit us in Barekese.",
    location_address: "Barekese, Ghana",
    phone_number: "050 215 6703",
    email_address: "info@salvationtoallnations.org",
    sunday_time: "9:00 AM",
    wednesday_time: "6:30 PM",
    friday_time: "7:00 PM",
    icon_location: "FaMapMarkerAlt",
    icon_phone: "FaPhoneAlt",
    icon_email: "FaEnvelope",
    icon_service: "FaClock",
  });

  useEffect(() => {
    async function fetchInfo() {
      const { data, error } = await supabase
        .from("contact")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        setInfo((prev) => ({ ...prev, ...data }));
      }
    }
    fetchInfo();
  }, []);

  return (
    <section className="bg-stone-50 py-20 md:py-24 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-amber-600 font-semibold mb-4">
            {info.info_eyebrow}
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-green-950">
            {info.info_title}
          </h2>

          <p className="text-stone-600 mt-5 leading-relaxed">
            {info.info_description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LOCATION */}
          <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
              <DynamicIcon
                iconName={info.icon_location}
                className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
              />
            </div>

            <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
              Visit Us
            </p>

            <h3 className="text-green-950 font-serif text-xl mt-2">
              Our Location
            </h3>

            <p className="text-stone-500 text-sm mt-3 leading-relaxed whitespace-pre-line">
              {info.location_address}
            </p>
          </div>

          {/* PHONE */}
          <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
              <DynamicIcon
                iconName={info.icon_phone}
                className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
              />
            </div>

            <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
              Call Us
            </p>

            <h3 className="text-green-950 font-serif text-xl mt-2">
              Phone
            </h3>

            <a
              href={`tel:${info.phone_number}`}
              className="text-stone-500 text-sm mt-3 block hover:text-amber-600 transition-colors"
            >
              {info.phone_number}
            </a>
          </div>

          {/* EMAIL */}
          <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
              <DynamicIcon
                iconName={info.icon_email}
                className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
              />
            </div>

            <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
              Write to Us
            </p>

            <h3 className="text-green-950 font-serif text-xl mt-2">
              Email
            </h3>

            <a
              href={`mailto:${info.email_address}`}
              className="text-stone-500 text-sm mt-3 block hover:text-amber-600 transition-colors break-all"
            >
              {info.email_address}
            </a>
          </div>

          {/* SERVICE TIMES */}
          <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
              <DynamicIcon
                iconName={info.icon_service}
                className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
              />
            </div>

            <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
              Worship With Us
            </p>

            <h3 className="text-green-950 font-serif text-xl mt-2">
              Service Times
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-stone-500">
                  Sunday Worship
                </span>
                <span className="text-green-950 font-semibold whitespace-nowrap">
                  {info.sunday_time}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-stone-500">
                  Wednesday Bible Study
                </span>
                <span className="text-green-950 font-semibold whitespace-nowrap">
                  {info.wednesday_time}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-stone-500">
                  Friday Prayer Night
                </span>
                <span className="text-green-950 font-semibold whitespace-nowrap">
                  {info.friday_time}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}