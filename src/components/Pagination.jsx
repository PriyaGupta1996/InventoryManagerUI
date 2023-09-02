import React from "react";

export const Pagination = (props) => {
  const pagesIndexToDisplay = [];
  for (let i = 0; i < props.totalPage; i++) {
    pagesIndexToDisplay.push(i + 1);
  }

  return (
    <div display="flex" style={{ marginTop: "2rem" }}>
      {pagesIndexToDisplay.map((pageIndex) => (
        <button
          onClick={() => props.setPageNo(pageIndex - 1)}
          style={
            pageIndex === props.pageNo + 1 ? { backgroundColor: "yellow" } : {}
          }
        >
          {pageIndex}
        </button>
      ))}
    </div>
  );
};
