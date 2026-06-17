'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'

type CodeEditorProps = {
  code: string
  onChange: (value: string) => void
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [language, setLanguage] = useState('python')

  const languageVersions: Record<string, string> = {
    python: '3.10.0',
    javascript: '18.15.0',
    java: '15.0.2',
    cpp: '10.2.0',
  }

  async function runCode() {
    setIsRunning(true)
    setOutput('Running...')
    
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          version: languageVersions[language] || '*',
          files: [{ content: code }]
        })
      })
      
      const data = await response.json()
      
      if (data.run?.stderr) {
        setOutput(`Error:\n${data.run.stderr}`)
      } else if (data.run?.stdout) {
        setOutput(data.run.stdout)
      } else if (data.message) {
         setOutput(`Error: ${data.message}`)
      } else {
        setOutput('Code executed successfully with no output.')
      }
    } catch (err) {
      setOutput('Failed to connect to execution server.')
      console.error(err)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
      {/* Editor Header */}
      <div className="flex justify-between items-center bg-slate-950 p-4 border-b border-slate-800">
        <div className="flex gap-4 items-center">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 text-slate-300 text-sm font-bold px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript (Node)</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        
        <button 
          onClick={runCode}
          disabled={isRunning}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-sm shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]"
        >
          {isRunning ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : '▶ Run'}
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(val) => onChange(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
          }}
        />
      </div>

      {/* Terminal Output */}
      <div className="h-48 bg-black border-t border-slate-800 p-4 font-mono text-sm overflow-y-auto">
        <div className="text-slate-500 mb-2 font-bold select-none">TERMINAL OUTPUT</div>
        <pre className={output.startsWith('Error') ? 'text-red-400' : 'text-emerald-400'}>
          {output || '> Waiting for execution...'}
        </pre>
      </div>
    </div>
  )
}
