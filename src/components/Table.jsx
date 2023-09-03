import React, { useState } from "react";
import dustbin from "../images/dustbin.png";
import pencil from "../images/pencil.png";
import { deleteProduct, updateProduct } from "../api/product";
import { colorMap } from "../constants/colorCode";
import { PopUpAlert } from "./PopUpAlert";

export const Table = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setproductToDelete] = useState({});
  const [editMode, setEditMode] = useState({});
  const [updateItem, setUpdateItem] = useState();
  const [apiInfo, setApiInfo] = useState({});

  const handleShowConfirmation = (product) => {
    setShowConfirmation(true);
    setproductToDelete(product);
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    props.getFilteredProductData();
    setShowConfirmation(false);
  };

  const handleEditClick = (row) => {
    setEditMode({ [row.productId]: true });
    setUpdateItem(row);
  };
  const handleSaveChanges = async () => {
    const response = await updateProduct(updateItem);
    console.log("++++", response);
    if (response.error) {
      setApiInfo({ info: response.error.data, status: "danger" });
    } else {
      setApiInfo({ info: response.data.message, status: "success" });
      await props.getFilteredProductData();
      setEditMode({ [updateItem.productId]: false });
    }
  };
  const handleInputChange = (fieldName, value) => {
    console.log("updateItem", updateItem);
    let currentItem = JSON.parse(JSON.stringify(updateItem));
    currentItem[fieldName] = value;
    console.log("currentItem", currentItem);
    setUpdateItem(currentItem);
  };

  const handleSortByTitle = (title) => {
    props.setOrderBy(title);
    props.setSortOrder(!props.sortOrder);
  };

  return (
    <div className="table-div">
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>
            Are you sure you want to delete : {productToDelete.productName}?
          </p>
          <button
            onClick={() => handleDeleteProduct(productToDelete.productId)}
          >
            Confirm
          </button>
          <button onClick={() => setShowConfirmation(false)}>Cancel</button>
        </div>
      )}

      {Object.keys(apiInfo).length > 0 && (
        <PopUpAlert value={apiInfo} onClose={setApiInfo} />
      )}

      <table className="table-data">
        <thead>
          <tr>
            <th onClick={() => handleSortByTitle("name")}>Product Name</th>
            <th onClick={() => handleSortByTitle("category")}>Category</th>
            <th>Max Capacity</th>
            <th onClick={() => handleSortByTitle("shelf.quantity")}>
              Quantity
            </th>
            <th onClick={() => handleSortByTitle("pricePerUnit")}>
              Price Per Unit
            </th>
            <th onClick={() => handleSortByTitle("shelf.shelfNumber")}>
              Shelf Number
            </th>
            <th onClick={() => handleSortByTitle("vendor.name")}>Vendor</th>
          </tr>
        </thead>
        {props.data.map((row, index) => (
          <tr
            style={row.prime === true ? { backgroundColor: "lightblue" } : {}}
          >
            <td>
              {editMode[row.productId] ? (
                <input
                  type="text"
                  value={updateItem.productName}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                />
              ) : (
                row.productName
              )}
            </td>
            <td>
              {editMode[row.productId] ? (
                <input
                  type="text"
                  value={updateItem.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                />
              ) : (
                row.category
              )}
            </td>
            <td>{row.maxCapacity}</td>
            <td
              style={
                row.quantity > row.maxCapacity * 0.75
                  ? { backgroundColor: colorMap.GOOD }
                  : row.quantity > row.maxCapacity * 0.25 &&
                    row.quantity < row.maxCapacity * 0.75
                  ? { backgroundColor: colorMap.OK }
                  : { backgroundColor: colorMap.ALERT }
              }
            >
              {editMode[row.productId] ? (
                <input
                  type="text"
                  value={updateItem.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                />
              ) : (
                row.quantity
              )}
            </td>
            <td>
              Rs.{" "}
              {editMode[row.productId] ? (
                <input
                  type="text"
                  value={updateItem.pricePerUnit}
                  onChange={(e) =>
                    handleInputChange("pricePerUnit", e.target.value)
                  }
                />
              ) : (
                row.pricePerUnit
              )}
            </td>
            <td>
              {editMode[row.productId] ? (
                <select
                  className="filter-dropdown"
                  onChange={(e) =>
                    handleInputChange("shelfNumber", e.target.value)
                  }
                >
                  {props.shelves.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              ) : (
                row.shelfNumber
              )}
            </td>
            <td>
              {editMode[row.productId] ? (
                <select
                  className="filter-dropdown"
                  onChange={(e) =>
                    handleInputChange("vendor", JSON.parse(e.target.value))
                  }
                >
                  {props.vendor.map((item) => (
                    <option value={JSON.stringify(item)}>{item.name}</option>
                  ))}
                </select>
              ) : (
                <a target="_blank" rel="noreferrer" href={row.vendor.link}>
                  {row.vendor.name}
                </a>
              )}
            </td>
            <td>
              <img
                className="table-icon"
                src={dustbin}
                alt="delete"
                onClick={() => handleShowConfirmation(row)}
              />
            </td>
            <td>
              {!editMode[row.productId] && (
                <img
                  className="table-icon"
                  alt="edit"
                  src={pencil}
                  onClick={() => handleEditClick(row)}
                />
              )}
              {editMode[row.productId] && (
                <button onClick={() => handleSaveChanges()}>Save</button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
