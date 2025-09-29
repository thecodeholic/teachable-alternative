import MDEditor from '@uiw/react-md-editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: number;
}

export default function MarkdownEditor({
    value,
    onChange,
    placeholder = "Enter your content here...",
    height = 400
}: MarkdownEditorProps) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Markdown Editor</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div data-color-mode="light" className="markdown-editor-wrapper">
                    <MDEditor
                        value={value}
                        onChange={(val) => onChange(val || '')}
                        height={height}
                        visibleDragBar={false}
                        data-color-mode="light"
                        textareaProps={{
                            placeholder: placeholder,
                        }}
                        style={{
                            backgroundColor: 'transparent',
                        }}
                        previewOptions={{
                            rehypePlugins: [],
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
