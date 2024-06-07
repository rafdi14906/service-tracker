import InputLabel from '@/Components/InputLabel'
import SelectBox from '@/Components/SelectBox'
import AppLayout from '@/Layouts/AppLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import TextInput from '@/Components/TextInput'
import { Transition } from '@headlessui/react'
import Alert from '@/Components/Alert'
import { useState } from 'react'
import Button from '@/Components/Button'
import Tooltip from '@/Components/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons'
import SweetAlert from 'react-bootstrap-sweetalert'
import Dropzone from '@/Components/Dropzone'

export default function Create({ auth, userSess, uriPath }) {
    const serviceLog = usePage().props.serviceLog,
        vehicles = usePage().props.vehicles

    const [alert, setAlert] = useState({
        type: '',
        message: '',
    })

    const [swal, setSwal] = useState({
        type: '',
        title: '',
        message: ''
    })

    const { data, setData, patch, reset, errors, processing, recentlySuccessful } = useForm({
        vehicle_id: serviceLog.vehicle_id,
        date: serviceLog.date,
        transaction_number: serviceLog.transaction_number,
        workshop_name: serviceLog.workshop_name,
        workshop_address: serviceLog.workshop_address,
        workshop_phone: serviceLog.workshop_phone,
        mechanic: serviceLog.mechanic,
        grand_total_cost: serviceLog.grand_total_cost,
        total_service_cost: serviceLog.total_service_cost,
        total_parts_cost: serviceLog.total_parts_cost,
        note: serviceLog.note,
        receipt_path: serviceLog.receipt_path,
        attachments: serviceLog.attachments,
        details: serviceLog.details,
        parts: serviceLog.parts
    })

    const [detail, setDetail] = useState({
            service_name: '',
            service_cost: ''
        })

    const [part, setPart] = useState({
            part_code: '',
            part_name: '',
            part_quantity: '',
            part_cost: '',
            subtotal_part_cost: '',
            is_guarantee: '',
            guarantee_until: ''
        })

    const [receipt, setReceipt] = useState([]),
        [uploadReceiptStatus, setUploadReceiptStatus] = useState(''),
        [otherAttachments, setOtherAttachments] = useState([]),
        [uploadOtherAttachmentsStatus, setUploadOtherAttachmentsStatus] = useState('')

    const addDetail = () => {
        if (detail.service_name && detail.service_cost) {
            setData({ ...data,
                details: [...data.details, {...detail}],
                total_service_cost: data.total_service_cost + parseInt(detail.service_cost),
                grand_total_cost: data.grand_total_cost + parseInt(detail.service_cost)
            })
            setDetail({ service_name: '', service_cost: '' })
        } else {
            setSwal({
                type: 'warning',
                title: 'Warning',
                message: 'Please fill out all fields marked with an asterisk (*) as they are mandatory.'
            })
        }
    }

    const removeService = (index) => {
        setData({ ...data,
            total_service_cost: data.total_service_cost - parseInt(data.details[index].service_cost),
            grand_total_cost: data.grand_total_cost - parseInt(data.details[index].service_cost),
            details: data.details.filter((item, i) => i !== index)
         })
    }

    const addPart = () => {
        if (
            part.part_name &&
            part.part_quantity &&
            part.part_cost &&
            part.subtotal_part_cost
        ) {
            setData({ ...data,
                parts: [...data.parts, {...part}],
                total_parts_cost: data.total_parts_cost + parseInt(part.subtotal_part_cost),
                grand_total_cost: data.grand_total_cost + parseInt(part.subtotal_part_cost)
            })
            setPart({
                part_code: '',
                part_name: '',
                part_quantity: '',
                part_cost: '',
                subtotal_part_cost: '',
                is_guarantee: '',
                guarantee_until: ''
            })
        } else {
            setSwal({
                type: 'warning',
                title: 'Warning',
                message: 'Please fill out all fields marked with an asterisk (*) as they are mandatory.'
            })
        }
    }

    const removePart = (index) => {
        setData({ ...data,
            total_parts_cost: data.total_parts_cost - parseInt(data.parts[index].subtotal_part_cost),
            grand_total_cost: data.grand_total_cost - parseInt(data.parts[index].subtotal_part_cost),
            parts: data.parts.filter((item, i) => i !== index)
        })
    }

    const addReceipt = async (acceptedFile) => {
        setReceipt(acceptedFile[0])
        await upload(acceptedFile[0], 'receipt')
    }

    const addOtherAttachments = async (acceptedFile) => {
        setOtherAttachments(acceptedFile)
        await upload(acceptedFile, 'attachments')
    }

    const upload = async (file, type) => {
        const formData = new FormData()

        if (Array.isArray(file)) {
            file.forEach((item, key) => {
                formData.append(`files[${key}]`, item)
            })
        } else {
            formData.append('file', file)
        }

        formData.append('type', type)

        try {
            const res = await fetch(route('api.v1.service-log.upload-attachment'), {
                method: 'POST',
                body: formData
            })

            if (type == 'receipt') {
                handleUploadReceipt(res)
            } else {
                handleUploadOtherAttachments(res)
            }
        } catch (error) {
            if (type == 'receipt') {
                handleErrorUploadReceipt(res)
            } else {
                handleErrorUploadOtherAttachments(res)
            }
        }
    }

    const handleUploadReceipt = async (res) => {
        if (res.ok) {
            const resData = await res.json()
            setUploadReceiptStatus('File uploaded successfully')
            setData('receipt_path', resData.data)
        } else {
            setUploadReceiptStatus('Error uploading file')
        }
    }

    const handleErrorUploadReceipt = (err) => {
        console.log(err)
        setUploadReceiptStatus('Error uploading file')
    }

    const handleUploadOtherAttachments = async (res) => {
        if (res.ok) {
            const resData = await res.json()
            setUploadOtherAttachmentsStatus('File uploaded successfully')
            setData('attachments', resData.data)
        } else {
            setUploadOtherAttachmentsStatus('Error uploading file')
        }
    }

    const handleErrorUploadOtherAttachments = (err) => {
        console.log(err)
        setUploadOtherAttachmentsStatus('Error uploading file')
    }

    const submit = (e) => {
        e.preventDefault()

        patch(route('service-log.update', {id: serviceLog.id}), {
            onSuccess: () => {
                showAlert('success', 'Service log updated successfully!')
            },
            onError: (err) => {
                console.log(err)
            }
        })
    }

    const showAlert = (type, message) => {
        setAlert({
            type: type,
            message: message,
        })
        setTimeout(() => {
            setAlert({
                type: '',
                message: '',
            })
        }, 3000)
    }

    const resetSwal = () => {
        setSwal({
            type: '',
            title: '',
            message: ''
        })
    }

    return (
        <AppLayout
            user={auth.user}
            menus={userSess.menus}
            uriPath={uriPath}
        >
            <Head title="Vehicle" />

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {alert.message && alert.type && (
                                <Alert type={alert.type} message={alert.message} />
                            )}
                            {swal.message && swal.title && swal.type && (
                                <SweetAlert type={swal.type} title={swal.title}
                                    onConfirm={() => { resetSwal() }}
                                    confirmBtnCssClass="bg-gray-600 hover:bg-gray-700 focus:ring-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    {swal.message}
                                </SweetAlert>
                            )}
                            <section className="max-w-full">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">Service Log</h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Insert your new service log
                                    </p>

                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div className="flex space-x-5 border rounded-md p-5">
                                            <div className="w-1/2">
                                                <div>
                                                    <InputLabel htmlFor="vehicle_id" value="Vehicle*" />

                                                    <SelectBox
                                                        id="vehicle_id"
                                                        name="vehicle_id"
                                                        className="mt-1 block w-full"
                                                        options={vehicles}
                                                        value={data.vehicle_id}
                                                        onChange={(e) => {
                                                            setData('vehicle_id', e.target.value)
                                                        }}
                                                    />

                                                    <InputError message={errors.vehicle_id} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="date" value="Date*" />

                                                    <TextInput
                                                        id="date"
                                                        name="date"
                                                        type="date"
                                                        className="mt-1 block w-full"
                                                        value={data.date}
                                                        onChange={(e) => {
                                                            setData('date', e.target.value)
                                                        }}
                                                        required
                                                        autoComplete="date"
                                                    />

                                                    <InputError message={errors.date} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="transaction_number" value="Transaction Number" />

                                                    <TextInput
                                                        id="transaction_number"
                                                        name="transaction_number"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={data.transaction_number}
                                                        onChange={(e) => {
                                                            setData('transaction_number', e.target.value.toUpperCase())
                                                        }}
                                                        autoComplete="transaction_number"
                                                    />

                                                    <InputError message={errors.transaction_number} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="workshop_name" value="Workshop Name*" />

                                                    <TextInput
                                                        id="workshop_name"
                                                        name="workshop_name"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={data.workshop_name}
                                                        onChange={(e) => {
                                                            setData('workshop_name', e.target.value.toUpperCase())
                                                        }}
                                                        required
                                                        autoComplete="workshop_name"
                                                    />

                                                    <InputError message={errors.workshop_name} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="workshop_address" value="Workshop Address*" />

                                                    <TextInput
                                                        id="workshop_address"
                                                        name="workshop_address"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={data.workshop_address}
                                                        onChange={(e) => {
                                                            setData('workshop_address', e.target.value.toUpperCase())
                                                        }}
                                                        required
                                                        autoComplete="workshop_address"
                                                    />

                                                    <InputError message={errors.workshop_address} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="workshop_phone" value="Workshop Phone" />

                                                    <TextInput
                                                        id="workshop_phone"
                                                        name="workshop_phone"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={data.workshop_phone}
                                                        onChange={(e) => {
                                                            setData('workshop_phone', e.target.value.toUpperCase())
                                                        }}
                                                        autoComplete="workshop_phone"
                                                    />

                                                    <InputError message={errors.workshop_phone} className='mt-2' />
                                                </div>
                                            </div>
                                            <div className="w-1/2">
                                                <div>
                                                    <InputLabel htmlFor="mechanic" value="Mechanic" />

                                                    <TextInput
                                                        id="mechanic"
                                                        name="mechanic"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={data.mechanic}
                                                        onChange={(e) => {
                                                            setData('mechanic', e.target.value.toUpperCase())
                                                        }}
                                                        autoComplete="mechanic"
                                                    />

                                                    <InputError message={errors.mechanic} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="grand_total_cost" value="Total Cost*" />

                                                    <TextInput
                                                        id="grand_total_cost"
                                                        name="grand_total_cost"
                                                        type="number"
                                                        className="mt-1 block w-full"
                                                        value={data.grand_total_cost}
                                                        onChange={(e) => {
                                                            setData('grand_total_cost', e.target.value)
                                                        }}
                                                        required
                                                        readOnly
                                                        autoComplete="grand_total_cost"
                                                    />

                                                    <InputError message={errors.grand_total_cost} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="total_service_cost" value="Service Cost*" />

                                                    <TextInput
                                                        id="total_service_cost"
                                                        name="total_service_cost"
                                                        type="number"
                                                        className="mt-1 block w-full"
                                                        value={data.total_service_cost}
                                                        onChange={(e) => {
                                                            setData('total_service_cost', e.target.value)
                                                        }}
                                                        required
                                                        readOnly
                                                        autoComplete="total_service_cost"
                                                    />

                                                    <InputError message={errors.total_service_cost} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="total_parts_cost" value="Parts Cost*" />

                                                    <TextInput
                                                        id="total_parts_cost"
                                                        name="total_parts_cost"
                                                        type="number"
                                                        className="mt-1 block w-full"
                                                        value={data.total_parts_cost}
                                                        onChange={(e) => {
                                                            setData('total_parts_cost', e.target.value)
                                                        }}
                                                        required
                                                        readOnly
                                                        autoComplete="total_parts_cost"
                                                    />

                                                    <InputError message={errors.total_parts_cost} className='mt-2' />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="note" value="Note" />

                                                    <TextInput
                                                        id="note"
                                                        name="note"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={data.note}
                                                        onChange={(e) => {
                                                            setData('note', e.target.value.toUpperCase())
                                                        }}
                                                        autoComplete="note"
                                                    />

                                                    <InputError message={errors.note} className='mt-2' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border rounded-md p-5">
                                            <h5 className="text-gray-900">Service List</h5>
                                            <table className="min-w-full mt-2 p-1 text-center text-sm text-gray-900">
                                                <thead className="border-b-2">
                                                    <tr>
                                                        <th className="max-w-0.5">No.</th>
                                                        <th>Service Name*</th>
                                                        <th>Service Cost*</th>
                                                        <th className="w-1">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="border-b-2">
                                                    {data.details && data.details.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.service_name}</td>
                                                            <td>{item.service_cost}</td>
                                                            <td>
                                                                <Tooltip text="Delete">
                                                                    <Button
                                                                        type="button"
                                                                        category="danger"
                                                                        className="px-1 py-0.5 text-xs font-light"
                                                                        onClick={(e) => {
                                                                            e.preventDefault()
                                                                            removeService(index)
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faTrash}
                                                                            className="fa-xs"
                                                                        />
                                                                    </Button>
                                                                </Tooltip>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {data.details.length === 0 && (
                                                        <tr>
                                                            <td colSpan="4" className="p-1 text-center text-sm text-gray-900">No data available</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="service_name"
                                                                    name="service_name"
                                                                    type="text"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={detail.service_name}
                                                                    onChange={(e) => {
                                                                        setDetail({ ...detail, service_name: e.target.value.toUpperCase() })
                                                                    }}
                                                                    autoComplete="service_name"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="service_cost"
                                                                    name="service_cost"
                                                                    type="number"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={detail.service_cost}
                                                                    onChange={(e) => {
                                                                        setDetail({ ...detail, service_cost: e.target.value })
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Tooltip text="Add">
                                                                <Button
                                                                    type="button"
                                                                    category="primary"
                                                                    className="px-1 py-2.5 mt-0.5 text-xs font-light"
                                                                    onClick={addDetail}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={faAdd}
                                                                        className="fa-sm"
                                                                    />
                                                                </Button>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                        <div className="border rounded-md p-5">
                                            <h5 className="text-gray-900">Part List</h5>
                                            <table className="min-w-full mt-2 p-1 text-center text-sm text-gray-900">
                                                <thead className="border-b-2">
                                                    <tr>
                                                        <th className="max-w-0.5">No.</th>
                                                        <th>Part Code</th>
                                                        <th>Part Name*</th>
                                                        <th>Guarantee</th>
                                                        <th>Part Cost*</th>
                                                        <th>Quantity*</th>
                                                        <th>Total Cost</th>
                                                        <th className="w-1">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="border-b-2">
                                                    {data.parts && data.parts.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.part_code}</td>
                                                            <td>{item.part_name}</td>
                                                            <td>{item.guarantee_until} {item.is_guarantee}</td>
                                                            <td>{item.part_cost}</td>
                                                            <td>{item.part_quantity}</td>
                                                            <td>{item.subtotal_part_cost}</td>
                                                            <td>
                                                                <Tooltip text="Delete">
                                                                    <Button
                                                                        type="button"
                                                                        category="danger"
                                                                        className="px-1 py-0.5 text-xs font-light"
                                                                        onClick={(e) => {
                                                                            e.preventDefault()
                                                                            removePart(index)
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faTrash}
                                                                            className="fa-xs"
                                                                        />
                                                                    </Button>
                                                                </Tooltip>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {data.parts.length === 0 && (
                                                        <tr>
                                                            <td colSpan="8" className="p-1 text-center text-sm text-gray-900">No data available</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="part_code"
                                                                    name="part_code"
                                                                    type="text"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={part.part_code}
                                                                    onChange={(e) => {
                                                                        setPart({ ...part, part_code: e.target.value.toUpperCase() })
                                                                    }}
                                                                    autoComplete="part_code"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="part_name"
                                                                    name="part_name"
                                                                    type="text"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={part.part_name}
                                                                    onChange={(e) => {
                                                                        setPart({ ...part, part_name: e.target.value.toUpperCase() })
                                                                    }}
                                                                    autoComplete="part_name"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="guarantee_until"
                                                                    name="guarantee_until"
                                                                    type="date"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={part.guarantee_until}
                                                                    onChange={(e) => {
                                                                        setPart({ ...part,
                                                                            guarantee_until: e.target.value,
                                                                            is_guarantee: e.target.value ? 1 : 0
                                                                        })
                                                                    }}
                                                                    autoComplete="guarantee_until"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="part_cost"
                                                                    name="part_cost"
                                                                    type="number"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={part.part_cost}
                                                                    onChange={(e) => {
                                                                        setPart({ ...part,
                                                                            part_cost: e.target.value,
                                                                            subtotal_part_cost: e.target.value * (part.part_quantity ?? 0)
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="part_quantity"
                                                                    name="part_quantity"
                                                                    type="number"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={part.part_quantity}
                                                                    onChange={(e) => {
                                                                        setPart({ ...part,
                                                                            part_quantity: e.target.value,
                                                                            subtotal_part_cost: e.target.value * (part.part_cost ?? 0)
                                                                        })
                                                                    }}
                                                                    autoComplete="part_quantity"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <TextInput
                                                                    id="subtotal_part_cost"
                                                                    name="subtotal_part_cost"
                                                                    type="number"
                                                                    className="mt-1 block w-full text-xs"
                                                                    value={part.subtotal_part_cost}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Tooltip text="Add">
                                                                <Button
                                                                    type="button"
                                                                    category="primary"
                                                                    className="px-1 py-2.5 mt-0.5 text-xs font-light"
                                                                    onClick={addPart}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={faAdd}
                                                                        className="fa-sm"
                                                                    />
                                                                </Button>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                        <div className="border rounded-md p-5">
                                            <h5 className="text-gray-900">Attachment</h5>
                                            <div className="border rounded-md p-5 my-2">
                                                <strong>Receipt</strong>
                                                <Dropzone
                                                    onDrop={addReceipt}
                                                    multiple={false}
                                                />
                                                <div className="mt-4">
                                                    <h2 className="text-xl font-semibold mb-2">File</h2>
                                                    {data.receipt_path && <img className="h-40 rounded-full" src={data.receipt_path}/>}
                                                    {receipt.name && <p className="text-gray-700">{receipt.name}</p>}
                                                    {uploadReceiptStatus && <p className="mt-2 text-red-500">{uploadReceiptStatus}</p>}
                                                </div>
                                            </div>
                                            <div className="border rounded-md p-5 my-2">
                                                <strong>Others</strong>
                                                <Dropzone
                                                    onDrop={addOtherAttachments}
                                                    multiple={true}
                                                />
                                                <div className="mt-4">
                                                    <h2 className="text-xl font-semibold mb-2">File</h2>
                                                    <ul className="list-disc list-inside">
                                                        {otherAttachments.map((item, index) => (
                                                            <li key={index} className="text-gray-800">{item.name}</li>
                                                        ))}
                                                    </ul>
                                                    <div className="flex">
                                                        {data.attachments && data.attachments.map((item, index) => (
                                                            <div key={index}>
                                                                <img className="h-40 rounded-full" src={item.path}/>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {uploadOtherAttachmentsStatus && <p className="mt-2 text-red-500">{uploadOtherAttachmentsStatus}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-gray-700 text-sm font-medium">
                                            Please fill out all fields marked with an asterisk (*) as they are mandatory
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                category="primary"
                                                type="submit"
                                                disabled={processing}
                                            >
                                                <Transition
                                                    show={!recentlySuccessful && !processing}
                                                    enter="transform ease-out duration-300 transition"
                                                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    Save
                                                </Transition>
                                                <Transition
                                                    show={processing}
                                                    enter="transform ease-out duration-300 transition"
                                                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    Processing...
                                                </Transition>
                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transform ease-out duration-300 transition"
                                                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    Saved.
                                                </Transition>
                                            </Button>
                                            <Button
                                                category="danger"
                                                type="button"
                                                onClick={() => {
                                                    router.get('/service-log')
                                                }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </form>
                                </header>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
