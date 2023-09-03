export const VALID_CHECK = {
    productName: {
        required: true,
        regex: /^[a-zA-Z0-9\s]{1,100}$/,
        errorStatement:
            "Product name is a required alphanumeric field with length upto 100.",
    },
    categoryName: {
        required: true,
        regex: /^[a-zA-Z0-9\s]{1,100}$/,
        errorStatement:
            "Category is a required alphanumeric field with length upto 100.",
    },
    quantity: {
        required: true,
        regex: /^[1-9]\d*$/,
        errorStatement: "Quantity is a required positive numeric field.",
    },
    pricePerUnit: {
        required: true,
        regex: /^\d+(\.\d{2})?$/,
        errorStatement:
            "Price per unit is a required positive numeric field with 2 decimal places only.",
    },
    minPrice: {
        required: false,
        regex: /^\d+(\.\d{2})?$/,
        errorStatement:
            "Minimum Price per unit requires a positive numeric field with 2 decimal places only.",
    },
    maxPrice: {
        required: false,
        regex: /^\d+(\.\d{2})?$/,
        errorStatement:
            "Maximum Price per unit requires a positive numeric field with 2 decimal places only.",
    },
};
