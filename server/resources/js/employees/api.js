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

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};

export const getEmployee = async (id) => {
    const response = await fetch(`/api/employees/${id}`);

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};

export const createEmployee = async (payload) => {
    const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const { errors } = await response.json();
        throw { status: response.status, errors };
    }

    return response.json();
};

export const updateEmployee = async (id, payload) => {
    const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const { errors } = await response.json();
        throw { status: response.status, errors };
    }

    return response.json();
};

export const getFactoriesDropdown = async () => {
    const response = await fetch("/api/factories/dropdown");
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
};

export const deleteEmployee = async (id) => {
    const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};
