// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import {
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import { urlFor } from "@/sanity/lib/image";

// const NEWS_PER_PAGE = 10;

// const formatDate = (dateString) => {
//   if (!dateString) return "";

//   const date = new Date(dateString);

//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   };

//   return date.toLocaleDateString(
//     "en-US",
//     options,
//   );
// };

// export default function MobileNews({
//   posts,
// }) {
//   const [
//     currentPage,
//     setCurrentPage,
//   ] = useState(1);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(
//       posts.length /
//         NEWS_PER_PAGE,
//     ),
//   );

//   const startIndex =
//     (currentPage - 1) *
//     NEWS_PER_PAGE;

//   const visiblePosts =
//     posts.slice(
//       startIndex,
//       startIndex +
//         NEWS_PER_PAGE,
//     );

//   /* ============================================================
//      PAGINATION
//   ============================================================ */

//   const goToPage = (page) => {
//     const nextPage =
//       Math.min(
//         Math.max(
//           page,
//           1,
//         ),
//         totalPages,
//       );

//     /* Prevent unnecessary action */
//     if (
//       nextPage === currentPage
//     ) {
//       return;
//     }

//     /* Change visible posts */
//     setCurrentPage(
//       nextPage,
//     );

//     /* ========================================================
//        AUTO SCROLL TO TOP OF NEWS SECTION

//        After changing page:
//        Page 1 -> Page 2
//        Page 2 -> Page 3
//        Previous etc.

//        User automatically returns to the heading / first post.
//     ======================================================== */

//     window.requestAnimationFrame(
//       () => {
//         window.requestAnimationFrame(
//           () => {
//             const heading =
//               document.getElementById(
//                 "latest-news-heading",
//               );

//             if (heading) {
//               heading.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//               });
//             } else {
//               window.scrollTo({
//                 top: 0,
//                 behavior: "smooth",
//               });
//             }
//           },
//         );
//       },
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* =====================================================
//           NEWS CARDS
//       ====================================================== */}

//       <div
//         key={`news-page-${currentPage}`}
//         className="
//           grid
//           grid-cols-1

//           gap-6
//         "
//       >
//         {visiblePosts.map(
//           (
//             post,
//             index,
//           ) => (
//             <article
//               key={
//                 post._id ||
//                 post.slug?.current ||
//                 `${currentPage}-${index}`
//               }
//               className="
//                 overflow-hidden

//                 rounded-xl

//                 border
//                 border-[#d3b36b]/20

//                 bg-[#151f28]

//                 shadow-sm

//                 transition-all
//                 duration-300

//                 hover:scale-[1.03]
//                 hover:border-[#d3b36b]/40
//                 hover:shadow-lg
//                 hover:shadow-[#d3b36b]/20
//               "
//             >
//               <Link
//                 href={`/dholera-updates/latest-updates/${post.slug.current}`}
//               >
//                 {/* ===========================================
//                     IMAGE
//                 ============================================ */}

//                 <div
//                   className="
//                     flex

//                     items-center
//                     justify-center

//                     overflow-hidden

//                     bg-gray-200
//                   "
//                 >
//                   {post.mainImage ? (
//                     <Image
//                       src={urlFor(
//                         post.mainImage,
//                       )
//                         .width(800)
//                         .height(400)
//                         .url()}
//                       alt={
//                         post.title ||
//                         "Dholera SIR Blog Post"
//                       }
//                       width={800}
//                       height={400}
//                       className="
//                         h-full
//                         w-full

//                         object-cover

//                         transition-transform
//                         duration-500

//                         hover:scale-110
//                       "
//                     />
//                   ) : (
//                     <div
//                       className="
//                         flex
//                         h-48
//                         w-full

//                         items-center
//                         justify-center

//                         bg-gradient-to-br
//                         from-[#d3b36b]/20
//                         to-[#151f28]/20
//                       "
//                     >
//                       <div className="text-6xl">
//                         📰
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* ===========================================
//                     CONTENT
//                 ============================================ */}

//                 <div
//                   className="
//                     p-4

//                     text-white

//                     transition-colors
//                     duration-300

//                     hover:text-[#d3b36b]
//                   "
//                 >
//                   <h3
//                     className="
//                       mb-2

//                       line-clamp-2

//                       cursor-pointer

//                       text-lg
//                       font-semibold
//                     "
//                   >
//                     {post.title ||
//                       `Dholera Investment Guide ${
//                         startIndex +
//                         index +
//                         1
//                       }`}
//                   </h3>

//                   <div
//                     className="
//                       flex

//                       items-center
//                       justify-between

//                       gap-3
//                     "
//                   >
//                     <p
//                       className="
//                         text-sm

