import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../pages/MyContext';

export default function Header() {
    const router = useRouter();
    const { pb } = useContext(UserContext);

    async function signOut() {
        pb.authStore.clear();
        await fetch('/api/logout', {
            method: 'POST',
        });
        router.reload();
    }

    return (
        <header className="flex gap-3 py-3 px-4 justify-end items-center bg-primary-800 outline outline-1 outline-primary-300 md:px-12">
            <Link href="/" className="mr-auto no-underline">
                <h2 className="text-4xl  gradient font-extrabold">Dreampad</h2>
            </Link>
            <Link href="/new">
                <button className="btn border-2 px-9 bg-emerald-300 shadow-neoShadow hover:bg-emerald-400">
                    New note
                </button>
            </Link>
            <button
                className="btn border-2 bg-yellow-300 shadow-neoShadow hover:bg-yellow-400"
                onClick={signOut}
            >
                Sign out
            </button>
        </header>
    );
}
