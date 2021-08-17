import React, { useState } from "react";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search Products..."
        name="search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">
        <i class="fa fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
