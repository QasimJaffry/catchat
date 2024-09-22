import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Cat {
  id: number;
  name: string;
}

interface SearchBarProps {
  cats: Cat[];
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  cats,
  isSearchOpen,
  setIsSearchOpen,
}) => {
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
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.form
        onSubmit={handleSearch}
        className="flex items-center"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isSearchOpen ? 1 : 0,
          height: isSearchOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search cats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 px-4 bg-slate-100 dark:bg-white pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
      </motion.form>

      {searchTerm && filteredCats.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
          {filteredCats.map((cat) => (
            <li
              key={cat.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
              onClick={() => {
                router.push(`/chat/${cat.id}`);
                setSearchTerm("");
                setIsSearchOpen(false);
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
