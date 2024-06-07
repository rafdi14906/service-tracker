import Datatable from '@/Components/Datatable';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import listHeader from '@/Data/vehicle/list-header.json';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, userSess, uriPath, vehicles, search }) {
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
                            <PrimaryButton
                                type="button"
                                className="btn-sm"
                                onClick={(e) => {
                                    router.get('/vehicle/create')
                                }}
                            >
                                Create Vehicle
                            </PrimaryButton>
                            <Datatable
                                header={listHeader}
                                data={vehicles.data}
                                links={vehicles.links}
                                from={vehicles.from}
                                to={vehicles.to}
                                total={vehicles.total}
                                per_page={vehicles.per_page}
                                search={search}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
