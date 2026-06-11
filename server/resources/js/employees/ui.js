import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Swal from "sweetalert2";

/**
 * Render the list of employees into the table body, along with their respective action buttons.
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
            <td class="border-2">
                <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost edit-btn" data-id="${employee.id}">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" />
                        </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost delete-btn" data-id="${employee.id}">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z" />
                        </svg>
                    </button>
                </div>
            </td>
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
            <td colspan="6" class="p-0">
                <div class="flex flex-col items-center justify-center min-h-96 text-base-content/50">
                    <span class="text-lg font-medium">No employees found</span>
                    <span class="text-sm">Try adjusting your search.</span>
                </div>
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
            <td colspan="6" class="p-0">
                <div class="flex flex-col items-center justify-center min-h-96 text-error gap-2">

                    <!-- error-svg:start -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-6 h-6"
                    >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor"
                            d="M12.713 16.713Q13 16.425 13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17t.713-.288M11 13h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                        />
                    </svg>
                    <!-- error-svg:end -->

                    <!-- message:start -->
                    <span class="text-base font-medium">
                        ${message}
                    </span>
                    <!-- message:end -->
                </div>
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
    const paginationEl = document.getElementById("pagination");

    if (!meta) {
        paginationEl.innerHTML = "";
        return;
    }

    const { current_page, last_page } = meta;
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

/**
 * Render form errors — inline per field for validation errors, general for server errors.
 *
 * @param {object} error - Error object from the API.
 */
export const renderFormError = (error) => {
    if (error.status === 422 && error.errors) {
        Object.keys(error.errors).forEach((field) => {
            const el = document.getElementById(`error-${field}`);
            if (!el) return;

            el.textContent = error.errors[field][0];
            el.classList.remove("hidden");
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

export const setSubmitLoading = (isLoading) => {
    document.getElementById("submitText").classList.toggle("hidden", isLoading);
    document
        .getElementById("submitSpinner")
        .classList.toggle("hidden", !isLoading);
    document.getElementById("submitBtn").disabled = isLoading;
};

export const setModalLoading = (isLoading) => {
    const overlay = document.getElementById("modalLoadingOverlay");

    overlay.classList.toggle("hidden", !isLoading);
};

export const setDeleteLoading = (id, isLoading) => {
    const btn = document.querySelector(`.delete-btn[data-id="${id}"]`);
    if (!btn) return;

    btn.disabled = isLoading;
    btn.innerHTML = isLoading
        ? `<span class="loading loading-spinner loading-sm"></span>`
        : `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor" d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z" />
           </svg>`;
};

export const showSuccessToast = (message) => {
    iziToast.success({
        message,
        position: "bottomRight",
        timeout: 2000,
    });
};

export const showErrorToast = (message) => {
    iziToast.error({
        message,
        position: "bottomRight",
        timeout: 2000,
    });
};

export const confirmAction = async (title, text) => {
    const { isConfirmed } = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
    });

    return isConfirmed;
};
