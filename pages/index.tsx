import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { initPocketBase } from '../lib/pocketbase';
import Alunia from '../components/Alunia';
import Header from '../components/Header';
import Note from '../components/Note';
import { useContext, useState } from 'react';
import { UserContext } from './MyContext';
import console from 'console';

type Note = {
    id: string;
    title: string;
    content: string;
    created: string;
};

export const getServerSideProps: GetServerSideProps = async context => {
    const pb = await initPocketBase(context);
    const user = pb.authStore.model;
    const username = user?.username || '';

    function formatDate(date: string) {
        const d = new Date(date);
        return `${('0' + d.getDate()).slice(-2)}/${('0' + d.getMonth()).slice(
            -2
        )}/${d.getFullYear()}`;
    }

    const noteRecords = await pb
        .collection('notes')
        .getFullList<Note>(200, { filter: `author.id="${user?.id}"` });
    const notes = noteRecords.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        created: formatDate(note.created),
    }));
    console.log(notes);

    return {
        props: {
            username,
            userNotes: notes,
        },
    };
};

interface Props {
    username: string;
    userNotes: Note[];
}

export default function Home({ username, userNotes }: Props) {
    const { pb } = useContext(UserContext);
    const [notes, setNotes] = useState(userNotes);

    async function deleteNote(id: string) {
        setNotes(notes => notes.filter(note => note.id !== id));
        await pb.collection('notes').delete(id);
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="flex flex-col items-center m-6 md:m-24">
                <h1 className="mb-16 text-3xl font-bold animate-fade-in md:text-5xl">
                    {username === 'Alunia' ? (
                        <Alunia />
                    ) : (
                        `Welcome ${username}!`
                    )}
                </h1>
                <h2>Your notes</h2>
                <div className="justify-self-start">
                    {notes.map(note => (
                        <Note
                            id={note.id}
                            key={note.id}
                            href={`/note/${note.id}`}
                            title={note.title}
                            created={note.created}
                            deleteNote={deleteNote}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
