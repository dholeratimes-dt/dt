import Link from "next/link";
import "./project.css";
import Image from "next/image";

import hero from "@/assets/residential-hero.webp";
import heroM from "@/assets/residential-mob-view.webp";
import westwyn from "@/assets/residential/westwyn-county.webp";
import westwyn_estate from "@/assets/residential/bmacover2.webp";
import westwyn_residency from "@/assets/residential/westwyn-residency-dholera-project-section.webp";
import orchid from "@/assets/residential/orchid.webp";
import paradise1 from "@/assets/residential/paradise1.webp";
import paradise2 from "@/assets/residential/paradise2.webp";
import maple from "@/assets/residential/maple-township.webp";
import marina from "@/assets/residential/marina-bay.webp";
import pride from "@/assets/residential/pride.webp";
import LeadForm from "./LeadForm";

// JSON data array
const projectsData = [
  {
    _id: "1",
    title: "WestWyn Residency",
    slug: { current: "westwyn-residency" },
    mainImage: westwyn_residency,
    description:
      "Own premium plots at WestWyn Residency a newly launch project in Polarpur, Dholera. Located near Dholera SIR and major infrastructure, offering well-connected plots with instant registry.  ",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Premium investment opportunity in the heart of Dholera Smart City. Strategic location with excellent connectivity and growth potential.",
          },
        ],
      },
    ],
    categories: [{ title: "Under Construction" }, { title: "Latest" }],
    location: "Pipariya, Dholera, Gujarat",
    status: "ongoing",
  },
  {
    _id: "2",
    title: "WestWyn Estates",
    slug: { current: "westwyn-estate" },
    mainImage: westwyn_estate,
    description:
      "Step into Dholera’s growth with WestWyn Estates premium plots in Polarpur. With direct entry from State Highway-117 and just minutes from Bhimnath Railway Station.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Premium investment opportunity in the heart of Dholera Smart City. Strategic location with excellent connectivity and growth potential.",
          },
        ],
      },
    ],
    categories: [{ title: "Under Construction" }, { title: "Latest" }],
    location: "Vadhela, Dholera, Gujarat",
    status: "ongoing",
  },
  {
    _id: "3",
    title: "WestWyn County",
    slug: { current: "westwyn-county" },
    mainImage: westwyn,
    description:
      "Premium township with spacious plots, world-class connectivity, and Tata Semiconductor Fab nearby.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Strategically located premium township offering world-class amenities and infrastructure development.",
          },
        ],
      },
    ],
    categories: [{ title: "Sold Out" }, { title: "Premium" }],
    location: "Fedra-Pipli State Highway, Dholera, Gujarat",
    status: "sold out",
  },
  {
    _id: "4",
    title: "Orchid",
    slug: { current: "orchid" },
    mainImage: orchid,
    description:
      "Peaceful residential project with smart amenities and direct connectivity to Ahmedabad Dholera Expressway.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Smart residential development with modern amenities and excellent connectivity to major transportation networks.",
          },
        ],
      },
    ],
    categories: [{ title: "Sold Out" }, { title: "Smart Living" }],
    location: "Gamph, Dholera",
    status: "sold-out",
  },
  {
    _id: "5",
    title: "Paradise",
    slug: { current: "paradise-1" },
    mainImage: paradise1,
    description:
      "Luxury plotted developments close to Dholera International Airport, designed for long term investors and smart living.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Luxury residential plots strategically located near the upcoming international airport with premium amenities.",
          },
        ],
      },
    ],
    categories: [{ title: "Sold Out" }, { title: "Luxury" }],
    location: "Shela, Dholera",
    status: "sold-out",
  },
  {
    _id: "6",
    title: "Paradise 2",
    slug: { current: "paradise-2" },
    mainImage: paradise2,
    description:
      "Luxury plotted developments close to Dholera International Airport, designed for long term investors and smart living.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Second phase of the luxury Paradise project with enhanced amenities and premium location advantages.",
          },
        ],
      },
    ],
    categories: [{ title: "Sold Out" }, { title: "Luxury" }],
    location: "Shela, Dholera",
    status: "sold-out",
  },
  {
    _id: "7",
    title: "Maple Township",
    slug: { current: "maple" },
    mainImage: maple,
    description:
      "Affordable premium plots near the ABCD Building, Dholera, and Smart City Booking Centre, ideal for families and investors.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Family-friendly township with affordable pricing and proximity to key administrative buildings in Dholera.",
          },
        ],
      },
    ],
    categories: [{ title: "Sold Out" }, { title: "Affordable" }],
    location: "Gamph, Gujarat",
    status: "sold-out",
  },
  {
    _id: "8",
    title: "Marina Bay",
    slug: { current: "marina-bay" },
    mainImage: marina,
    description:
      "A unique project inspired by coastal living, situated near Dholera Port and the Solar Power Plant, is ideal for future growth.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Coastal-inspired residential development with unique design elements and strategic location near port facilities.",
          },
        ],
      },
    ],
    categories: [{ title: "Sold Out" }, { title: "Coastal Living" }],
    location: "Gamph, Dholera",
    status: "sold-out",
  },
  {
    _id: "9",
    title: "Pride",
    slug: { current: "pride" },
    mainImage: pride,
    description:
      "Prestigious township with eco-friendly infrastructure and assured growth potential in Dholera Metro City.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Eco-friendly township development with sustainable infrastructure and promising growth prospects.",
          },
        ],
      },
    ],
    categories: [{ title: "Sold Out" }, { title: "Eco-Friendly" }],
    location: "Kasindra, Dholera",
    status: "sold-out",
  },
];