//                         text-gray-400
//                       "
//                     >
//                       {formatDate(
//                         post.publishedAt ||
//                           post._createdAt,
//                       )}
//                     </p>

//                     <span
//                       className="
//                         shrink-0

//                         font-medium

//                         text-[#d3b36b]

//                         hover:underline
//                       "
//                     >
//                       Read More →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </article>
//           ),
//         )}
//       </div>

//       {/* =====================================================
//           PAGINATION
//       ====================================================== */}

//       {totalPages > 1 && (
//         <nav
//           aria-label="Mobile latest updates pagination"
//           className="
//             mt-7

//             border-t
//             border-black/10

//             pt-6
//           "
//         >
//           <div
//             className="
//               grid
//               w-full

//               grid-cols-[1fr_auto_1fr]

//               items-center

//               gap-2

//               min-[375px]:gap-3
//             "
//           >
//             {/* =================================================
//                 PREVIOUS
//             ================================================== */}

//             <div
//               className="
//                 flex
//                 justify-start
//               "
//             >
//               <button
//                 type="button"
//                 onClick={() =>
//                   goToPage(
//                     currentPage -
//                       1,
//                   )
//                 }
//                 disabled={
//                   currentPage === 1
//                 }
//                 aria-label="Previous page"
//                 className="
//                   inline-flex

//                   h-11
//                   min-w-[78px]

//                   touch-manipulation

//                   items-center
//                   justify-center

//                   gap-1

//                   rounded-xl

//                   border
//                   border-black/10

//                   bg-white

//                   px-3

//                   text-[14px]
//                   font-semibold
//                   leading-none

//                   text-black

//                   shadow-[0_3px_12px_rgba(0,0,0,0.04)]

//                   transition-[background-color,border-color,color,box-shadow,transform]
//                   duration-200
//                   ease-out

//                   enabled:active:scale-[0.97]

//                   enabled:hover:border-[#EC1C40]/25
//                   enabled:hover:bg-[#EC1C40]/5
//                   enabled:hover:text-[#EC1C40]

//                   focus-visible:outline-none
//                   focus-visible:ring-2
//                   focus-visible:ring-[#EC1C40]/40
//                   focus-visible:ring-offset-2

//                   disabled:cursor-not-allowed
//                   disabled:border-black/[0.05]
//                   disabled:bg-black/[0.015]
//                   disabled:text-black/25
//                   disabled:shadow-none

//                   motion-reduce:transform-none
//                   motion-reduce:transition-none
//                 "
//               >
//                 <ChevronLeft
//                   size={16}
//                   strokeWidth={2}
//                   aria-hidden="true"
//                 />

//                 <span>
//                   Prev
//                 </span>
//               </button>
//             </div>

//             {/* =================================================
//                 PAGE STATUS
//             ================================================== */}

//             <div
//               className="
//                 flex

//                 items-center
//                 justify-center
//               "
//             >
//               <p
//                 aria-live="polite"
//                 className="
//                   whitespace-nowrap

//                   text-center

//                   text-[14px]
//                   font-medium
//                   leading-5

//                   tracking-[-0.01em]

//                   text-black/55
//                 "
//               >
//                 Page{" "}
//                 <span
//                   className="
//                     font-semibold

//                     text-[#EC1C40]
//                   "
//                 >
//                   {currentPage}
//                 </span>{" "}
//                 of{" "}
//                 <span
//                   className="
//                     font-medium

//                     text-black/65
//                   "
//                 >
//                   {totalPages}
//                 </span>
//               </p>
//             </div>

//             {/* =================================================
//                 NEXT
//             ================================================== */}

//             <div
//               className="
//                 flex
//                 justify-end
//               "
//             >
//               <button
//                 type="button"
//                 onClick={() =>
//                   goToPage(
//                     currentPage +
//                       1,
//                   )
//                 }
//                 disabled={
//                   currentPage ===
//                   totalPages
//                 }
//                 aria-label="Next page"
//                 className="
//                   inline-flex

//                   h-11
//                   min-w-[78px]

//                   touch-manipulation

//                   items-center
//                   justify-center

//                   gap-1

//                   rounded-xl

//                   border
//                   border-black/10

//                   bg-white

//                   px-3

//                   text-[14px]
//                   font-semibold
//                   leading-none

//                   text-black

//                   shadow-[0_3px_12px_rgba(0,0,0,0.04)]

//                   transition-[background-color,border-color,color,box-shadow,transform]
//                   duration-200
//                   ease-out

//                   enabled:active:scale-[0.97]

