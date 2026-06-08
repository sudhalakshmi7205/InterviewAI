import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 0;

export default async function AdminInterviewDetail({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  
  // Fetch session with user and report
  const { data: session } = await supabase
    .from('sessions')
    .select('*, users(email), reports(*)')
    .eq('id', sessionId)
    .single();
    
  if (!session) {
    return <div className="p-10 text-center font-bold text-red-500">Session not found!</div>
  }
  
  // Fetch transcript
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
    
  // Fetch signed video URL (valid for 1 hour)
  const { data: videoData } = await supabase
    .storage
    .from('session-recordings')
    .createSignedUrl(`${sessionId}/recording.webm`, 3600);
    
  const videoUrl = videoData?.signedUrl;
  const report = session.reports?.[0];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Candidate Review: <span className="text-blue-600">{session.users?.email}</span>
          </h1>
          <p className="text-slate-500 font-medium capitalize mt-1">
            {session.role} &bull; {session.difficulty} level &bull; {new Date(session.created_at).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">AI Final Score</p>
          <div className="text-4xl font-black text-slate-900">{report?.overall_score || '?'}<span className="text-xl text-slate-400">/10</span></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Video & Report Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Webcam Recording</span>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </div>
            {videoUrl ? (
              <video src={videoUrl} controls className="w-full aspect-video object-cover" />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center text-slate-500 text-sm font-bold bg-slate-900">
                No Video Recorded
              </div>
            )}
          </div>
          
          {report && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">AI Assessment</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{report.overall_summary}</p>
              
              <div className="space-y-3">
                {Object.entries(report.dimension_scores).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{key.replace('_', ' ')}</span>
                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">{val as number}/10</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
              Security Report <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-widest">Anti-Cheat</span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Tab Switches</span>
                <span className={`font-bold px-2 py-1 rounded-md text-sm ${session.tab_violations > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {session.tab_violations || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Face Visibility Warnings</span>
                <span className={`font-bold px-2 py-1 rounded-md text-sm ${session.face_violations > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {session.face_violations || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Full Transcript */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col max-h-[800px]">
            <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
              <h2 className="font-bold text-slate-900">Raw Interview Transcript</h2>
              <p className="text-xs text-slate-500">Unedited logs of the candidate's responses.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages?.map((msg: any) => (
                <div key={msg.id} className={`flex ${msg.role === 'interviewer' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`p-4 rounded-2xl max-w-[85%] ${
                    msg.role === 'interviewer' 
                      ? 'bg-slate-100 text-slate-800 rounded-tl-sm' 
                      : 'bg-blue-600 text-white rounded-tr-sm shadow-md'
                  }`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-50 mb-1">
                      {msg.role === 'interviewer' ? 'AI Interviewer' : 'Candidate'}
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {(!messages || messages.length === 0) && (
                <div className="text-center text-slate-400 py-10 font-medium">No messages found.</div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
