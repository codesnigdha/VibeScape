import React, { useState } from "react";

import { Download } from "lucide-react";

const WallpaperCard = ({ wallpaper, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  // Download Function
  const handleDownload = async () => {
    try {
      const response = await fetch(wallpaper.src.original);

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;

      link.download = `${wallpaper.alt || "wallpaper"}.jpg`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div
      className="
        group relative
        rounded-xl sm:rounded-2xl
        overflow-hidden
        bg-muted/20
        break-inside-avoid
        mb-3 sm:mb-4 cursor-pointer
      "
      onClick={() => onClick(wallpaper)}
    >
      {/* Loading Skeleton */}
      {!loaded && (
        <div
          className="
            absolute inset-0
            bg-muted animate-pulse
          "
          style={{
            paddingBottom: `${(wallpaper.height / wallpaper.width) * 100}%`,
          }}
        />
      )}

      {/* Wallpaper Image */}
      <img
        src={wallpaper.src.medium}
        alt={wallpaper.alt || "Wallpaper"}
        className={`
          w-full object-cover
          transition-all duration-500
          will-change-transform
          ${
            loaded
              ? `
                opacity-100
                group-hover:scale-105
              `
              : "opacity-0"
          }
        `}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
      />

      {/* Hover Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/60
          via-transparent
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          flex flex-col justify-end
          p-4
        "
      >
        {/* Top Content */}
        <div
          className="
            flex items-center
            justify-between
          "
        >
          <p
            className="
              text-white text-sm
              font-medium truncate
              max-w-[70%]
            "
          >
            {wallpaper.alt || "Untitled"}
          </p>

          <div className="flex gap-2">
            {/* Download Button */}
            <button
              className="
                p-2
                bg-white/20
                hover:bg-white/40
                backdrop-blur-md
                rounded-full
                text-white
                transition-colors
              "
              onClick={(e) => {
                e.stopPropagation();

                handleDownload();
              }}
              title="Download Original"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Photographer */}
        <p
          className="
            text-white/70
            text-xs mt-1
          "
        >
          By {wallpaper.photographer}
        </p>
      </div>
    </div>
  );
};

export default React.memo(WallpaperCard);
