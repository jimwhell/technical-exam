import {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    getFactoriesDropdown,
    deleteEmployee,
} from "./api";
import {
    renderEmployeesList,
    renderEmptyState,
    renderErrorState,
    renderPagination,
    renderFactoriesDropdown,
    renderFormError,
    clearFormError,
    setSubmitLoading,
    showSuccessToast,
    showErrorToast,
    setModalLoading,
    setDeleteLoading,
    confirmAction,
} from "./ui";

let debounceTimer;
let currentEmployeeId = null;
let currentPage = 1;
let currentSearch = "";

const modal = document.getElementById("employeeModal");

/**
 * Load employees from the API and render the appropriate state.
 *
 * @param {string} search - Search query to filter employees.
 * @param {number} page - Page number to fetch.
 */
const loadEmployees = async (search = "", page = 1) => {
    currentPage = page;
    currentSearch = search;
    setLoading(true);

    try {
        const response = await getEmployees(search, page);

        if (response.data.length === 0) {
            renderEmptyState();
        } else {
            renderEmployeesList(response.data);
        }

        renderPagination(response.data.length === 0 ? null : response.meta);
        attachPaginationListeners(search);
    } catch {
        renderErrorState("Failed to fetch employees, please try again later.");
    }

    setLoading(false);
};

/**
 * Open the modal in create mode.
 */
const openCreateModal = async () => {
    currentEmployeeId = null;
    document.getElementById("modalTitle").textContent = "Add Employee";
    document.getElementById("employeeForm").reset();
    clearFormError();
    modal.showModal();
    await populateFactoriesDropdown();
};

/**
 * Open the modal in edit mode and populate fields.
 *
 * @param {number} id - Employee ID to edit.
 */
const openEditModal = async (id) => {
    currentEmployeeId = id;
    document.getElementById("modalTitle").textContent = "Edit Employee";
    clearFormError();
    setModalLoading(true);
    modal.showModal();
    try {
        const { data } = await getEmployee(id);

        document.getElementById("firstname").value = data.firstname;
        document.getElementById("lastname").value = data.lastname;
        document.getElementById("email").value = data.email ?? "";
        document.getElementById("phone").value = data.phone ?? "";

        await populateFactoriesDropdown();
        document.getElementById("factories-dropdown").value = data.factory_id;
    } catch {
        closeModal();
        showErrorToast("Failed to fetch employee details. Please try again.");
    } finally {
        setModalLoading(false);
    }
};

const closeModal = () => {
    modal.close();
    document.getElementById("employeeForm").reset();
    clearFormError();
};

/**
 * Handle employee form submission for both create and update.
 *
 * @param {Event} event - Submit event.
 */
const handleSubmitEmployee = async (event) => {
    event.preventDefault();
    clearFormError();

    const payload = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        factory_id: document.getElementById("factories-dropdown").value,
    };

    setSubmitLoading(true);

    try {
        if (currentEmployeeId) {
            await updateEmployee(currentEmployeeId, payload);
            showSuccessToast("Employee updated successfully.");
        } else {
            await createEmployee(payload);
            showSuccessToast("Employee created successfully.");
        }

        closeModal();
        loadEmployees(currentSearch, currentPage);
    } catch (error) {
        renderFormError(error);
    } finally {
        setSubmitLoading(false);
    }
};

const handleDeleteEmployee = async (id) => {
    const confirmed = await confirmAction(
        "Delete Employee?",
        "This action cannot be undone.",
    );

    if (!confirmed) return;

    setDeleteLoading(id, true);

    try {
        await deleteEmployee(id);
        showSuccessToast("Employee deleted successfully.");
        loadEmployees(currentSearch, currentPage);
    } catch {
        setDeleteLoading(id, false);
        showErrorToast("Failed to delete employee. Please try again.");
    }
};

/**
 * Attach click listeners to pagination buttons.
 *
 * @param {string} search - Current search query to preserve across page changes.
 */
const attachPaginationListeners = (search) => {
    document.querySelectorAll("#pagination .join-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            loadEmployees(search, parseInt(btn.dataset.page));
        });
    });
};

/**
 * Toggle the loading spinner visibility.
 *
 * @param {boolean} isLoading - Whether the loading state is active.
 */
const setLoading = (isLoading) => {
    document.getElementById("spinner").classList.toggle("hidden", !isLoading);
};

/**
 * Handle search input with debounce to limit API calls.
 *
 * @param {Event} e - Input event from the search field.
 */
const onSearch = (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => loadEmployees(e.target.value, 1), 300);
};

/**
 * Populate the factories dropdown.
 */
const populateFactoriesDropdown = async () => {
    const { data } = await getFactoriesDropdown();
    renderFactoriesDropdown(data);
};

modal.addEventListener("close", () => {
    document.getElementById("employeeForm").reset();
    clearFormError();
});

document.getElementById("cancelBtn").addEventListener("click", closeModal);

document
    .getElementById("addEmployee")
    .addEventListener("click", openCreateModal);

document
    .getElementById("employeeForm")
    .addEventListener("submit", handleSubmitEmployee);

document.getElementById("employeesTable").addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");

    if (editBtn) openEditModal(editBtn.dataset.id);
    if (deleteBtn) handleDeleteEmployee(deleteBtn.dataset.id);
});

document.getElementById("search").addEventListener("input", onSearch);

loadEmployees();
