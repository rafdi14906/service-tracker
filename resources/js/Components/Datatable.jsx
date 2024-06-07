import DatatableHeader from "./DatatableHeader";
import Pagination from "./Pagination";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./Tooltip";
import { router } from "@inertiajs/react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useState } from "react";

export default function Datatable({ header, data, links, from, to, total, per_page, search }) {
    const [swalConfirm, setSwalConfirm] = useState(false),
        [swalSuccess, setSwalSuccess] = useState(false);

    return (
        <div className="py-6">
            <DatatableHeader
                per_page={per_page}
                search={search}
            />
            <table className="border-b-2 min-w-full">
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th key={index} className="p-1 text-center text-sm font-bold text-gray-900">{item.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index} className="border-b">
                            {header.map((headerItem, headerIndex) => (
                                <td key={headerIndex} className="p-1 text-center text-sm text-gray-900">
                                    {headerItem.key === 'action' ? (
                                        <div className="flex justify-center items-center gap-1">
                                            <Tooltip text="Edit">
                                                <Button
                                                    type="button"
                                                    category="warning"
                                                    className="px-1 py-0.5 text-xs font-light"
                                                    onClick={() => {
                                                        router.get(`${location.pathname}/${item.id}/edit`)
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="fa-xs"
                                                    />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip text="Delete">
                                                <Button
                                                    type="button"
                                                    category="danger"
                                                    className="px-1 py-0.5 text-xs font-light"
                                                    onClick={() => {
                                                        setSwalConfirm(true)
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="fa-xs"
                                                    />
                                                </Button>
                                            </Tooltip>
                                            <SweetAlert
                                                show={swalConfirm}
                                                title="Are you sure?"
                                                warning
                                                showCancel
                                                confirmBtnText="Yes, delete it!"
                                                confirmBtnCssClass="bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white px-4 py-2 rounded-md"
                                                cancelBtnText="No, cancel!"
                                                cancelBtnCssClass="bg-gray-600 hover:bg-gray-700 focus:ring-red-500 text-white px-4 py-2 rounded-md"
                                                focusCancelBtn
                                                onConfirm={() => {
                                                    router.delete(`${location.pathname}/${item.id}`)
                                                    setSwalConfirm(false)
                                                    setSwalSuccess(true)
                                                }}
                                                onCancel={() => {
                                                    setSwalConfirm(false)
                                                }}
                                            >
                                                You will not be able to recover this imaginary file!
                                            </SweetAlert>
                                            <SweetAlert show={swalSuccess} success title="Good job!"
                                                onConfirm={() => {setSwalSuccess(false)}}
                                                onCancel={() => {setSwalSuccess(false)}}
                                                confirmBtnCssClass="bg-gray-600 hover:bg-gray-700 focus:ring-red-500 text-white px-4 py-2 rounded-md"
                                            >
                                                You clicked the button!
                                            </SweetAlert>
                                        </div>
                                    ) : (
                                        item[headerItem.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {!data.length && (
                        <tr>
                            <td colSpan={header.length} className="p-1 text-center text-sm text-gray-900">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                links={links}
                from={from}
                to={to}
                total={total}
            />
        </div>
    )
}
