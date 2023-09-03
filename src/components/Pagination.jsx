import React from "react";

export const Pagination = (props) => {
  const { totalPage, pageNo, setPageNo } = props;
  const pagesIndexToDisplay = [];

  for (let pageIndex = 1; pageIndex <= totalPage; pageIndex++) {
    pagesIndexToDisplay.push(pageIndex);
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      {pagesIndexToDisplay.map((pageIndex) => (
        <button
          key={pageIndex}
          className={`btn ${pageIndex === pageNo + 1 ? "bg-primary" : ""}`}
          onClick={() => setPageNo(pageIndex - 1)}
          style={{
            marginRight: "0.5rem",
          }}
        >
          {pageIndex}
        </button>
      ))}
    </div>
  );
};
