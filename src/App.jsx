import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CategoryNav from "./components/CategoryNav";
import WallpaperGrid from "./components/WallpaperGrid";
import PreviewModal from "./components/PreviewModal";
import { fetchWallpapers, fetchCurated } from "./services/pexels";

function App() {
  const [query, setQuery] = useState("nature");
  const [orientation, setOrientation] = useState("landscape");

  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);

  // Initial Load + Query Change
  useEffect(() => {
    const loadWallpapers = async () => {
      setLoading(true);

      try {
        const data = query
          ? await fetchWallpapers({
              query,
              orientation,
              page: 1,
            })
          : await fetchCurated({
              page: 1,
            });

        if (data.photos) {
          setWallpapers(data.photos);

          setHasMore(data.photos.length > 0 && Boolean(data.next_page));

          setPage(2);
        }
      } catch (error) {
        console.error("Failed to fetch wallpapers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWallpapers();
  }, [query, orientation]);

  // Load More Wallpapers
  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = query
        ? await fetchWallpapers({
            query,
            orientation,
            page,
          })
        : await fetchCurated({
            page,
          });

      if (data.photos) {
        setWallpapers((prev) => [...prev, ...data.photos]);

        setHasMore(data.photos.length > 0 && Boolean(data.next_page));

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load more wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search Handler
  const handleSearch = (newQuery) => {
    const formattedQuery = newQuery.trim().toLowerCase();

    if (formattedQuery !== query) {
      setWallpapers([]);
      setPage(1);
      setHasMore(true);

      setQuery(formattedQuery);
    }
  };

  // Orientation Handler
  const handleOrientationChange = (newOrientation) => {
    if (newOrientation !== orientation) {
      setOrientation(newOrientation);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden font-sans selection:bg-primary/30">
      {/* Navbar */}
      <Navbar
        onSearch={handleSearch}
        orientation={orientation}
        onOrientationChange={handleOrientationChange}
      />

      {/* Main Content */}
      <main className="flex-1 w-full pt-[95px] md:pt-[100px] pb-8 flex flex-col gap-6 md:gap-8 max-w-[1920px] mx-auto">
        {/* Categories */}
        <section className="w-full">
          <CategoryNav
            currentCategory={query}
            onSelectCategory={handleSearch}
          />
        </section>

        {/* Wallpaper Grid */}
        <section className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <WallpaperGrid
            wallpapers={wallpapers}
            loading={loading}
            onImageClick={setSelectedImage}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </section>
      </main>

      {/* Preview Modal */}
      {selectedImage && (
        <PreviewModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default App;
