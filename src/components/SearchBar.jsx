import React from "react";

function SearchBar({ search, setSearch }) {
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
