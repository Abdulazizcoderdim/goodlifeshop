import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({
  onSearch,
  placeholder,
}: {
  onSearch: (term: string) => void;
  placeholder: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((term) => {
    onSearch(term);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={`${placeholder}...`}
        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleChange}
      />
      <Search
        className="absolute left-3 top-2.5 text-gray-100"
        size={18}
      />
    </div>
  );
};

export default SearchBar;
