{{-- modal:start --}}
<dialog id="employeeModal" class="modal">
    <div class="modal-box">

        <h3 class="text-lg font-bold mb-4">Add Employee</h3>

        <form id="employeeForm" class="flex flex-col gap-7 px-2 py-3">

            <div class="flex flex-col gap-1">
                <input id="firstname" type="text" placeholder="First Name" class="input input-bordered w-full" required />
                <span id="error-firstname" class="hidden text-error text-sm"></span>
            </div>

            <div class="flex flex-col gap-1">
                <input id="lastname" type="text" placeholder="Last Name" class="input input-bordered w-full" required />
                <span id="error-lastname" class="hidden text-error text-sm"></span>
            </div>

            <div class="flex flex-col gap-1">
                <input id="email" type="email" placeholder="Email" class="input input-bordered w-full" />
                <span id="error-email" class="hidden text-error text-sm"></span>
            </div>

            <div class="flex flex-col gap-1">
                <input id="phone" type="text" placeholder="Phone" class="input input-bordered w-full" />
                <span id="error-phone" class="hidden text-error text-sm"></span>
            </div>

            {{-- factory-dropdown:start --}}
            <div class="flex flex-col gap-1">
                <select class="w-full select select-bordered" id="factories-dropdown" required>
                    <option value="" disabled selected>Assign factory</option>
                </select>
                <span id="error-factory_id" class="hidden text-error text-sm"></span>
            </div>
            {{-- factory-dropdown:end --}}

            {{-- general-error:start --}}
            <span id="error-general" class="hidden text-error text-sm"></span>
            {{-- general-error:end --}}

            {{-- actions:start --}}
            <div class="modal-action">
                <button type="button" id="cancelBtn" class="btn">Cancel</button>
            <button type="submit" id="submitBtn" class="btn btn-primary">
                <span id="submitText">Save</span>
                <span id="submitSpinner" class="loading loading-spinner loading-sm hidden"></span>
            </button>
            </div>
            {{-- actions:end --}}

        </form>

    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
{{-- modal:end --}}