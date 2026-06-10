/**
 * Render the list of employees into the table body.
 *
 * @param {Array<object>} employees - Array of employee objects to render.
 */
export const renderEmployeesList = (employees) => {
    const tableEl = document.getElementById("employeesTable");

    tableEl.innerHTML = employees
        .map(
            (employee) => `
        <tr>
            <td class="border-2">${employee.firstname}</td>
            <td class="border-2">${employee.lastname}</td>
            <td class="border-2">${employee.factory}</td>
            <td class="border-2">${employee.email ?? ""}</td>
            <td class="border-2">${employee.phone ?? ""}</td>
        </tr>
        `,
        )
        .join("");
};

/**
 * Render the empty state into the table body when no employees are found.
 */
export const renderEmptyState = () => {
    document.getElementById("employeesTable").innerHTML = `
        <tr>
            <td colspan="5" class="text-center py-16 text-base-content/50">
                No employees found.
            </td>
        </tr>
    `;
};

/**
 * Render the error state into the table body with a given message.
 *
 * @param {string} message - Error message to display.
 */
export const renderErrorState = (message) => {
    document.getElementById("employeesTable").innerHTML = `
        <tr>
            <td colspan="5" class="text-center py-16 text-base-content/50">
                ${message}
            </td>
        </tr>
    `;
};

/**
 * Render pagination buttons based on the current page meta.
 *
 * @param {object} meta - Pagination meta from the API response.
 * @param {number} meta.current_page - The current active page.
 * @param {number} meta.last_page - The total number of pages.
 */
export const renderPagination = (meta) => {
    const { current_page, last_page } = meta;
    const paginationEl = document.getElementById("pagination");
    let buttons = "";

    for (let page = 1; page <= last_page; page++) {
        const isActive = page === current_page ? "btn-active" : "";
        buttons += `<button class="join-item btn ${isActive} p-4 text-black" data-page="${page}">${page}</button>`;
    }

    paginationEl.innerHTML = buttons;
};
