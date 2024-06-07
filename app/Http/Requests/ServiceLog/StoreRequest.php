<?php

namespace App\Http\Requests\ServiceLog;

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
        $requiredNumeric = "required|numeric";
        $nullableString = "nullable|string|max:255";

        return [
            "vehicle_id" => "required|exists:vehicles,id",
            "date" => "required|date",
            "transaction_number" => $nullableString,
            "workshop_name" => $requiredString,
            "workshop_address" => $requiredString,
            "workshop_phone" => $nullableString,
            "mechanic" => $nullableString,
            "grand_total_cost" => $requiredNumeric,
            "total_service_cost" => $requiredNumeric,
            "total_parts_cost" => $requiredNumeric,
            "note" => $nullableString,
            "receipt_path" => $nullableString,
            "attachments" => "nullable|array",
            "attachments.*" => "required",
            "details" => "required|array",
            "details.*.service_name" => $requiredString,
            "details.*.service_cost" => $requiredNumeric,
            "parts" => "nullable|array",
            "parts.*.part_cost" => $requiredNumeric,
            "parts.*.part_name" => $requiredString,
            "parts.*.part_quantity" => $requiredNumeric,
            "parts.*.part_cost" => $requiredNumeric,
            "parts.*.subtotal_part_cost" => $requiredNumeric,
            "parts.*.guarantee_until" => "nullable|date",
        ];
    }
}
