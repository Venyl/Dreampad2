import { GetServerSideProps } from 'next';
import { initPocketBase } from '../../../lib/pocketbase';
import { useEditor } from '@tiptap/react';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { FontSize } from '../../../lib/FontSize';

import { useContext, useState } from 'react';
import NotePage from '../../../components/NotePage';
import { UserContext } from '../../MyContext';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    id: string;
    title: string;
    content: string;
    showSave: boolean;
    showDelete: boolean;
};

export const getServerSideProps: GetServerSideProps = async context => {
    const pb = await initPocketBase(context);
    const note = await pb
        .collection('notes')
        .getOne(context.query.noteId as string);

    const userIsAuthor = note.author === pb.authStore.model?.id;

    return {
        props: {
            id: note.id,
            title: note.title,
            content: note.content,
            showSave: userIsAuthor,
            showDelete: userIsAuthor,
        },
    };
};

export default function Note(props: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Typography,
            Underline,
            Color,
            FontSize,
            FontFamily,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['paragraph', 'heading'] }),
        ],
        content: props.content,
        editable: true,
        autofocus: true,
    });

    const [title, setTitle] = useState(props.title);
    const { pb } = useContext(UserContext);
    const router = useRouter();

    async function handleNoteSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await pb.collection('notes').update(props.id, {
            title: title,
            content: editor?.getHTML(),
        });

        if (props.showDelete) {
            toast.success('Note saved', {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-message',
                autoClose: 500,
            });
        }
    }

    async function deleteNote() {
        await pb.collection('notes').delete(props.id);
        router.push('/');
    }

    return (
        <>
            <NotePage
                title={title}
                setTitle={setTitle}
                editor={editor}
                handleNoteSave={handleNoteSave}
                showSave={props.showSave}
                showDelete={props.showDelete}
                deleteNote={deleteNote}
            />
            <ToastContainer
                toastStyle={{
                    backgroundColor: 'rgb(51, 51, 77)',
                    color: 'white',
                }}
                hideProgressBar
            />
        </>
    );
}
