export const renderEmployeesList = (employees) => {
    const tableEl = document.getElementById("employeesTable");

    tableEl.innerHTML = employees
        .map(
            (employee) =>
                `
        <tr>
            <td class="border-2">
                ${employee.firstname}
            </td>

            <td class="border-2">
                ${employee.lastname}
            </td>

            <td class="border-2">
                ${employee.factory}
            </td>

            <td class="border-2">
                ${employee.email ?? ""}
            </td>

            <td class="border-2">
                ${employee.phone ?? ""}
            </td>

        </tr>
        `,
        )
        .join("");
};

export const renderEmptyState = () => {
    document.getElementById("employeesTable").innerHTML = `
        <tr>
            <td colspan="5" class="text-center py-16 text-base-content/50">
                No employees found.
            </td>
        </tr>
    `;
};

export const renderErrorState = (message) => {
    document.getElementById("employeesTable").innerHTML = `
        <tr>
            <td colspan="5" class="text-center py-16 text-base-content/50">
                ${message}
            </td>
        </tr>
    `;
};

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
