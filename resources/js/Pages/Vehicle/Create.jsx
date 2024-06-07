import InputLabel from '@/Components/InputLabel'
import SelectBox from '@/Components/SelectBox'
import AppLayout from '@/Layouts/AppLayout'
import { Head, router, useForm } from '@inertiajs/react'
import categories from '@/Data/vehicle/category.json'
import fuelTypes from '@/Data/vehicle/fuel_type.json'
import InputError from '@/Components/InputError'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import DangerButton from '@/Components/DangerButton'
import Alert from '@/Components/Alert'
import { useState } from 'react'

export default function Index({ auth, userSess, uriPath }) {
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    })

    const { data, setData, post, reset, errors, processing, recentlySuccessful } = useForm({
        category: categories[0].value,
        plate_number: '',
        brand: '',
        seri: '',
        type: '',
        cylinder_capacity: '',
        year: '',
        fuel_type: fuelTypes[0].value,
        color: '',
        model: '',
        chassis_number: '',
        engine_number: '',
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('vehicle.store'), {
            onSuccess: () =>  {
                reset()
                showAlert('success', 'Vehicle has been created successfully!')
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
                                <Alert type={alert.type} message={alert.message}/>
                            )}
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">Create Vehicle</h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Add your new vehicle profile
                                    </p>

                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="category" value="Category*" />

                                            <SelectBox
                                                id="category"
                                                name="category"
                                                className="mt-1 block w-full"
                                                options={categories}
                                                value={data.category}
                                                onChange={(e) => {
                                                    setData('category', e.target.value)
                                                }}
                                            />

                                            <InputError message={errors.category} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="plate_number" value="Plate Number*" />

                                            <TextInput
                                                id="plate_number"
                                                name="plate_number"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.plate_number}
                                                onChange={(e) => {
                                                    setData('plate_number', e.target.value.toUpperCase())
                                                }}
                                                required
                                                autoComplete="plate_number"
                                            />

                                            <InputError message={errors.plate_number} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="brand" value="Brand*" />

                                            <TextInput
                                                id="brand"
                                                name="brand"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.brand}
                                                onChange={(e) => {
                                                    setData('brand', e.target.value.toUpperCase())
                                                }}
                                                required
                                                autoComplete="brand"
                                            />

                                            <InputError message={errors.brand} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="seri" value="Seri*" />

                                            <TextInput
                                                id="seri"
                                                name="seri"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.seri}
                                                onChange={(e) => {
                                                    setData('seri', e.target.value.toUpperCase())
                                                }}
                                                required
                                                autoComplete="seri"
                                            />

                                            <InputError message={errors.seri} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="type" value="Type" />

                                            <TextInput
                                                id="type"
                                                name="type"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.type}
                                                onChange={(e) => {
                                                    setData('type', e.target.value.toUpperCase())
                                                }}
                                                autoComplete="type"
                                            />

                                            <InputError message={errors.type} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="cylinder_capacity" value="CC*" />

                                            <TextInput
                                                id="cylinder_capacity"
                                                name="cylinder_capacity"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.cylinder_capacity}
                                                onChange={(e) => {
                                                    setData('cylinder_capacity', e.target.value.toUpperCase())
                                                }}
                                                required
                                                autoComplete="cylinder_capacity"
                                            />

                                            <InputError message={errors.cylinder_capacity} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="year" value="Year*" />

                                            <TextInput
                                                id="year"
                                                name="year"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.year}
                                                onChange={(e) => {
                                                    setData('year', e.target.value.toUpperCase())
                                                }}
                                                required
                                                autoComplete="year"
                                            />

                                            <InputError message={errors.year} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="fuel_type" value="Fuel Type*" />

                                            <SelectBox
                                                id="fuel_type"
                                                name="fuel_type"
                                                className="mt-1 block w-full"
                                                options={fuelTypes}
                                                value={data.fuel_type}
                                                onChange={(e) => {
                                                    setData('fuel_type', e.target.value)
                                                }}
                                            />

                                            <InputError message={errors.fuel_type} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="color" value="Color" />

                                            <TextInput
                                                id="color"
                                                name="color"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.color}
                                                onChange={(e) => {
                                                    setData('color', e.target.value.toUpperCase())
                                                }}
                                                autoComplete="color"
                                            />

                                            <InputError message={errors.color} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="model" value="Model*" />

                                            <TextInput
                                                id="model"
                                                name="model"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.model}
                                                onChange={(e) => {
                                                    setData('model', e.target.value.toUpperCase())
                                                }}
                                                required
                                                autoComplete="model"
                                            />

                                            <InputError message={errors.model} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="chassis_number" value="Chassis Number" />

                                            <TextInput
                                                id="chassis_number"
                                                name="chassis_number"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.chassis_number}
                                                onChange={(e) => {
                                                    setData('chassis_number', e.target.value.toUpperCase())
                                                }}
                                                autoComplete="chassis_number"
                                            />

                                            <InputError message={errors.chassis_number} className='mt-2' />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="engine_number" value="Engine Number" />

                                            <TextInput
                                                id="engine_number"
                                                name="engine_number"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.engine_number}
                                                onChange={(e) => {
                                                    setData('engine_number', e.target.value.toUpperCase())
                                                }}
                                                autoComplete="engine_number"
                                            />

                                            <InputError message={errors.engine_number} className='mt-2' />
                                        </div>
                                        <div className="text-gray-700 text-sm font-medium">
                                            Please fill out all fields marked with an asterisk (*) as they are mandatory
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <PrimaryButton disabled={processing}>
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
                                            </PrimaryButton>
                                            <DangerButton
                                                type="button"
                                                onClick={(e) => {
                                                    router.get('/vehicle')
                                                }}
                                            >
                                                Back
                                            </DangerButton>
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
