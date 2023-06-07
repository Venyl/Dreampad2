type Props = {
    id: string;
    href: string;
    title: string;
    created: string;
    deleteNote: (id: string) => Promise<void>;
};

export default function Note({ href, title, id, created, deleteNote }: Props) {
    return (
        <div className="min-w-[16rem] max-w-xl grid grid-cols-[1fr_auto] gap-2 my-4">
            <a
                href={href}
                className="bg-primary-600 no-underline block flex-1 p-2 rounded-md hover:bg-primary-700"
            >
                <div>
                    <h2 className="gradient inline-block text-xl">
                        {title.slice(0, 30) + (title.length > 30 ? '...' : '')}
                    </h2>

                    <p className="text-primary-50 opacity-70 text-left text-sm">
                        {created}
                    </p>
                </div>
            </a>
            <button
                className="bg-red-500 rounded-md border-none text-white h-full aspect-square text-xl font-bold hover:bg-red-600"
                onClick={() => deleteNote(id)}
            >
                x
            </button>
        </div>
    );
}
