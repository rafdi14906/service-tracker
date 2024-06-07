import Datatable from '@/Components/Datatable';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import listHeader from '@/Data/service-log/list-header.json';
import PrimaryButton from '@/Components/PrimaryButton';
import Alert from '@/Components/Alert';
import { useState } from 'react';

export default function Index({ auth, userSess, uriPath, serviceLogs, search }) {
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    })

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
            <Head title="Service Log" />

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {alert.message && alert.type && (
                                <Alert type={alert.type} message={alert.message} />
                            )}
                            <PrimaryButton
                                type="button"
                                className="btn-sm"
                                onClick={(e) => {
                                    router.get('/service-log/create')
                                }}
                            >
                                Create Service Log
                            </PrimaryButton>
                            <Datatable
                                header={listHeader}
                                data={serviceLogs.data}
                                links={serviceLogs.links}
                                from={serviceLogs.from}
                                to={serviceLogs.to}
                                total={serviceLogs.total}
                                per_page={serviceLogs.per_page}
                                search={search}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
