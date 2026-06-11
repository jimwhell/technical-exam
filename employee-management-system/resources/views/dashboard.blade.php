<x-app-layout>
    
    {{-- header:start --}}
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Employees
        </h2>
    </x-slot>
    {{-- header:end --}}


    {{-- employees-wrapper:start --}}
    <div class="py-6 ">
        <div class="max-w-7xl mx-auto px-4">
            <x-employees.list/>
            <x-employees.modal/>
        </div>

    </div>
    {{-- employees-wrapper:end --}}


    @vite(['resources/js/app.js'])
</x-app-layout>
