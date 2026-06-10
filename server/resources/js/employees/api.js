export const getEmployees = async (search = "") => {
    const response = await fetch(`/api/employees`);
    return response.json();
};
