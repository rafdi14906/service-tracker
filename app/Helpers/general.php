<?php

/**
 * Get uri path
 *
 */
if (!function_exists('getUriPath')) {
    function getUriPath(): array
    {
        $fullPath = explode('/', ucwords(request()->path(), '/'));
        $currentPath = $fullPath[count($fullPath) - 1];

        return [
            'full' => $fullPath,
            'current' => $currentPath,
        ];
    }
}
