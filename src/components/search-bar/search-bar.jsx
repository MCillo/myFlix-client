import React from "react";
import { useState } from "react";
import { Placeholder } from "react-bootstrap";

const searchBar = ({ movies }) => {

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    movies.filter((movie) => {
      return (
        movie.title.match(searchInput);
      <>
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={searchInput} />
      </>
      ));
  });
}

}