/**
 * Fetch paginated employees from the API.
 *
 * @param {string} search - Search query to filter by first or last name.
 * @param {number} page - Page number to fetch.
 * @returns {Promise<object>} Paginated employees response.
 */
export const getEmployees = async (search = "", page = 1) => {
    const response = await fetch(
        `/api/employees?page=${page}&search=${search}`,
    );
    return response.json();
};
