import { getEmployees } from "./api";
import { renderEmployeesList, renderEmptyState, renderErrorState } from "./ui";

const loadEmployees = async (search = "") => {
    setLoading(true);

    try {
        const response = await getEmployees(search);

        console.log("Response: ", response.data.length);

        if (response.data.length === 0) {
            renderEmptyState();
        } else {
            renderEmployeesList(response.data);
        }
    } catch {
        renderErrorState("Failed to fetch employees.");
    }

    setLoading(false);
};

const setLoading = (isLoading) => {
    document.getElementById("spinner").classList.toggle("hidden", !isLoading);
};

loadEmployees();
