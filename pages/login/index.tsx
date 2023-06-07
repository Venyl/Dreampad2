import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { pb, initPocketBase } from '../../lib/pocketbase';

export const getServerSideProps: GetServerSideProps = async context => {
    const pb = await initPocketBase(context);
    const data = pb.authStore.model !== null;
    return {
        props: {
            isLoggedIn: data,
        },
    };
};

interface Props {
    isLoggedIn: boolean;
}

export default function Login({ isLoggedIn }: Props) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    async function signIn() {
        try {
            await pb.collection('users').authWithPassword(username, password);
        } catch {
            setError('Invalid username or password');
            return;
        }
        const cookie = pb.authStore.exportToCookie();
        const value = cookie.split('; ')[0].split('=')[1];
        await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(value),
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
    }

    async function signUp() {
        if (password.length < 5) {
            setError('The password must be at least 5 characters long');
            return;
        }
        if (username.length < 3) {
            setError('The username must be at least 3 characters long');
            return;
        }
        const data = {
            username,
            password,
            passwordConfirm: password,
        };
        try {
            await pb.collection('users').create(data);
        } catch {
            setError('The username is invalid or already in use');
            return;
        }
        signIn();
    }

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    return (
        <main className="grid h-[100vh] content-center justify-items-center">
            <div className="max-w-[330px] flex p-12 py-6 bg-white text-primary-900 flex-col gap-6">
                <h1 className="text-5xl font-bold">Join us!</h1>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Username</label>
                    <input
                        className="border px-1 border-neutral-400"
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Password</label>
                    <input
                        className="border px-1 border-neutral-400"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && <span className="text-pink-800 font-bold text-sm">{error}</span>}

                <div className="grid gap-4">
                    <button
                        className="btn bg-pink-300 shadow-neoShadow hover:bg-pink-400"
                        onClick={signIn}
                    >
                        Sign in
                    </button>
                    <button
                        className="btn bg-emerald-300 shadow-neoShadow hover:bg-emerald-400"
                        onClick={signUp}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </main>
    );
}
