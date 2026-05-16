import { useEffect, useRef } from "react";
import WallpaperCard from "./WallpaperCard";
import { Loader2 } from "lucide-react";

const WallpaperGrid = ({
  wallpapers,
  loading,
  onImageClick,
  onLoadMore,
  hasMore,
}) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !loading) {
          onLoadMore();
        }
      },
      {
        threshold: 1,
        rootMargin: "200px",
      }
    );

    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading]);

  return (
    <div className="w-full">
      {/* Empty State */}
      {wallpapers.length === 0 && !loading ? (
        <div className="text-center py-20 text-muted">
          <p className="text-xl">No wallpapers found.</p>
        </div>
      ) : (
        /* Masonry Grid */
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 2xl:columns-6 gap-3 sm:gap-4 md:gap-6 w-full">
          {wallpapers.map((wallpaper, idx) => (
            <div
              key={`${wallpaper.id}-${idx}`}
              className="mb-4 break-inside-avoid"
            >
              <WallpaperCard wallpaper={wallpaper} onClick={onImageClick} />
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Loader */}
      {hasMore && (
        <div ref={observerTarget} className="w-full py-10 flex justify-center">
          {loading && (
            <div className="flex items-center gap-2 text-primary">
              <Loader2 className="animate-spin" />

              <span className="font-medium">Loading amazing wallpapers...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WallpaperGrid;
