import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { countryOptions } from "../dropdown/DropDownHelper";

const SearchableDropdown = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = countryOptions.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option) => {
    setSelectedCountry(option);
    setIsDropdownOpen(false); // Close dropdown after selection
    setSearchTerm(""); // Reset search term
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Search Input */}
      <div
        className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring focus-within:ring-blue-300 cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => e.stopPropagation()} // Prevent dropdown toggle
          className="flex-grow outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow mt-2 max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((country) => (
              <div
                key={country.value}
                onClick={() => handleOptionSelect(country)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {country.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No countries found.
            </div>
          )}
        </div>
      )}

      {/* Selected Country */}
      {selectedCountry && (
        <div className="mt-2 text-sm text-gray-700">
          Selected Country: <strong>{selectedCountry.label}</strong>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
