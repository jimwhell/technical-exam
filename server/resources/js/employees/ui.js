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
