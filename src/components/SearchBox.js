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
        style={{ width: 300, borderRadius: 10 }}
        type="text"
        placeholder="Search Products..."
        name="search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        style={{
          borderWidth: 1,
          borderRadius: 20,
          marginTop: 5,
        }}
      >
        <i class="fa fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
