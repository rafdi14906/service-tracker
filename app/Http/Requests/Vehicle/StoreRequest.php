<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $requiredString = "required|string|max:255";
        $nullableString = "nullable|string|max:255";

        return [
            "category" => $requiredString,
            "plate_number" => "$requiredString|unique:vehicles,plate_number",
            "brand" => $requiredString,
            "seri" => $requiredString,
            "type" => $nullableString,
            "cylinder_capacity" => $requiredString,
            "year" => $requiredString,
            "fuel_type" => $requiredString,
            "color" => $nullableString,
            "model" => $requiredString,
            "chassis_number" => $nullableString,
            "engine_number" => $nullableString,
        ];
    }
}
