import { getEmployees } from "./api";
import {
    renderEmployeesList,
    renderEmptyState,
    renderErrorState,
    renderPagination,
} from "./ui";

let debounceTimer;

/**
 * Load employees from the API and render the appropriate state.
 *
 * @param {string} search - Search query to filter employees.
 * @param {number} page - Page number to fetch.
 */
const loadEmployees = async (search = "", page = 1) => {
    setLoading(true);

    try {
        const response = await getEmployees(search, page);

        if (response.data.length === 0) {
            renderEmptyState();
        } else {
            renderEmployeesList(response.data);
            renderPagination(response.meta);
            attachPaginationListeners(search);
        }
    } catch {
        renderErrorState("Failed to fetch employees, please try again.");
    }

    setLoading(false);
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

document.getElementById("search").addEventListener("input", onSearch);
loadEmployees();
