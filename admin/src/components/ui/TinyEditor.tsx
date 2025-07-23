import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce';

declare global {
    interface Window {
        tinymce: typeof tinymce;
    }
}

interface TinyEditorProps {
    value: string;
    onChange: (content: string) => void;
}

function TinyEditor({ value, onChange }: TinyEditorProps) {
    return (
        <Editor
            apiKey="w4qdowlrco32u8ud519zb70jiuz677fm4noxvxi70yl2ct2l"
            value={value}
            onEditorChange={(content) => onChange(content)}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic underline strikethrough | ' +
                    'forecolor backcolor | alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat | image link media | ' +
                    'code preview fullscreen',
                toolbar_sticky: true, // luôn hiển thị toolbar khi cuộn
                image_title: true,
                branding: false,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                automatic_uploads: true,
                file_picker_types: 'image',
                file_picker_callback: (
                    cb: (url: string, meta?: { title?: string }) => void,
                    _value: string,
                    _meta: Record<string, any>
                ) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.onchange = function () {
                        const file = input.files?.[0];
                        if (!file) return;

                        const reader = new FileReader();
                        reader.onload = function () {
                            const editor = window.tinymce?.activeEditor;
                            if (!editor) return;

                            const blobCache = editor.editorUpload?.blobCache;
                            if (!blobCache) return;

                            const base64 = reader.result as string;
                            const id = 'blobid' + new Date().getTime();
                            const blobInfo = blobCache.create(id, file, base64);

                            blobCache.add(blobInfo);
                            cb(blobInfo.blobUri(), { title: file.name });
                        };

                        reader.readAsDataURL(file);
                    };

                    input.click();
                },
            }}
        />
    );
}

export default TinyEditor;
