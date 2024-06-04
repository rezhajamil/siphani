import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Images from '@/Components/atom/Image';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
            <div className='flex justify-center flex-col items-center'>
                <Link href="/">
                    <Images src="storage/images/logo-siphani.png" alt="Siphani" width={90} height={90} />
                </Link>
            </div>

            <div className="w-full mt-0 px-6 py-2 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
