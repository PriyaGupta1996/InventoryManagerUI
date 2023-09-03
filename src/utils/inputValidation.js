import { VALID_CHECK } from "../constants/validation";

export const inputValidation = (updateItem) => {
    const errorLogs = []
    for (const [key, value] of Object.entries(updateItem)) {
        if (VALID_CHECK[key]) {
            const isValid = VALID_CHECK[key]?.regex.test(value);
            if (!isValid) {
                errorLogs.push(VALID_CHECK[key]["errorStatement"])
            }
        }
    }
    return errorLogs;
}