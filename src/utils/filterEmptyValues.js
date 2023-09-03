export function filterEmptyValues(inputMap) {
    const filteredMap = {};

    for (const key in inputMap) {
        const value = inputMap[key];
        if (value !== "" && value !== null && value !== undefined) {
            filteredMap[key] = value;
        }
    }

    return filteredMap;
}


