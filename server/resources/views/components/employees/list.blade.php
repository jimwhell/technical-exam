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

          
          {{-- create-modal:start --}}
          {{-- <dialog id="createModal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">Add Employee</h3>
                <div class="flex flex-col gap-3">
                    <input id="firstname" type="text" placeholder="First name" class="input input-bordered" />
                    <input id="lastname" type="text" placeholder="Last name" class="input input-bordered" />
                    <input id="factory" type="text" placeholder="Factory" class="input input-bordered" />
                    <input id="email" type="email" placeholder="Email" class="input input-bordered" />
                    <input id="phone" type="text" placeholder="Phone" class="input input-bordered" />
                </div>
        <div class="modal-action">
            <button id="cancelBtn" class="btn">Cancel</button>
            <button id="submitBtn" class="btn btn-primary">Save</button>
        </div>
    </div>
        </dialog> --}}
        {{-- create-modal:end --}}


</div>
{{-- list:end --}}
