import { useState, useEffect } from 'react';
import { X, Radio, Send, BarChart2 } from 'lucide-react';

const MOCK_CHAT = [
  { user: 'Anonymous', msg: 'This is so helpful, thank you!', time: 0 },
  { user: 'wellness_jay', msg: 'Question: how do I start this conversation?', time: 1200 },
  { user: 'Anonymous', msg: 'I\'ve been waiting for this topic', time: 2800 },
  { user: 'curious_learner', msg: 'Dr. Nair you\'re amazing!', time: 4500 },
  { user: 'Anonymous', msg: 'Can you say more about communication?', time: 6100 },
];

const POLL = {
  question: 'Have you ever discussed this with a partner?',
  options: ['Yes, openly', 'Sort of, not fully', 'No, not yet'],
  votes: [42, 31, 27],
};

interface Props {
  onClose: () => void;
}

export default function LiveSessionModal({ onClose }: Props) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(MOCK_CHAT.slice(0, 2));
  const [pollVoted, setPollVoted] = useState<number | null>(null);
  const [viewers, setViewers] = useState(2341);

  useEffect(() => {
    const intervals: ReturnType<typeof setTimeout>[] = [];
    MOCK_CHAT.slice(2).forEach(msg => {
      intervals.push(setTimeout(() => {
        setMessages(p => [...p, msg]);
      }, msg.time));
    });
    const viewerInterval = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 5 - 2));
    }, 3000);
    return () => {
      intervals.forEach(clearTimeout);
      clearInterval(viewerInterval);
    };
  }, []);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(p => [...p, { user: 'You', msg: chatInput, time: Date.now() }]);
    setChatInput('');
  };

  const totalVotes = POLL.votes.reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Live video */}
      <div className="relative" style={{ height: '50%' }}>
        <img
          src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Live"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Top bar */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-rust-600 text-cream-100 px-3 py-1 rounded-full">
              <Radio size={12} className="animate-pulse" />
              <span className="text-xs font-bold tracking-wide">LIVE</span>
            </div>
            <div className="bg-black/60 backdrop-blur text-cream-100 text-xs px-3 py-1 rounded-full font-medium">
              {viewers.toLocaleString()} watching
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center"
          >
            <X size={18} className="text-cream-100" />
          </button>
        </div>

        {/* Host info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-rust-400 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=80"
              alt="Host"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-cream-100 text-xs font-bold">Dr. Priya Nair</div>
            <div className="text-cream-100/60 text-xs">Certified Sex Educator</div>
          </div>
        </div>
      </div>

      {/* Bottom panel */}
      <div className="flex-1 flex flex-col bg-chocolate-600 overflow-hidden">
        {/* Poll widget */}
        <div className="mx-4 mt-3 bg-chocolate-300/5 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 size={13} className="text-rust-400" />
            <span className="text-cream-100 text-xs font-bold">Live Poll</span>
          </div>
          <p className="text-cream-100/80 text-xs mb-2">{POLL.question}</p>
          <div className="space-y-1.5">
            {POLL.options.map((opt, i) => {
              const pct = Math.round((POLL.votes[i] / totalVotes) * 100);
              const isVoted = pollVoted === i;
              return (
                <button
                  key={opt}
                  onClick={() => setPollVoted(i)}
                  className={`w-full relative rounded-xl overflow-hidden h-8 text-left transition-all duration-200 ${
                    isVoted ? 'ring-1 ring-rust-400' : 'hover:bg-chocolate-300/5'
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-xl transition-all duration-500 ${isVoted ? 'bg-rust-500/30' : 'bg-chocolate-300/5'}`}
                    style={{ width: pollVoted !== null ? `${pct}%` : '100%' }}
                  />
                  <div className="relative flex items-center justify-between px-3 h-full">
                    <span className="text-cream-100 text-xs font-medium">{opt}</span>
                    {pollVoted !== null && (
                      <span className="text-cream-100/60 text-xs font-bold">{pct}%</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rust-400 to-martini-300 flex items-center justify-center flex-shrink-0">
                <span className="text-cream-100 text-xs font-bold">{msg.user[0].toUpperCase()}</span>
              </div>
              <div>
                <span className="text-rust-400 text-xs font-semibold mr-2">{msg.user}</span>
                <span className="text-cream-100/80 text-sm">{msg.msg}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="flex items-center gap-2 px-4 py-3 bg-chocolate-500 border-t border-cream-100/5">
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask your question... (anonymous)"
            className="flex-1 bg-cream-100/10 text-cream-100 placeholder-white/30 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-rust-400"
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 bg-rust-500 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-rust-600 transition"
          >
            <Send size={15} className="text-cream-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
