import { Icon } from '@iconify/react';
import Header from './Header';
import TipTap from './TipTap';
import { SetStateAction } from 'react';
import { Editor } from '@tiptap/react';

type Props = {
    title: string;
    setTitle: (value: SetStateAction<string>) => void;
    handleNoteSave: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    editor: Editor | null;
    showSave: boolean;
    showDelete: boolean;
    deleteNote: () => Promise<void>;
};

export default function NotePage({
    title,
    setTitle,
    handleNoteSave,
    editor,
    showSave,
    showDelete,
    deleteNote,
}: Props) {
    return (
        <>
            <Header />

            <div className="m-8 grid justify-center">
                <form onSubmit={handleNoteSave} className="relative">
                    {showSave && (
                        <button
                            className="btn text-lg bg-blue-300 flex gap-1 items-center hover:bg-blue-400 absolute top-1/2"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            <Icon
                                icon="ri:save-2-line"
                                height={20}
                                className="inline-block"
                            />
                            Save
                        </button>
                    )}
                    <input
                        className="block bg-inherit my-2 max-w-3xl mx-auto text-center outline-none border-none text-pink-200 text-3xl font-black"
                        placeholder="Title"
                        type="text"
                        value={title}
                        required
                        readOnly={!showSave}
                        maxLength={100}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {showDelete && (
                        <button
                            type="button"
                            onClick={deleteNote}
                            className="btn text-lg bg-red-300 flex gap-1 items-center hover:bg-red-400 absolute top-1/2 right-0"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            <Icon
                                icon="ri:delete-bin-2-line"
                                height={20}
                                className="inline-block"
                            />
                            Delete
                        </button>
                    )}
                </form>
                <TipTap editor={editor} />
            </div>
        </>
    );
}
