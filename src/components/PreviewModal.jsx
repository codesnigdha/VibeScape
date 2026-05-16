import { useEffect } from "react";

import { X, Download, ExternalLink } from "lucide-react";

const PreviewModal = ({ image, onClose }) => {
  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent Background Scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Download Function
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;

      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Background Overlay */}
      <div
        className="
          absolute inset-0
          bg-background/80
          backdrop-blur-sm
          transition-opacity
        "
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative w-full max-w-[95%] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl
          bg-card border border-border mt-16
          rounded-xl sm:rounded-2xl shadow-2xl
          overflow-hidden
          flex flex-col md:flex-row
          animate-in fade-in zoom-in-95
          duration-200
          h-[85vh] md:h-[80vh]
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            p-2 bg-black/50
            hover:bg-black/70
            text-white rounded-full
            backdrop-blur-md
            transition-colors
          "
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div
          className="
    flex-1
    bg-gradient-to-br
    from-black/5
    via-background
    to-black/10

    flex items-center justify-center

    p-3 sm:p-5 md:p-8 lg:p-10

    relative overflow-hidden

    min-h-[40vh] md:min-h-0
  "
        >
          {/* Background Glow */}
          <div
            className="
      absolute inset-0
      bg-gradient-to-br
      from-primary/5
      via-transparent
      to-purple-500/5
      pointer-events-none
    "
          />

          {/* Decorative Blur */}
          <div
            className="
      absolute
      w-[300px] h-[300px]
      bg-primary/10
      rounded-full
      blur-3xl
      opacity-50
      pointer-events-none
    "
          />

          {/* Wallpaper Image */}
          <img
            src={image.src.large2x}
            alt={image.alt}
            className="
      relative z-10

      object-contain

      drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]

      rounded-xl

      /* Mobile */
      max-w-[96%]
      max-h-[42vh]

      /* Small Tablet */
      sm:max-w-[92%]
      sm:max-h-[52vh]

      /* Tablet */
      md:max-w-[88%]
      md:max-h-[68vh]

      /* Desktop */
      lg:max-w-[85%]
      lg:max-h-[74vh]

      /* Large Screens */
      xl:max-w-[82%]
      xl:max-h-[78vh]
    "
          />
        </div>

        {/* Sidebar */}
        <div
          className="
            w-full md:w-80 lg:w-96
            border-t md:border-t-0
            md:border-l border-border
            bg-card p-4 sm:p-6
            flex flex-col gap-4 sm:gap-6
            overflow-y-auto
          "
        >
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold mb-1">
              {image.alt || "Untitled Wallpaper"}
            </h3>

            <p
              className="
                text-muted text-sm
                flex items-center gap-2
              "
            >
              By{" "}
              <a
                href={image.photographer_url}
                target="_blank"
                rel="noreferrer"
                className="
                  text-primary
                  hover:underline
                "
              >
                {image.photographer}
              </a>
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h4
              className="
                text-sm font-semibold
                uppercase tracking-wider
                text-muted
              "
            >
              Details
            </h4>

            <div
              className="
                grid grid-cols-2
                gap-4 text-sm
              "
            >
              <div>
                <p className="text-muted">Resolution</p>

                <p className="font-medium">
                  {image.width} × {image.height}
                </p>
              </div>

              <div>
                <p className="text-muted">Avg Color</p>

                <div
                  className="
                    flex items-center
                    gap-2 mt-1
                  "
                >
                  <div
                    className="
                      w-4 h-4 rounded-full
                      border border-border
                    "
                    style={{
                      backgroundColor: image.avg_color,
                    }}
                  />

                  <span
                    className="
                      font-medium uppercase
                    "
                  >
                    {image.avg_color}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div
            className="
              mt-auto pt-6
              flex flex-col gap-4
            "
          >
            {/* Download Options */}
            <div className="space-y-3">
              <h4
                className="
                  text-sm font-semibold
                  uppercase tracking-wider
                  text-muted
                "
              >
                Download Quality
              </h4>

              <div
                className="
                  grid grid-cols-2
                  gap-3
                "
              >
                {/* 720P */}
                <button
                  onClick={() =>
                    handleDownload(
                      `${image.src.original}?auto=compress&cs=tinysrgb&w=1280`,
                      "wallpaper-720p.jpg"
                    )
                  }
                  className="
                    flex items-center
                    justify-center
                    py-2.5 rounded-xl
                    bg-muted/20
                    hover:bg-muted/30
                    transition-all
                    font-medium
                  "
                >
                  720P
                </button>

                {/* 1080P */}
                <button
                  onClick={() =>
                    handleDownload(
                      `${image.src.original}?auto=compress&cs=tinysrgb&w=1920`,
                      "wallpaper-1080p.jpg"
                    )
                  }
                  className="
                    flex items-center
                    justify-center
                    py-2.5 rounded-xl
                    bg-muted/20
                    hover:bg-muted/30
                    transition-all
                    font-medium
                  "
                >
                  1080P
                </button>

                {/* 2K */}
                <button
                  onClick={() =>
                    handleDownload(
                      `${image.src.original}?auto=compress&cs=tinysrgb&w=2560`,
                      "wallpaper-2k.jpg"
                    )
                  }
                  className="
                    flex items-center
                    justify-center
                    py-2.5 rounded-xl
                    bg-muted/20
                    hover:bg-muted/30
                    transition-all
                    font-medium
                  "
                >
                  2K
                </button>

                {/* 4K */}
                <button
                  onClick={() =>
                    handleDownload(
                      `${image.src.original}?auto=compress&cs=tinysrgb&w=3840`,
                      "wallpaper-4k.jpg"
                    )
                  }
                  className="
                    flex items-center
                    justify-center
                    py-2.5 rounded-xl
                    bg-muted/20
                    hover:bg-muted/30
                    transition-all
                    font-medium
                  "
                >
                  4K
                </button>
              </div>
            </div>

            {/* Original Download */}
            <button
              onClick={() =>
                handleDownload(image.src.original, "wallpaper-original.jpg")
              }
              className="
                w-full
                flex items-center
                justify-center gap-2
                bg-primary
                hover:bg-primary/90
                text-primary-foreground
                py-3 rounded-xl
                font-semibold
                transition-colors
              "
            >
              <Download size={18} />
              Download Original
            </button>

            {/* Open Fullscreen */}
            <button
              onClick={() => window.open(image.src.original, "_blank")}
              className="
    w-full
    flex items-center
    justify-center gap-2
    bg-muted/20
    hover:bg-muted/30
    text-foreground
    py-3 rounded-xl
    font-semibold
    transition-colors
  "
            >
              <ExternalLink size={18} />
              Open Fullscreen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
