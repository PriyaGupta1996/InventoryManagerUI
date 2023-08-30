import React from "react";
import dustbin from "../images/dustbin.png";
import pencil from "../images/pencil.png";
const colorMap = {
  alert: "red",
  ok: "yellow",
  good: "lightgreen",
};
export const Table = (props) => {
  return (
    <div className="table-div">
      <table className="table-data">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Shelf Number</th>
            <th>Vendor</th>
          </tr>
        </thead>
        {props.data.map((row, index) => (
          <tr
            style={row.prime === true ? { backgroundColor: "lightblue" } : {}}
          >
            <td>{index + 1}</td>
            <td>{row.productName}</td>
            <td>{row.category}</td>
            <td
              style={
                row.quantity > row.maxCapacity * 0.75
                  ? { backgroundColor: colorMap["good"] }
                  : row.quantity > row.maxCapacity * 0.25 &&
                    row.quantity < row.maxCapacity * 0.75
                  ? { backgroundColor: colorMap["ok"] }
                  : { backgroundColor: colorMap["less"] }
              }
            >
              {row.quantity}
            </td>
            <td>Rs. {row.pricePerUnit}</td>
            <td>{row.shelfNumber}</td>
            <td>
              {
                <a target="_blank" href={row.vendorLink}>
                  {row.vendorName}
                </a>
              }
            </td>
            <td>
              <img className="dustbin" src={dustbin} />
            </td>
            <td>
              <img className="dustbin" src={pencil} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
