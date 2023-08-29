import React from "react";
import dustbin from "../images/dustbin.png";
import pencil from "../images/pencil.png";

export const TableData = () => {
  return (
    <div className="table-div">
      <table className="table-data">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Shelf Number</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tr>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
          <td>
            {" "}
            <img className="dustbin" src={dustbin} />
          </td>
          <td>
            <img className="dustbin" src={pencil} />
          </td>
        </tr>
      </table>
    </div>
  );
};
