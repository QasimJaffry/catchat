import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Cat {
  id: number;
  name: string;
}

interface SearchBarProps {
  cats: Cat[];
}

const SearchBar: React.FC<SearchBarProps> = ({ cats }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCats, setFilteredCats] = useState<Cat[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCats([]);
    } else {
      const results = cats.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCats(results);
    }
  }, [searchTerm, cats]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredCats.length > 0) {
      router.push(`/chat/${filteredCats[0].id}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search cats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </form>
      {searchTerm && filteredCats.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
          {filteredCats.map((cat) => (
            <li
              key={cat.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
              onClick={() => {
                router.push(`/chat/${cat.id}`);
                setSearchTerm("");
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
