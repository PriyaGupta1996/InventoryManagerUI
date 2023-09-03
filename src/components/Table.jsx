import React, { useState } from "react";
import dustbin from "../images/dustbin.png";
import pencil from "../images/pencil.png";
import { deleteProduct, updateProduct } from "../api/product";
import { colorMap } from "../constants/colorCode";
import { PopUpAlert } from "./PopUpAlert";
import { PopUpModal } from "./PopUpModal";
import { inputValidation } from "../utils/inputValidation";

export const Table = (props) => {
  const {
    orderBy,
    sortOrder,
    setSortOrder,
    setOrderBy,
    data,
    shelves,
    vendor,
    getFilteredProductData,
  } = props;

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState({});
  const [editMode, setEditMode] = useState({});
  const [updateItem, setUpdateItem] = useState({});
  const [alertInfo, setAlertInfo] = useState({});

  const handleShowConfirmation = (product) => {
    setShowConfirmation(true);
    setProductToDelete(product);
  };

  const handleDeleteProduct = async (productId) => {
    const response = await deleteProduct(productId);
    if (response.error) {
      setAlertInfo({ info: response.error.data, status: "danger" });
    } else {
      setAlertInfo({ info: response.data.message, status: "success" });
      getFilteredProductData();
    }
    setShowConfirmation(false);
  };

  const handleEditClick = (row) => {
    setEditMode({ [row.productId]: true });
    setUpdateItem(row);
  };

  const handleSaveChanges = async () => {
    const errorLogs = inputValidation(updateItem);
    if (errorLogs.length > 0) {
      setAlertInfo({ info: errorLogs, status: "danger" });
      setEditMode({ [updateItem.productId]: false });
      return;
    }
    const response = await updateProduct(updateItem);
    if (response.error) {
      setAlertInfo({ info: response.error.data, status: "danger" });
    } else {
      setAlertInfo({ info: response.data.message, status: "success" });
      await getFilteredProductData();
      setEditMode({ [updateItem.productId]: false });
    }
  };

  const handleInputChange = (fieldName, value) => {
    const currentItem = { ...updateItem };
    currentItem[fieldName] = value;
    setUpdateItem(currentItem);
  };

  const columnLabels = {
    name: "Product Name",
    category: "Category",
    maxCapacity: "Max capacity",
    "shelf.quantity": "Quantity",
    pricePerUnit: "Price Per Unit",
    "shelf.shelfNumber": "Shelf Number",
    "vendor.name": "Vendor",
  };

  const handleSort = (column) => {
    if (column !== "maxCapacity") {
      setSortOrder(sortOrder === "asc" ? "dsc" : "asc");
      setOrderBy(column);
    }
  };

  return (
    <div className="table-div">
      {showConfirmation && (
        <PopUpModal
          type="delete"
          product={productToDelete}
          show={showConfirmation}
          setShow={setShowConfirmation}
          onConfirm={handleDeleteProduct}
        />
      )}

      {Object.keys(alertInfo).length > 0 && (
        <PopUpAlert value={alertInfo} onClose={setAlertInfo} />
      )}

      <table className="table-data">
        <thead>
          <tr>
            {Object.keys(columnLabels).map((column) => (
              <th key={column} onClick={() => handleSort(column)}>
                {columnLabels[column]}
                {orderBy === column && sortOrder === "asc" && <span>⬆️ </span>}
                {orderBy === column && sortOrder === "dsc" && <span>⬇️</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.productId}
              style={row.prime ? { backgroundColor: "lightblue" } : {}}
            >
              <td>
                {editMode[row.productId] ? (
                  <input
                    type="text"
                    maxLength="100"
                    value={updateItem.productName}
                    onChange={(e) =>
                      handleInputChange("productName", e.target.value.trim())
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
                    maxLength="100"
                    value={updateItem.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value.trim())
                    }
                  />
                ) : (
                  row.category
                )}
              </td>
              <td>{row.maxCapacity}</td>
              <td
                style={{
                  backgroundColor:
                    row.quantity > row.maxCapacity * 0.75
                      ? colorMap.GOOD
                      : row.quantity > row.maxCapacity * 0.25 &&
                        row.quantity < row.maxCapacity * 0.75
                      ? colorMap.OK
                      : colorMap.ALERT,
                }}
              >
                {editMode[row.productId] ? (
                  <input
                    type="number"
                    step="1"
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
                    type="number"
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
                    value={updateItem.shelfNumber}
                    onChange={(e) =>
                      handleInputChange("shelfNumber", e.target.value)
                    }
                  >
                    {shelves.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
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
                    {vendor.map((item) => (
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
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSaveChanges()}
                  >
                    Save
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
