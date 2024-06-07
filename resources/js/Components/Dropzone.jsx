import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ onDrop, ...props }) {
    const onDropAccepted = useCallback((acceptedFiles) => {
        onDrop(acceptedFiles);
    }, [onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropAccepted,
        accept: 'image/*',
        ...props
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer ${
                isDragActive ? 'bg-gray-100' : ''
            }`}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag 'n' drop {props.multiple ? 'some files' : 'file'} here, or click to select files</p>
            )}
        </div>
    )
}
