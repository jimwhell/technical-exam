export const getEmployees = async (search = "", page = 1) => {
    const response = await fetch(`/api/employees?page=${page}`);
    return response.json();
};
