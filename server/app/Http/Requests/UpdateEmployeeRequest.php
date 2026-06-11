<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'firstname' => ['sometimes', 'required', 'string', 'regex:/^[a-zA-Z\s\-]+$/', 'max:255'],
            'lastname' => ['sometimes', 'required', 'string', 'regex:/^[a-zA-Z\s\-]+$/', 'max:255'],
            'factory_id' => ['sometimes', 'required', 'exists:factories,id'],
            'email' => ['sometimes', 'nullable', 'email', 'max:255', Rule::unique('employees', 'email')->ignore($this->route('employee'))],
            'phone' => ['sometimes', 'nullable', 'regex:/^[0-9\+\-\(\)\s]+$/', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'firstname.regex' => 'First name must only contain letters, spaces, and hyphens.',
            'lastname.regex' => 'Last name must only contain letters, spaces, and hyphens.',
            'phone.regex' => 'Phone number must only contain digits, spaces, and the characters + - ( ).',
        ];
    }
}
