import { useRef, useEffect, useState } from "react";

import { ChevronRight, ChevronLeft } from "lucide-react";

const categories = [
  "Wallpaper",
  "Background",
  "Flowers",
  "Landscape",
  "Sunset",
  "Beach",
  "Mountain",
  "Texture",
  "Spring",
  "Summer",
  "Autumn",
  "Winter",
  "Rainy",
  "Monsoon",
  "Snow",
  "Fog",
  "Storm",
  "Sunrise",
  "Night",
  "Jungle",
  "Rain",
  "Travel",
  "Coral Reef",
  "Neon Sign",
  "Ocean",
  "Wind",
  "Full Moon",
];

const CategoryNav = ({ currentCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);

  const autoScrollRef = useRef(null);

  const isPausedRef = useRef(false);

  const [categoryImages, setCategoryImages] = useState({});

  // Duplicate for Infinite Scroll
  const infiniteCategories = [...categories, ...categories];

  // Fetch Images from Pexels
  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(
              `https://api.pexels.com/v1/search?query=${category}&per_page=1`,
              {
                headers: {
                  Authorization: import.meta.env.VITE_PEXELS_API_KEY,
                },
              }
            );

            const data = await response.json();

            return {
              name: category,
              image: data.photos?.[0]?.src?.medium || "",
            };
          })
        );

        const mappedImages = {};

        results.forEach((item) => {
          mappedImages[item.name] = item.image;
        });

        setCategoryImages(mappedImages);
      } catch (error) {
        console.error("Failed to fetch category images:", error);
      }
    };

    fetchCategoryImages();
  }, []);

  // Auto Infinite Scroll
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    autoScrollRef.current = setInterval(() => {
      if (isPausedRef.current) return;

      container.scrollLeft += 1;

      // Infinite Loop
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }, 20);

    return () => {
      clearInterval(autoScrollRef.current);
    };
  }, []);

  // Right Scroll
  const scrollRight = () => {
    const container = scrollRef.current;

    if (!container) return;

    isPausedRef.current = true;

    container.scrollBy({
      left: 500,
      behavior: "smooth",
    });

    setTimeout(() => {
      isPausedRef.current = false;
    }, 1000);
  };

  // Left Scroll
  const scrollLeft = () => {
    const container = scrollRef.current;

    if (!container) return;

    isPausedRef.current = true;

    container.scrollBy({
      left: -500,
      behavior: "smooth",
    });

    setTimeout(() => {
      isPausedRef.current = false;
    }, 1000);
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="
          absolute left-0 top-1/2
          -translate-y-1/2 z-20
          ml-4
          w-10 h-10 md:w-12 md:h-12 rounded-full
          bg-background/80
          backdrop-blur-xl
          border border-border
          shadow-lg
          hidden md:flex items-center justify-center
          hover:scale-110
          transition-all
        "
      >
        <ChevronLeft size={22} />
      </button>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="
          flex gap-3 md:gap-4
          overflow-x-auto
          scrollbar-hide
          scroll-smooth
          px-2 md:px-14
        "
      >
        {infiniteCategories.map((category, index) => {
          const isActive =
            currentCategory.toLowerCase() === category.toLowerCase();

          return (
            <button
              key={`${category}-${index}`}
              onClick={() => onSelectCategory(category.toLowerCase())}
              className={`
                  flex items-center gap-3
                  min-w-fit
                  px-3 py-1.5 md:px-4 md:py-2
                  rounded-full
                  border
                  transition-all duration-300
                  whitespace-nowrap
                  ${
                    isActive
                      ? `
                        bg-primary/10
                        border-primary/40
                        shadow-lg
                      `
                      : `
                        bg-card/60
                        border-border
                        hover:bg-card-hover
                      `
                  }
                `}
            >
              {/* Image */}
              <img
                src={
                  categoryImages[category] ||
                  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg"
                }
                alt={category}
                className="
                    w-8 h-8 md:w-10 md:h-10
                    rounded-full
                    object-cover
                  "
              />

              {/* Text */}
              <div className="flex flex-col items-start">
                <span
                  className={`
                      text-sm font-semibold
                      ${isActive ? "text-primary" : "text-foreground"}
                    `}
                >
                  {category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="
          absolute right-0 top-1/2
          -translate-y-1/2 z-20
          mr-4
          w-10 h-10 md:w-12 md:h-12 rounded-full
          bg-background/80
          backdrop-blur-xl
          border border-border
          shadow-lg
          hidden md:flex items-center justify-center
          hover:scale-110 
          transition-all
        "
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
};

export default CategoryNav;
