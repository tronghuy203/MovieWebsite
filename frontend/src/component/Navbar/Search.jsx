import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export const Search = () => {
  const searchRef = useRef();
  const toggleIconRef = useRef();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleClickOutSilde = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        toggleIconRef.current &&
        !toggleIconRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSilde);
    return () => {
      document.removeEventListener("click", handleClickOutSilde);
    };
  });
  const handleToggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <div className="relative flex items-center justify-center">
      <div>
        <div className="relative hidden lg:flex px-5 ">
          <MagnifyingGlassIcon className="absolute mx-5 w-5 h-5 left-2 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="search"
            placeholder="Tìm kiếm phim, diễn viên,..."
            className="bg-gray-600 border-0 py-5 rounded-md w-72 h-8 pl-8 text-white placeholder:text-white placeholder:text-sm bg-opacity-50"
          />
        </div>
        <button
          ref={toggleIconRef}
          onClick={handleToggleSearch}
          className="text-white w-5 h-5 lg:hidden flex items-center justify-center ml-2"
        >
          {isSearchOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
      
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          )}
        </button>
      </div>
      {isSearchOpen && (
        <div ref={searchRef}>
          <div className="relative">

            <input
              type="search"
              placeholder="Tìm kiếm phim, diễn viên,..."
              className="bg-gray-800 border-[1px] rounded-sm w-36 h-6 text-center text-white text-[10px] placeholder:text-white placeholder:text-[10px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
