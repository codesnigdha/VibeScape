import { useState } from "react";

import { Search, Moon, Sun, Monitor, Smartphone, X } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

import darkLogo from "../assets/dark-logo.png";
import lightLogo from "../assets/light-logo.png";

const Navbar = ({ onSearch, orientation, onOrientationChange }) => {
  const [searchInput, setSearchInput] = useState("");

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchInput.trim()) {
      onSearch(searchInput.trim());

      setShowMobileSearch(false);
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 z-[60]
        pt-2
        w-full
        border-b border-white/10
        bg-background/60
        backdrop-blur-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-primary/5
          via-purple-500/5
          to-pink-500/5
          pointer-events-none
        "
      />

      <div
        className="
          relative
          w-full h-[74px]
          flex items-center justify-between
          pl-0 pr-4 md:pr-6 lg:pr-8 xl:pr-12
          max-w-[1920px] mx-auto
        "
      >
        {/* Left Side */}
        <div
          className="
    flex items-center
    flex-1
    min-w-0
    md:justify-center
  "
        >
          {/* Logo */}
          <img
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="VibeScape Logo"
            className="
              w-28 md:w-32
              object-contain
              drop-shadow-lg
              shrink-0
            "
          />

          {/* Mobile Search */}
          <div
            className={`
              md:hidden
              overflow-hidden
              transition-all duration-300
              ${
                showMobileSearch
                  ? `
                    w-full
                    opacity-100
                    ml-3
                    mr-3
                  `
                  : `
                    w-0
                    opacity-0
                  `
              }
            `}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              {/* Search Icon */}
              <Search
                size={16}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-muted
                "
              />

              {/* Input */}
              <input
                autoFocus
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="
                  w-full
                  pl-10 pr-10 py-2.5
                  rounded-full
                  border border-white/10
                  bg-card/50
                  backdrop-blur-xl
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/40
                "
              />

              {/* Close */}
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  text-muted
                "
              >
                <X size={16} />
              </button>
            </form>
          </div>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="
            hidden md:block
            w-full max-w-xl lg:max-w-2xl
            mx-auto
            relative group
          "
          >
            {/* Glow */}
            <div
              className="
                absolute -inset-[1px]
                rounded-full
                bg-gradient-to-r
                from-primary/30
                via-purple-500/20
                to-pink-500/30
                opacity-0
                blur-md
                group-focus-within:opacity-100
                transition-all duration-500
              "
            />

            <div className="relative">
              {/* Search Icon */}
              <div
                className="
                  absolute inset-y-0 left-0
                  pl-4
                  flex items-center
                  pointer-events-none
                  text-muted
                "
              >
                <Search size={18} />
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search stunning wallpapers..."
                className="
                  block w-full
                  pl-12 pr-5 py-3
                  rounded-full
                  border border-white/10
                  bg-card/50
                  backdrop-blur-xl
                  text-sm md:text-[15px]
                  placeholder:text-muted
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/40
                  transition-all duration-300
                "
              />
            </div>
          </form>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          {!showMobileSearch && (
            <button
              onClick={() => setShowMobileSearch(true)}
              className="
                md:hidden
                p-2.5 rounded-full
                border border-white/10
                bg-card/50
                backdrop-blur-xl
                text-muted
              "
            >
              <Search size={18} />
            </button>
          )}

          {/* Orientation */}
          <div
            className="
              flex items-center
              p-1
              rounded-full
              border border-white/10
              bg-card/50
              backdrop-blur-xl
              shadow-lg
            "
          >
            {/* Desktop */}
            <button
              onClick={() => onOrientationChange("landscape")}
              className={`
                p-2 sm:p-2.5 rounded-full
                transition-all duration-300
                ${
                  orientation === "landscape"
                    ? `
                      bg-primary
                      text-white
                    `
                    : `
                      text-muted
                    `
                }
              `}
            >
              <Monitor size={17} />
            </button>

            {/* Mobile */}
            <button
              onClick={() => onOrientationChange("portrait")}
              className={`
                p-2 sm:p-2.5 rounded-full
                transition-all duration-300
                ${
                  orientation === "portrait"
                    ? `
                      bg-primary
                      text-white
                    `
                    : `
                      text-muted
                    `
                }
              `}
            >
              <Smartphone size={17} />
            </button>
          </div>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="
              p-2.5 sm:p-3 rounded-full
              border border-white/10
              bg-card/50
              backdrop-blur-xl
              text-muted
              hover:scale-105
              transition-all duration-300
            "
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
