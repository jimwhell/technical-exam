const getCsrfToken = () =>
    document.querySelector('meta[name="csrf-token"]').getAttribute("content");

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRF-TOKEN": getCsrfToken(),
};

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
        { credentials: "include" },
    );

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};

/**
 * Fetch a single employee by ID.
 *
 * @param {number} id - Employee ID.
 * @returns {Promise<object>} Employee record.
 */
export const getEmployee = async (id) => {
    const response = await fetch(`/api/employees/${id}`, {
        credentials: "include",
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};

/**
 * Create a new employee.
 * Throws with validation errors if the server returns 422.
 *
 * @param {object} payload - Employee fields (firstname, lastname, email, phone, factory_id).
 * @returns {Promise<object>} Newly created employee.
 */
export const createEmployee = async (payload) => {
    const response = await fetch("/api/employees", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const body = await response.json();
        throw { status: response.status, errors: body.errors ?? null };
    }

    return response.json();
};

/**
 * Update an existing employee by ID.
 * Throws with validation errors if the server returns 422.
 *
 * @param {number} id - Employee ID to update.
 * @param {object} payload - Fields to update.
 * @returns {Promise<object>} Updated employee.
 */
export const updateEmployee = async (id, payload) => {
    const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const { errors } = await response.json();
        throw { status: response.status, errors };
    }

    return response.json();
};

/**
 * Fetch the list of factories formatted for a dropdown.
 *
 * @returns {Promise<object[]>} Array of factory options (id + factory_name).
 */
export const getFactoriesDropdown = async () => {
    const response = await fetch("/api/factories/dropdown", {
        credentials: "include",
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};

/**
 * Delete an employee by ID.
 *
 * @param {number} id - Employee ID to delete.
 * @returns {Promise<object>} Deletion confirmation response.
 */
export const deleteEmployee = async (id) => {
    const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
        headers,
        credentials: "include",
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
};
