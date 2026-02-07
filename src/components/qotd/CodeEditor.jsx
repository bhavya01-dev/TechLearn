import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, setCode, language, isDarkMode }) => {
    const handleEditorChange = (value) => {
        setCode(value || '');
    };

    const getMonacoLanguage = (lang) => {
        const languageMap = {
            python: 'python',
            java: 'java',
            javascript: 'javascript',
            cpp: 'cpp',
            c: 'c'
        };
        return languageMap[lang] || 'python';
    };

    return (
        <div className="code-editor-wrapper">
            <Editor
                height="100%"
                language={getMonacoLanguage(language)}
                value={code}
                onChange={handleEditorChange}
                theme={isDarkMode ? 'vs-dark' : 'light'}
                options={{
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                    padding: { top: 16, bottom: 16 },
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    smoothScrolling: true,
                    renderLineHighlight: 'all',
                    lineHeight: 22,
                }}
            />
        </div>
    );
};

export default CodeEditor;
