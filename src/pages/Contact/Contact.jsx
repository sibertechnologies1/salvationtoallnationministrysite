import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ContactHero from "../../components/Contact/ContactHero";
import ContactInformation from "../../components/Contact/ContactInformation";
import ContactForm from "../../components/Contact/ContactForm";
import PrayerSection from "../../components/Contact/PrayerSection";
import LocationSection from "../../components/Contact/LocationSection";
import SocialMediaSection from "../../components/Contact/SocialMediaSection";
import ClosingScriptureSection from "../../components/Contact/ClosingScriptureSection";

export default function Contact() {


  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <ContactHero />

      {/* CONTACT INFORMATION */}
      <ContactInformation />

      {/* CONTACT FORM */}
    <ContactForm />
      {/* PRAYER SECTION */}
     <PrayerSection />

      {/* LOCATION */}
     <LocationSection />

      {/* SOCIAL MEDIA */}
    <SocialMediaSection />

      {/* CLOSING SCRIPTURE */}
     <ClosingScriptureSection />

      <Footer />
    </>
  );
}