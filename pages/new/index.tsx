import { useContext, useState } from 'react';
import { UserContext } from '../MyContext';
import { useRouter } from 'next/router';
import TipTap from '../../components/TipTap';
import { useEditor } from '@tiptap/react';
import Header from '../../components/Header';

import { FontSize } from '../../lib/FontSize';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import { Icon } from '@iconify/react';
import NotePage from '../../components/NotePage';

export default function NewNote() {
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
        content: '<p></p>',
        editable: true,
        autofocus: true,
    });

    let [title, setTitle] = useState('');

    const router = useRouter();
    const { pb } = useContext(UserContext);

    async function saveNote() {
        const html = editor?.getHTML();
        if (html === '<p></p>') {
            alert('Please enter some content');
            return;
        }
        const note = {
            title,
            content: html,
            author: pb.authStore.model?.id,
        };
        const record = await pb.collection('notes').create(note);
        router.push(`/note/${record.id}`);
    }

    async function handleNoteSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await saveNote();
    }

    return (
        <NotePage
            title={title}
            setTitle={setTitle}
            editor={editor}
            handleNoteSave={handleNoteSave}
            showSave={true}
            showDelete={false}
            deleteNote={async () => {}}
        />
    );
}
