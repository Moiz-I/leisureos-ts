"use client";

export const SearchBar = () => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder={"Search for a show"}
        className={"input"}
        // onChange={(event) => setQuery(event.target.value)}
        // value={query}
      />
    </div>
  );
};
