<?php

namespace App\Http\Requests\API\ServiceLog;

use Illuminate\Foundation\Http\FormRequest;

class UploadRequest extends FormRequest
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
        return [
            "type" => "required|in:receipt,attachments",
            "file" => "required_without:files|file|mimes:png,jpg",
            "files" => "required_without:file|array",
            "files.*" => "required|file|mimes:png,jpg",
        ];
    }
}
