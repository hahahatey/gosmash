'use client'; // ← важно для App Router, но для Pages Router можно опустить

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef } from 'react';

interface RichTextProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichText({ content, onChange }: RichTextProps) {
  // Используем useRef, чтобы избежать двойной инициализации в Strict Mode
  const editorRef = useRef<any>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[150px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 prose max-w-none',
      },
    },
    autofocus: false,
    immediatelyRender: false,
  }, []);

  // Синхронизация внешнего контента (например, при редактировании)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return <div className="p-3 border border-gray-300 rounded min-h-[150px]">Загрузка редактора...</div>;
  }

  return (
    <div className="border border-gray-300 rounded">
      {/* Панель инструментов (опционально, но полезно) */}
      <div className="px-3 py-2 border-b border-gray-200 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Жирный"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Курсив"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Маркированный список"
        >
          •••
        </button>
      </div>

      {/* Контент редактора */}
      <EditorContent editor={editor} />
    </div>
  );
}