// Simple PortableText component replacement
const PortableText = ({ value }) => {
  if (!value || !Array.isArray(value)) return null;

  return (
    <div>
      {value.map((block, index) => (
        <p key={index}>
          {block.children?.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </p>
      ))}
    </div>
  );
};

export default function Projects() {
  const posts = projectsData;

  function checkIfSoldOut(post) {
    if (!post.categories) return false;

    if (Array.isArray(post.categories)) {
      return post.categories.some(
        (category) =>
          category.title && category.title.toLowerCase() === "sold out",
      );
    } else {
      return (
        post.categories.title &&
        post.categories.title.toLowerCase() === "sold out"
      );
    }
  }

  // Separate sold out and available projects
  const availableProjects = posts.filter((post) => !checkIfSoldOut(post));
  const soldOutProjects = posts.filter((post) => checkIfSoldOut(post));

  return (
    <div className="min-h-screen">
      <title>Residential Plots in Dholera Smart City | Dholera Times</title>
      <meta
        name="description"
        content="Premium residential plots in Dholera Smart City. Explore projects like WestWyn, Paradise, Orchid, and more with the top Dholera investment value."
      />
      <meta
        name="keywords"
        content="Dholera residential plots, Dholera Smart City, Dholera plots, Dholera investment, investment in Dholera"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-residential-plots"
      />
      <meta name="robots" content="index, dofollow" />

      <div className="relative overflow-hidden h-[50vh] w-full">
        {/* Background Image - Desktop */}
        <div className="hidden md:block absolute inset-0 w-full h-full ">
          <Image
            src={hero}
            alt="Dholera SIR Project"
            fill
            className="object-cover" // Use cover to fill width and height
            priority
          />
        </div>

        {/* Background Image - Mobile */}
        <div className="md:hidden absolute inset-0 w-full h-full">
          <Image
            src={heroM}
            alt="Dholera SIR Project"
            fill
            className="object-cover"
            priority
          />
        </div>
         <div className="absolute inset-0 bg-black/50"></div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center bg-black/20">
          {" "}
          {/* Added slight overlay for text readability */}
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{ color: "#fbfbfb" }}
            >
              Our <span style={{ color: "#debe6b" }}>Projects</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Available Projects Section */}
      {availableProjects.length > 0 && (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2
                className="text-[28px] font-bold"
                style={{ color: "#151f28" }}
              >
                High-Growth Opportunities in{" "}
                <span style={{ color: "#debe6b" }}>Dholera</span>
              </h2>
              <p
                className="max-w-2xl mx-auto"
                style={{ color: "rgba(21, 31, 40, 0.7)" }}
              >
                Secure a future-ready asset in India's first smart city
              </p>
            </div>

            {availableProjects.length === 1 ? (
              // Single Project Display - Project Left, Form Right
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  {/* Project Details - Left Side */}
                  <div className="order-1 lg:order-1">
                    <Link
                      href={
                        availableProjects[0].slug?.current
                          ? `/dholera-residential-plots/${availableProjects[0].slug.current}`
                          : "#"
                      }
                    >
                      <div
                        className="rounded-3xl shadow-2xl overflow-hidden border-2 cursor-pointer"
                        style={{
                          backgroundColor: "#fbfbfb",
                          borderColor: "rgba(222, 190, 107, 0.2)",
                        }}
                      >
                        {/* Image Section */}
                        <div className="relative">
                          {availableProjects[0].mainImage && (
                            <div className="relative h-[300px]">
                              <Image
                                src={
                                  availableProjects[0].mainImage ||
                                  "/placeholder.svg"
                                }
                                alt={availableProjects[0].title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                          <div className="space-y-4">
                            <h3
                              className="text-2xl lg:text-3xl font-bold"
                              style={{ color: "#151f28" }}
                            >
                              {availableProjects[0].title}
                            </h3>

                            {availableProjects[0].description && (
                              <p
                                className="text-lg leading-relaxed"
                                style={{ color: "rgba(21, 31, 40, 0.8)" }}
                              >
                                {availableProjects[0].description}
                              </p>
                            )}

                            <div className="pt-4">
                              <div
                                className="inline-flex items-center px-8 py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                style={{
                                  backgroundColor: "#debe6b",
                                  color: "#151f28",
                                }}
                              >
                                <span>View Full Details</span>
                                <svg
                                  className="w-5 h-5 ml-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Lead Form - Right Side */}
                  <div className="order-2 lg:order-2 lg:sticky lg:top-8">
                    <div
                      className="rounded-3xl p-6 shadow-2xl border-2"
                      style={{
                        backgroundColor: "#151f28",
                        borderColor: "rgba(222, 190, 107, 0.3)",
                      }}
                    >
                      <div className="text-center mb-4">
                        <h3
                          className="text-xl lg:text-2xl font-bold mb-4"
                          style={{ color: "#fbfbfb" }}
                        >
                          Verified Dholera plots under ₹10 Lakh only,
                          <br /> 5 Minute from the expressway
                        </h3>
                        {/* <p
                          className="text-lg"
                          style={{ color: "rgba(251, 251, 251, 0.8)" }}
                        >
                          Get detailed information and secure your investment
                          opportunity
                        </p> */}
                      </div>
                      <div className="max-w-2xl mx-auto">
                        <LeadForm buttonName="Get A Call Back" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Multiple Projects Slider
              <div className="relative">
                <div className="overflow-x-auto scrollbar-hide">
                  <div
                    className="flex space-x-8 pb-4"
                    style={{ width: "max-content" }}
                  >
                    {availableProjects.map((post, index) => (
                      <div key={post._id} className="flex-shrink-0 w-96">
                        <Link
                          href={
                            post.slug?.current
                              ? `/dholera-residential-plots/${post.slug.current}`
                              : "#"
                          }
                          className="block"
                        >
                          <div
                            className="rounded-3xl shadow-xl overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                            style={{
                              backgroundColor: "#fbfbfb",
                              borderColor: "rgba(222, 190, 107, 0.2)",
                            }}
                          >
                            {/* Image */}
                            <div className="relative h-64">
                              {post.mainImage && (
                                <Image
                                  src={post.mainImage || "/placeholder.svg"}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                              <h3
                                className="text-xl font-bold mb-3 line-clamp-2"
                                style={{ color: "#151f28" }}
                              >
                                {post.title}
                              </h3>

                              {post.description && (
                                <p
                                  className="text-sm leading-relaxed mb-4 line-clamp-3"
                                  style={{ color: "rgba(21, 31, 40, 0.8)" }}
                                >
                                  {post.description}
                                </p>
                              )}

                              <div
                                className="inline-flex items-center px-6 py-3 font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                                style={{
                                  backgroundColor: "#debe6b",
                                  color: "#151f28",
                                }}
                              >
                                View Projects
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Form for Multiple Projects */}
                <div className="mt-16 max-w-4xl mx-auto">
                  <div
                    className="rounded-3xl p-8 lg:p-12 shadow-2xl border-2"
                    style={{
                      backgroundColor: "#151f28",
                      borderColor: "rgba(222, 190, 107, 0.3)",
                    }}
                  >
                    <div className="text-center mb-8">
                      <h3
                        className="text-3xl font-bold mb-4"
                        style={{ color: "#fbfbfb" }}
                      >
                        Know Today's{" "}
                        <span style={{ color: "#debe6b" }}>Best Offer</span>
                      </h3>
                      <p
                        className="text-lg"
                        style={{ color: "rgba(251, 251, 251, 0.8)" }}
                      >
                        Connect with our investment team for personalized
                        guidance
                      </p>
                    </div>
                    <LeadForm buttonName="Claim My Offer" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sold Out Projects Grid */}
      {/* Sold Out Projects Grid */}
      {soldOutProjects.length > 0 && (
        <div
          className="py-20"
          style={{ backgroundColor: "rgba(21, 31, 40, 0.05)" }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                className="text-[28px] font-bold mb-6"
                style={{ color: "#151f28" }}
              >
                Sold Out <span style={{ color: "#debe6b" }}>Projects</span>
              </h2>
              <p
                className="text-xl max-w-2xl mx-auto"
                style={{ color: "rgba(21, 31, 40, 0.7)" }}
              >
                Our successful investment projects with proven returns
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {soldOutProjects.map((post) => (
                <div key={post._id} className="group h-full">
                  <Link
                    href={
                      post.slug?.current
                        ? `/dholera-residential-plots/${post.slug.current}`
                        : "#"
                    }
                    className="block h-full"
                  >
                    <div
                      className="rounded-2xl shadow-xl overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative cursor-pointer h-full flex flex-col"
                      style={{
                        backgroundColor: "#fbfbfb",
                        borderColor: "rgba(222, 190, 107, 0.2)",
                      }}
                    >
                      {/* Sold Out Overlay */}
                      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

                      {/* Image */}
                      <div className="relative h-64 flex-shrink-0">
                        {post.mainImage && (
                          <Image
                            src={post.mainImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        )}

                        {/* Sold Out Badge */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                          <span
                            className="px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm border opacity-90"
                            style={{
                              backgroundColor: "rgba(222, 190, 107, 0.8)",
                              color: "#151f28",
                              borderColor: "rgba(222, 190, 107, 0.5)",
                            }}
                          >
                            Sold Out
                          </span>
                        </div>
                      </div>

                      {/* Content - Flex grow to fill space */}
                      <div className="p-6 relative z-20 flex flex-col flex-grow">
                        <h3
                          className="text-xl font-bold mb-3"
                          style={{ color: "#151f28" }}
                        >
                          {post.title}
                        </h3>

                        {post.description && (
                          <p
                            className="text-sm leading-relaxed mb-6 flex-grow"
                            style={{ color: "rgba(21, 31, 40, 0.8)" }}
                          >
                            {post.description}
                          </p>
                        )}

                        {/* Button - Anchored to bottom */}
                        <div className="mt-auto">
                          <div
                            className="inline-flex items-center px-6 py-2 font-medium rounded-lg border-2 hover:shadow-md transition-all duration-300 text-sm opacity-75 hover:opacity-100"
                            style={{
                              borderColor: "#debe6b",
                              color: "#debe6b",
                              backgroundColor: "transparent",
                            }}
                          >
                            <span>View Project</span>
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