//                   enabled:hover:border-[#EC1C40]/25
//                   enabled:hover:bg-[#EC1C40]/5
//                   enabled:hover:text-[#EC1C40]

//                   focus-visible:outline-none
//                   focus-visible:ring-2
//                   focus-visible:ring-[#EC1C40]/40
//                   focus-visible:ring-offset-2

//                   disabled:cursor-not-allowed
//                   disabled:border-black/[0.05]
//                   disabled:bg-black/[0.015]
//                   disabled:text-black/25
//                   disabled:shadow-none

//                   motion-reduce:transform-none
//                   motion-reduce:transition-none
//                 "
//               >
//                 <span>
//                   Next
//                 </span>

//                 <ChevronRight
//                   size={16}
//                   strokeWidth={2}
//                   aria-hidden="true"
//                 />
//               </button>
//             </div>
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { urlFor } from "@/sanity/lib/image";

const NEWS_PER_PAGE = 10;

/* ============================================================
   DATE
============================================================ */

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date =
    new Date(dateString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString(
    "en-US",
    options,
  );
};

/* ============================================================
   MOBILE NEWS
============================================================ */

export default function MobileNews({
  posts,
}) {
  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        posts.length /
          NEWS_PER_PAGE,
      ),
    );

  const startIndex =
    (currentPage - 1) *
    NEWS_PER_PAGE;

  const visiblePosts =
    posts.slice(
      startIndex,
      startIndex +
        NEWS_PER_PAGE,
    );

  /* ============================================================
     PAGINATION
  ============================================================ */

  const goToPage = (page) => {
    const nextPage =
      Math.min(
        Math.max(
          page,
          1,
        ),
        totalPages,
      );

    if (
      nextPage ===
      currentPage
    ) {
      return;
    }

    setCurrentPage(
      nextPage,
    );

    /* ========================================================
       AUTO SCROLL TO NEWS HEADING
    ======================================================== */

    window.requestAnimationFrame(
      () => {
        window.requestAnimationFrame(
          () => {
            const heading =
              document.getElementById(
                "latest-news-heading",
              );

            if (heading) {
              heading.scrollIntoView({
                behavior:
                  "smooth",
                block:
                  "start",
              });
            } else {
              window.scrollTo({
                top: 0,
                behavior:
                  "smooth",
              });
            }
          },
        );
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          NEWS CARDS
      ====================================================== */}

      <div
        key={`news-page-${currentPage}`}
        className="
          grid
          grid-cols-1
          gap-6
        "
      >
        {visiblePosts.map(
          (
            post,
            index,
          ) => (
            <article
              key={
                post._id ||
                post.slug
                  ?.current ||
                `${currentPage}-${index}`
              }
              className="
                overflow-hidden

                rounded-xl

                border
                border-[#EC1C40]/30

                bg-white

                shadow-[0_5px_18px_rgba(0,0,0,0.045)]

                transition-all
                duration-300

                hover:scale-[1.03]

                hover:border-[#EC1C40]/55

                hover:shadow-lg
                hover:shadow-[#EC1C40]/10
              "
            >
              <Link
                href={`/dholera-updates/latest-updates/${post.slug.current}`}
              >
                {/* ===========================================
                    IMAGE

                    SIZE / DIMENSIONS UNCHANGED
                ============================================ */}

                <div
                  className="
                    flex

                    items-center
                    justify-center

                    overflow-hidden

                    bg-gray-200
                  "
                >
                  {post.mainImage ? (
                    <Image
                      src={urlFor(
                        post.mainImage,
                      )
                        .width(800)
                        .height(400)
                        .url()}
                      alt={
                        post.title ||
                        "Dholera SIR Blog Post"
                      }
                      width={800}
                      height={400}
                      className="
                        h-full
                        w-full

                        object-cover

                        transition-transform
                        duration-500

                        hover:scale-110
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex

                        h-48
                        w-full

                        items-center
                        justify-center

                        bg-gradient-to-br

                        from-[#EC1C40]/10
                        via-[#EC1C40]/5
                        to-white
                      "
                    >
                      <div
                        className="
                          text-6xl
                        "
                      >
                        📰
                      </div>
                    </div>
                  )}
                </div>

                {/* ===========================================
                    CONTENT

                    UPDATED ONLY COLOR PALETTE
                ============================================ */}

                <div
                  className="
                    p-4

                    bg-white

                    text-black

                    transition-colors
                    duration-300
                  "
                >
                  {/* TITLE */}

                  <h3
                    className="
                      mb-2

                      line-clamp-2

                      cursor-pointer

                      text-lg
                      font-semibold
                      leading-[1.45]

                      text-black

                      transition-colors
                      duration-200

                      hover:text-[#EC1C40]
                    "
                  >
                    {post.title ||
                      `Dholera Investment Guide ${
                        startIndex +
                        index +
                        1
                      }`}
                  </h3>

                  {/* DIVIDER */}

                  <div
                    className="
                      mt-4

                      border-t
                      border-black/10

                      pt-4
                    "
                  >
                    <div
                      className="
                        flex

                        items-center
                        justify-between

                        gap-3
                      "
                    >
                      {/* DATE */}

                      <p
                        className="
                          text-sm

                          text-black/50
                        "
                      >
                        {formatDate(
                          post.publishedAt ||
                            post._createdAt,
                        )}
                      </p>

                      {/* READ MORE */}

                      <span
                        className="
                          shrink-0

                          font-semibold

                          text-[#EC1C40]

                          transition-colors
                          duration-200

                          hover:text-[#d9183a]
                        "
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ),
        )}
      </div>

      {/* =====================================================
          PAGINATION
      ====================================================== */}

      {totalPages > 1 && (
        <nav
          aria-label="Mobile latest updates pagination"
          className="
            mt-7

            border-t
            border-black/10

            pt-6
          "
        >
          <div
            className="
              grid
              w-full

              grid-cols-[1fr_auto_1fr]

              items-center

              gap-2

              min-[375px]:gap-3
            "
          >
            {/* =================================================
                PREVIOUS
            ================================================== */}

            <div
              className="
                flex
                justify-start
              "
            >
              <button
                type="button"
                onClick={() =>
                  goToPage(
                    currentPage -
                      1,
                  )
                }
                disabled={
                  currentPage ===
                  1
                }
                aria-label="Previous page"
                className="
                  inline-flex

                  h-11
                  min-w-[78px]

                  touch-manipulation

                  items-center
                  justify-center

                  gap-1

                  rounded-xl

                  border
                  border-black/10

                  bg-white

                  px-3

                  text-[14px]
                  font-semibold
                  leading-none

                  text-black

                  shadow-[0_3px_12px_rgba(0,0,0,0.04)]

                  transition-[background-color,border-color,color,box-shadow,transform]
                  duration-200
                  ease-out

                  enabled:active:scale-[0.97]

                  enabled:hover:border-[#EC1C40]/25
                  enabled:hover:bg-[#EC1C40]/5
                  enabled:hover:text-[#EC1C40]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]/40
                  focus-visible:ring-offset-2

                  disabled:cursor-not-allowed
                  disabled:border-black/[0.05]
                  disabled:bg-black/[0.015]
                  disabled:text-black/25
                  disabled:shadow-none

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <ChevronLeft
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                <span>
                  Prev
                </span>
              </button>
            </div>

            {/* =================================================
                PAGE STATUS
            ================================================== */}

            <div
              className="
                flex

                items-center
                justify-center
              "
            >
              <p
                aria-live="polite"
                className="
                  whitespace-nowrap

                  text-center

                  text-[14px]
                  font-medium
                  leading-5

                  tracking-[-0.01em]

                  text-black/55
                "
              >
                Page{" "}
                <span
                  className="
                    font-semibold

                    text-[#EC1C40]
                  "
                >
                  {currentPage}
                </span>{" "}
                of{" "}
                <span
                  className="
                    font-medium

                    text-black/65
                  "
                >
                  {totalPages}
                </span>
              </p>
            </div>

            {/* =================================================
                NEXT
            ================================================== */}

            <div
              className="
                flex
                justify-end
              "
            >
              <button
                type="button"
                onClick={() =>
                  goToPage(
                    currentPage +
                      1,
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                aria-label="Next page"
                className="
                  inline-flex

                  h-11
                  min-w-[78px]

                  touch-manipulation

                  items-center
                  justify-center

                  gap-1

                  rounded-xl

                  border
                  border-black/10

                  bg-white

                  px-3

                  text-[14px]
                  font-semibold
                  leading-none

                  text-black

                  shadow-[0_3px_12px_rgba(0,0,0,0.04)]

                  transition-[background-color,border-color,color,box-shadow,transform]
                  duration-200
                  ease-out

                  enabled:active:scale-[0.97]

                  enabled:hover:border-[#EC1C40]/25
                  enabled:hover:bg-[#EC1C40]/5
                  enabled:hover:text-[#EC1C40]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]/40
                  focus-visible:ring-offset-2

                  disabled:cursor-not-allowed
                  disabled:border-black/[0.05]
                  disabled:bg-black/[0.015]
                  disabled:text-black/25
                  disabled:shadow-none

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <span>
                  Next
                </span>

                <ChevronRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}