import { Link } from "@inertiajs/react";
import { Fragment } from "react";

export default function Breadcrumbs({ uriPath, separator = "/" }) {
    return (
        <nav className="flex mx-auto sm:px-6 lg:px-8 pt-5">
            <ol className="flex items-center">
                {uriPath.full.map((uri, index) => {
                    const isLast = index === uriPath.full.length - 1,
                        active = uriPath.current === uri,
                        url = index === 0  ? `${location.origin}/${uriPath.full[0].toLowerCase()}` : uri.toLowerCase()

                    return (
                        <Fragment key={index}>
                            <li>
                                <div>
                                    <Link
                                        href={url}
                                        className="px-2 py-1 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                                        disabled={active}
                                    >
                                        {uri}
                                    </Link>
                                </div>
                            </li>
                            {!isLast && (
                                <li>
                                    <div>{separator}</div>
                                </li>
                            )}
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};
