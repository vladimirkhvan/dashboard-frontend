export const handleChange = (e, setData) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
};
