import { EditorContent } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

function MenuBar({ editor }: { editor: Editor | null }) {
    let iconSize = 24;
    const WHITE = '#ffffff';
    const BLACK = '#000000';
    const fontSizeInputRef = useRef(null);

    useEffect(() => {
        editor?.chain().focus().setColor(WHITE).run();
        editor?.chain().focus().setFontSize('16').run();
    }, [editor]);

    const fontFamilies = [
        'Inter',
        'Arial',
        'Comic Sans',
        'Georgia',
        'Impact',
        'Consolas',
        'Papyrus',
    ];

    function setFontFamily(event: React.ChangeEvent<HTMLSelectElement>) {
        editor?.commands.unsetFontFamily();
        editor?.chain().focus().setFontFamily(event.target.value).run();
    }

    const fontSizes = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];
    const [fontSizesVisible, setFontSizesVisible] = useState<boolean>(false);

    function getFontSize(): number {
        const fontSize: string =
            editor?.getAttributes('textStyle').fontSize || '16px';

        return Number(fontSize.slice(0, -2));
    }

    function changeFontSize(fontSize: number) {
        let newFontSize = '';

        if (isNaN(fontSize)) {
            newFontSize = String(getFontSize());
        } else if (fontSize < 1) {
            newFontSize = '1';
        } else if (fontSize > 200) {
            newFontSize = '200';
        } else {
            newFontSize = String(fontSize);
        }

        editor?.chain().focus().setFontSize(newFontSize).run();
        (fontSizeInputRef.current as unknown as HTMLInputElement).value =
            newFontSize;
        setFontSizesVisible(false);
    }

    function handleFontSizeSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const input = event.currentTarget.elements[0] as HTMLInputElement;
        const inputFontSize = parseInt(input.value);
        changeFontSize(inputFontSize);
    }

    const [highlightColor, setHighlightColor] = useState<string>('#0a0a0f');
    const [textColor, setTextColor] = useState<string>('#ffffff');

    const [recentTextColors, setRecentTextColors] = useState<string[]>([
        BLACK,
        BLACK,
        BLACK,
        BLACK,
        BLACK,
    ]);

    const [recentHighlightColors, setRecentHighlightColors] = useState<
        string[]
    >([BLACK, BLACK, BLACK, BLACK, BLACK]);

    const defaultColors = [
        WHITE,
        '#55556f',
        '#ff9059',
        '#ffdb59',
        '#7aff59',
        '#59ffff',
        '#598bff',
        '#9359ff',
        '#ff59e9',
        '#ff5977',
    ];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (
                recentTextColors.includes(textColor) ||
                defaultColors.includes(textColor)
            )
                return;

            setRecentTextColors([textColor, ...recentTextColors].slice(0, 5));
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [textColor]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (
                recentHighlightColors.includes(textColor) ||
                defaultColors.includes(textColor)
            )
                return;

            setRecentHighlightColors(
                [highlightColor, ...recentHighlightColors].slice(0, 5)
            );
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [highlightColor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="editor-controls flex flex-wrap justify-center gap-8 p-4 border border-solid border-primary-100 rounded-t-md">
            {/* Bold */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <Icon icon="ri:bold" width={iconSize} />
            </button>

            {/* Italic */}
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <Icon icon="ri:italic" width={iconSize} />
            </button>

            {/* Strikethrough */}
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <Icon icon="ri:strikethrough" width={iconSize} />
            </button>

            {/* Underline */}
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <Icon icon="ri:underline" width={iconSize} />
            </button>

            {/* Font Family */}
            <select
                className="capitalize bg-primary-900 border-primary-100 text-white appearance-none px-2 rounded-md"
                onInput={setFontFamily}
                value={editor.getAttributes('textStyle').fontFamily || 'Inter'}
            >
                {fontFamilies.map(fontFamily => (
                    <option key={fontFamily}>{fontFamily}</option>
                ))}
            </select>

            {/* Set font size */}
            <div className="flex gap-1">
                <button onClick={() => changeFontSize(getFontSize() - 1)}>
                    <Icon icon="ri:subtract-line" width={iconSize} />
                </button>

                <form onSubmit={handleFontSizeSubmit} className="relative">
                    <input
                        className="peer cursor-pointer w-12 border border-solid border-primary-100 rounded-md bg-transparent text-white text-center appearance-none"
                        type="text"
                        autoComplete="off"
                        onFocus={() => setFontSizesVisible(true)}
                        onBlur={() =>
                            setTimeout(() => setFontSizesVisible(false), 100)
                        }
                        defaultValue={getFontSize() || '16'}
                        ref={fontSizeInputRef}
                    />
                    <div
                        className={`${
                            fontSizesVisible ? 'flex' : 'hidden'
                        } absolute top-8 flex-col`}
                    >
                        {fontSizes.map(fontSize => (
                            <button
                                className="cursor-pointer w-12 z-10 bg-primary-600 hover:bg-primary-500 first:rounded-t-md last:rounded-b-md"
                                key={fontSize}
                                onClick={() => changeFontSize(fontSize)}
                            >
                                {fontSize}
                            </button>
                        ))}
                    </div>
                </form>

                <button onClick={() => changeFontSize(getFontSize() + 1)}>
                    <Icon icon="ri:add-line" width={iconSize} />
                </button>
            </div>

            {/* Set text color  */}
            <div
                className="relative pb-[3px] w-6 h-[30px] border-0 border-b-2 border-solid border-primary-100"
                style={{
                    borderBottomColor: editor.getAttributes('textStyle').color,
                }}
            >
                <Icon color="#FFFFFF" icon="ri:edit-2-line" width={iconSize} />
                <input
                    list="textColors"
                    className="absolute opacity-0 w-full h-full inset-0 m-auto cursor-pointer"
                    type="color"
                    onChange={event => {
                        editor
                            .chain()
                            .focus()
                            .setColor(event.currentTarget.value)
                            .run();
                        setTextColor(event.currentTarget.value);
                    }}
                    value={editor.getAttributes('textStyle').color || '#ffffff'}
                />
            </div>
            <datalist id="textColors">
                {defaultColors.map(color => (
                    <option key={color}>{color}</option>
                ))}
                {recentTextColors.map((color, index) => (
                    <option key={color + index}>{color}</option>
                ))}
            </datalist>

            {/* Set highlight */}
            <div
                className="relative pb-[3px] w-6 h-[30px] border-0 border-b-2 border-solid border-primary-100"
                style={{
                    borderBottomColor: highlightColor,
                }}
            >
                <Icon color="#FFFFFF" icon="ri:paint-fill" width={iconSize} />
                <input
                    className="peer absolute opacity-0 w-full h-full inset-0 m-auto cursor-pointer"
                    type="color"
                    list="highlightColors"
                    onInput={event => {
                        editor
                            .chain()
                            .focus()
                            .setHighlight({ color: event.currentTarget.value })
                            .run();
                        setHighlightColor(event.currentTarget.value);
                    }}
                    value={highlightColor}
                />
            </div>
            <datalist id="highlightColors">
                {defaultColors.map(color => (
                    <option key={color}>{color}</option>
                ))}
                {recentHighlightColors.map((color, index) => (
                    <option key={color + index}>{color}</option>
                ))}
            </datalist>

            {/* Remove highlight */}
            <button onClick={() => editor.commands.unsetHighlight()}>
                <Icon icon="ri:paint-line" width={iconSize} />
            </button>

            {/* Align left */}
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                }
                className={
                    editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
                }
            >
                <Icon icon="ri:align-left" width={iconSize} />
            </button>

            {/* Align center */}
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                }
                className={
                    editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
                }
            >
                <Icon icon="ri:align-center" width={iconSize} />
            </button>

            {/* Align right */}
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                }
                className={
                    editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
                }
            >
                <Icon icon="ri:align-right" width={iconSize} />
            </button>

            {/* Justify */}
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign('justify').run()
                }
                className={
                    editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
                }
            >
                <Icon icon="ri:align-justify" width={iconSize} />
            </button>

            {/* Clear styles */}
            <button
                onClick={() =>
                    editor.chain().focus().unsetAllMarks().clearNodes().run()
                }
            >
                <Icon icon="ri:format-clear" width={iconSize} />
            </button>

            {/* Unordered list */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <Icon icon="ri:list-unordered" width={iconSize} />
            </button>

            {/* Ordered list */}
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <Icon icon="ri:list-ordered" width={iconSize} />
            </button>

            {/* Separator */}
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Icon icon="ri:separator" width={iconSize} />
            </button>

            {/* Undo */}
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <Icon icon="ri:arrow-go-back-line" width={iconSize} />
            </button>

            {/* Redo */}
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <Icon icon="ri:arrow-go-forward-line" width={iconSize} />
            </button>
        </div>
    );
}

const TipTap = ({ editor }: { editor: Editor | null }) => {
    return (
        <main className="text-primary-300 max-w-7xlxl">
            <MenuBar editor={editor} />
            <EditorContent spellCheck={false} editor={editor} />
        </main>
    );
};

export default TipTap;
