import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

// Note: Monaco Editor languages are loaded on-demand by @monaco-editor/react
// Only SQL and Python languages are used in this application
// The editor will automatically load only the required language files

interface CodeEditorProps {
  language: 'sql' | 'python';
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
  height?: string;
  theme?: 'vs-dark' | 'light';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  readOnly = false,
  height = '400px',
  theme = 'vs-dark'
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on' as const,
      readOnly: readOnly
    });
  };

  // Configure language-specific settings
  useEffect(() => {
    if (language === 'sql') {
      monaco.languages.setLanguageConfiguration('sql', {
        comments: {
          lineComment: '--',
          blockComment: ['/*', '*/']
        },
        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')']
        ],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" }
        ]
      });

      // Register SQL keywords
      monaco.languages.setMonarchTokensProvider('sql', {
        keywords: [
          'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER',
          'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'AS', 'AND', 'OR', 'NOT', 'IN',
          'LIKE', 'BETWEEN', 'IS', 'NULL', 'UNION', 'ALL', 'DISTINCT', 'COUNT',
          'SUM', 'AVG', 'MAX', 'MIN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
          'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
          'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN',
          'REFERENCES', 'CONSTRAINT', 'DEFAULT', 'CHECK', 'UNIQUE'
        ],
        typeKeywords: [
          'INT', 'VARCHAR', 'TEXT', 'DATE', 'DATETIME', 'TIMESTAMP', 'DECIMAL',
          'FLOAT', 'DOUBLE', 'BOOLEAN', 'BLOB'
        ],
        operators: [
          '=', '>', '<', '>=', '<=', '<>', '!=', '<=>',
          '+', '-', '*', '/', '%', '||'
        ],
        symbols: /[=><!?:+\-*/^%]+/,
        tokenizer: {
          root: [
            [/[a-z_$][\w$]*/, {
              cases: {
                '@keywords': 'keyword',
                '@typeKeywords': 'type',
                '@default': 'identifier'
              }
            }],
            [/[A-Z][\w$]*/, 'type.identifier'],
            { include: '@whitespace' },
            [/[{}()[\]']/, '@brackets'],
            [/@symbols/, {
              cases: {
                '@operators': 'operator',
                '@default': ''
              }
            }],
            [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
            [/\d+/, 'number'],
            [/[;,.]/, 'delimiter'],
            [/'([^'\\]|\\.)*$/, 'string.invalid'],
            [/'/, { token: 'string.quote', bracket: '@open', next: '@string' }],
            [/"/, { token: 'string.quote', bracket: '@open', next: '@stringdouble' }]
          ],
          whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/--.*$/, 'comment']
          ],
          string: [
            [/[^\\']+/, 'string'],
            [/\\./, 'string.escape.invalid'],
            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
          ],
          stringdouble: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
          ]
        }
      });
    }
  }, [language]);

  return (
    <div className="w-full border border-gray-700 rounded-lg overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        theme={theme}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          readOnly: readOnly,
          tabSize: 2,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          folding: true,
          showFoldingControls: 'always',
          renderWhitespace: 'selection',
          cursorStyle: 'line',
          cursorBlinking: 'smooth'
        }}
      />
    </div>
  );
};

export default CodeEditor;

