import { Link, Head } from '@inertiajs/react';
import NavbarUser from '@/Components/atom/NavBarUser';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relativesm:flex sm:justify-center sm:items-center min-h-screenselection:text-white">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <NavbarUser/>
                        </>
                    )}
            </div>
        
        </>
    );
}
