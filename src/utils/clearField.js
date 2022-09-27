export const clearField = (fieldName, setData) => {
    setData((prevData) => ({ ...prevData, [fieldName]: '' }));
};