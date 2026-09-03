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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "93b8f36f-c72b-4877-968a-fa51efca540c", 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.subject || "General Enquiry",
          message: formData.message,
          from_name: "Salvation to All Nations Site",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          submitting: false,
          success: true,
          error: false,
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: err.message || "Something went wrong. Please try again.",
      });
    }
  };

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