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

export const renderFactoriesDropdown = (factories) => {
    const select = document.getElementById("factories-dropdown");

    factories.forEach(({ id, factory_name }) => {
        select.innerHTML += `<option value="${id}">${factory_name}</option>`;
    });
};

const fieldErrorMessages = {
    firstname: "Please enter a valid first name.",
    lastname: "Please enter a valid last name.",
    factory_id: "Please assign a factory.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number.",
};

/**
 * Render form errors — inline per field for validation errors, general for server errors.
 *
 * @param {object} error - Error object from the API.
 */
export const renderFormError = (error) => {
    if (error.status === 422 && error.errors) {
        Object.keys(error.errors).forEach((field) => {
            const el = document.getElementById(`error-${field}`);
            if (el) {
                el.textContent =
                    fieldErrorMessages[field] ?? error.errors[field][0];
                el.classList.remove("hidden");
            }
        });
    } else {
        const el = document.getElementById("error-general");
        if (el) {
            el.textContent = "Something went wrong, please try again later.";
            el.classList.remove("hidden");
        }
    }
};

/**
 * Clear all form errors.
 */
export const clearFormError = () => {
    document.querySelectorAll("[id^='error-']").forEach((el) => {
        el.textContent = "";
        el.classList.add("hidden");
    });
};
