import { router } from "@inertiajs/react";
import SelectBox from "./SelectBox";
import TextInput from "./TextInput";

export default function DatatableHeader({ per_page, search }) {

    return (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center space-x-1">
                <div>
                    <SelectBox
                        className="text-sm font-medium py-1"
                        value={per_page}
                        options={[
                            { label: '10', value: '10' },
                            { label: '25', value: '25' },
                            { label: '50', value: '50' },
                            { label: '100', value: '100' }
                        ]}
                        onChange={(e) => {
                            router.get(location.pathname, { per_page: e.target.value, search: search }, { replace: true })
                        }}
                    />
                </div>
                <div>
                    <p className="text-sm text-gray-700">
                        entries per page
                    </p>
                </div>
            </div>
            <div>
                <TextInput
                    className="text-sm font-medium py-1"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                        router.get(location.pathname, { per_page: per_page, search: e.target.value }, { replace: true })
                    }}
                />
            </div>
        </div>
    )
}
