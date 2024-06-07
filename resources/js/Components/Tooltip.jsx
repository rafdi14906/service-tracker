export default function Tooltip({ children, text  }) {
    return (
        <div className="relative group">
            {children}
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                {text}
                <svg className="absolute text-gray-700 h-2 w-full left-0 top-full" viewBox="0 0 255 255">
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                </svg>
            </div>
        </div>
    )
}
