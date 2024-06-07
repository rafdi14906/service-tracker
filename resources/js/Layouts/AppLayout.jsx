import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Breadcrumbs from '@/Components/Breadcrumbs';

export default function AppLayout({ user, menus, uriPath, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar
                auth={user}
                links={menus}
            />
            <Breadcrumbs
                uriPath={uriPath}
            />
            <main>{children}</main>
        </div>
    );
}
