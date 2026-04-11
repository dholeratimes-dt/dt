"use client";
import Image from "next/image";
import get from "@/assets/contact-us-hero.webp";
import getM from "@/assets/contact-us-m-v.webp";
import {
  FaPhoneAlt,
  FaHeadset,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import ContactForm from "../../components/ContactForm";


export default function ContactDetails() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Dholera Times",
    image: "",
    "@id": "",
    url: "https://www.dholeratimes.com/",
    telephone: "+91 99589 93549",
    priceRange: "7Lac",
    address: {
      "@type": "PostalAddress",
      streetAddress: "JMD MEGAPOLIS, 620, Badshahpur Sohna Rd Hwy, Sector 48",
      addressLocality: "Gurugram",
      postalCode: "122018",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4195542,
      longitude: 77.0386216,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:30",
      closes: "19:30",
    },
    sameAs: [
      "https://www.facebook.com/people/Dholera-Times",
      "https://x.com/dholeratimes/",
      "https://www.instagram.com/p/DJVtydWBCoK/",
      "https://www.youtube.com/@dholeratimes",
      "https://www.linkedin.com/company/dholera-times",
      "https://www.dholeratimes.com/",
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dholeratimes.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact Us",
        item: "https://www.dholeratimes.com/contact",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Inquiry",
        item: "https://www.dholeratimes.com/contact/inquiry",
      },
    ],
  };

  return (
    <>
      <meta name="robots" content="index, dofollow" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="bg-gray-900 w-full">
        <title>
          Contact Us | Dholera Times – Real Estate Experts in Dholera Smart City
        </title>
        <meta
          name="description"
          content="Get in touch with our team for plot bookings, site visits, or investment advice in Dholera Smart City. Call, WhatsApp or visit us."
        />
        <meta
          name="keywords"
          content="Expert guidance on dholera Smart City, Contact dholera times , Dholera investment consultation, Book plot in dholera , Dholera inquiry, Dholera Investment "
        />
        <link
          rel="canonical"
          href="https://www.dholeratimes.com/contact/inquiry"
        />

        <div className="relative h-[50vh] w-full ">
          {/* Banner Image */}
          <Image
            src={get}
            alt="Get in touch with Dholera Times team for inquiries and support"
            className="h-full w-full object-cover max-sm:hidden"
            fill
            priority
          />
          <Image
            src={getM}
            alt="Get in touch with Dholera Times team for inquiries and support"
            className="h-full w-full object-cover md:hidden"
            fill
            priority
          />
          {/* <Image
                  src={bannerMob}
                  alt="banner"
                  className="h-full w-full object-cover md:hidden"
                  fill
                  priority
                /> */}
        </div>
      </div>

      <div className="">
        {/* Header Section */}

        {/* Contact Cards Section */}
        <div className="bg-white py-12">
          <h1 className="text-center mb-10 font-bold text-4xl max-sm:text-3xl max-sm:ml-4 max-sm:text-left">
            Get Expert Guidance on Dholera Smart City
          </h1>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-10">
            {/* Talk to Sales */}
            <div className="hover:scale-105 shadow-2xl">
              <a
                href="tel:+919958993549"
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <FaPhoneAlt className="text-gray-800 text-3xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Talk to Sales
                </h2>
                <p className="text-gray-600 mt-2">
                  Interested in our services? Just pick up the phone to chat
                  with a member of our sales team.
                </p>
              </a>
            </div>

            {/* Contact Support */}
            <div className="hover:scale-105 shadow-2xl">
              <a
                href="https://api.whatsapp.com/send?phone=919958993549"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <FaHeadset className="text-gray-800 text-3xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Contact Customer Support
                </h2>
                <p className="text-gray-600 mt-2">
                  Need help? Our support team is here for you. Reach out
                  anytime!
                </p>
              </a>
            </div>
          </div>

          {/* Address Section */}

          {/* Social Media Links */}
          <div className="mt-10 ">
            {/* Contact Info & Contact Form */}
            <div className="flex flex-col max-sm:flex-col-reverse md:flex-row justify-center items-center  gap-16 p-6">
              {/* Contact Info Section */}
              <div className="max-w-2xl text-left">
                <div className="space-y-8">
                  <div>
                    <h2 className="font-bold text-4xl text-[#2863e5]">
                      Registered Office{" "}
                    </h2>
                    <h3 className="font-bold text-2xl">Dholera Times </h3>
                    <div className=" mt-4 text-lg space-y-2">
                      <div>
                        <h3>
                          <p className="flex justify-start items-center gap-4">
                            <strong>
                              <FaPhoneAlt />
                            </strong>{" "}
                            +91 99589 93549
                          </p>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <p className="flex justify-start items-center gap-4">
                            <strong>
                              <CiMail />
                            </strong>{" "}
                            info@dholeratimes.com
                          </p>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <p className="flex justify-start items-center gap-4">
                            <strong>
                              <FaMapMarkerAlt />
                            </strong>{" "}
                            620, JMD Megapolis, Sector-48, Sohna Road, Gurugram
                            - 122018, India
                          </p>
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className=" w-full h-48 rounded overflow-hidden">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4203.4823453415875!2d77.03488882442701!3d28.41943917746384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ed979cce195a67%3A0xa6ea8ada5da2aaf5!2sDholera%20Times!5e1!3m2!1sen!2sin!4v1744797963851!5m2!1sen!2sin"
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location map"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Branch Office Section */}
                  <div>
                    <h2 className="font-bold text-4xl text-[#2863e5]">
                      Branch Office{" "}
                    </h2>
                    <h3 className="font-bold text-2xl">Dholera Times </h3>
                    <div className=" mt-4 text-lg space-y-2">
                      <div>
                        <h3>
                          <p className="flex justify-start items-center gap-4">
                            <strong>
                              <FaPhoneAlt />
                            </strong>{" "}
                            +91 99589 93549
                          </p>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <p className="flex justify-start items-center gap-4">
                            <strong>
                              <CiMail />
                            </strong>{" "}
                            info@dholeratimes.com
                          </p>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <p className="flex justify-start items-center gap-4">
                            <strong>
                              <FaMapMarkerAlt />
                            </strong>{" "}
                            Office no. 303, 3rd Floor H-110, Sector-63, Noida, Uttar Pradesh 201301
                          </p>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className=" ">
                <ContactForm
                  title="Enquire Now"
                  headline="Book  your free consultation with our Dholera expert-no obligations, just guidance. Fields marked with * are mandatory."
                  buttonName="Get A Call Back"
                />
              </div>
            </div>
            <div className="space-y-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Follow Us
              </h2>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61573763438050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-3xl hover:text-blue-800"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://x.com/dholeratimes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-3xl hover:text-blue-600"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/dholeratimes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 text-3xl hover:text-pink-700"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/dholera-times"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-3xl hover:text-blue-900"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
