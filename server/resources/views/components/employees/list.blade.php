{{-- list:start --}}
<div>


    <div class="flex justify-between mb-4">

        {{-- searchbar:start --}}
        <input 
        id="search"        
        type="text"
        placeholder="Search employee"
        class="border rounded px-4 py-2 text-black "
        >
        {{-- searchbar:end --}}


        {{-- create-employee-btn:start --}}
        <button
        id="addEmployee"
        type="button"
        class="px-4 py-2 rounded flex items-center gap-2 text-black"
        >
        <span>Add employee</span>
        <svg 
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z" />
        </svg>

        </button>
        {{-- create-employee-btn:end --}}
   </div>           

           {{-- table:start --}}
            <div class="relative overflow-x-auto rounded-box border border-base-content/5 bg-base-100 min-h-96">
                
                {{-- spinner overlay:start --}}
                <div id="spinner" class="absolute inset-0 flex items-center justify-center bg-base-100/80 z-10">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>
                {{-- spinner overlay:end --}}

                <table class="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Factory</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="employeesTable"></tbody>
                </table>
            </div>
          {{-- table:end --}}

          {{-- pagination:start --}}
          <div id="pagination" class="join flex justify-center mt-4">
            
          </div>
          {{-- pagination:end --}}

          
       


</div>
{{-- list:end --}}

{{-- toast:start --}}
        <div
        id="toast"
        class="toast toast-bottom toast-end hidden opacity-0 pointer-events-none"
    >
    <div class="alert alert-success pointer-events-auto">
        <span id="toastMessage"></span>
    </div>
</div>
{{-- toast:end --}}
