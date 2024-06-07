import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/inertia-react';

const NavDropdownLink = ({ name, childrens }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="relative">
            <button
                className="text-white font-bold hover:text-gray-300 focus:outline-none focus:text-gray-300"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                {name}
            </button>
            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <div className="py-1">
                        {childrens.map((child, index) => (
                            <Link
                                key={index}
                                href={child.url}
                                className={classNames(
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default NavDropdownLink;
