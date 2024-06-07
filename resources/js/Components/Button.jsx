export default function Button({ category, className = '', disabled, children, ...props }) {
    const buttonStyle = {
        success: 'bg-green-600 hover:bg-green-700 active:bg-green-700 focus:ring-green-500 text-white',
        warning: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-700 focus:ring-yellow-500 text-white',
        danger: 'bg-red-600 hover:bg-red-700 active:bg-red-700 focus:ring-red-500 text-white',
        primary: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-700 focus:ring-red-500 text-white',
        secondary: 'bg-gray-300 hover:bg-gray-700 active:bg-gray-700 focus:ring-red-500 text-gray-700',
    }
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ${buttonStyle[category]} ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
