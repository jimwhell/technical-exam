import { getEmployees } from "./api";
import {
    renderEmployeesList,
    renderEmptyState,
    renderErrorState,
    renderPagination,
} from "./ui";

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

const attachPaginationListeners = (search) => {
    document.querySelectorAll("#pagination .join-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            loadEmployees(search, parseInt(btn.dataset.page));
        });
    });
};

const setLoading = (isLoading) => {
    document.getElementById("spinner").classList.toggle("hidden", !isLoading);
};

loadEmployees();
