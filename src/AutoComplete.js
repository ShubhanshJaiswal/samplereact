import React, { useState } from "react";
import './samplebuild/concurrency.css';

const Autocomplete = ({ suggestions, onSelect }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput);

    if (userInput) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.code.toLowerCase().includes(userInput.toLowerCase()) ||
          suggestion.name.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleClick = (suggestion) => {
    setInputValue(suggestion.code);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    onSelect(suggestion.code);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        className="form-control"
        placeholder="Search Currency"
      />
      {showSuggestions && (
        <div className="autocomplete-suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="autocomplete-suggestion"
              onClick={() => handleClick(suggestion)}
            >
              {suggestion.code} - {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
