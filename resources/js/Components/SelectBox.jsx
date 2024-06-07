export default function SelectBox({ className = '', options, value, ...props }) {
    return (
        <select
            defaultValue={value}
            className={
                'border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-md shadow-sm ' +
                className
            }
            {...props}
        >
            {options.map((option, index) => (
                <option
                    key={index}
                    value={option.value}
                    defaultValue={option.value === value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    )
}
