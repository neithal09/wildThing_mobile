import { useState } from 'react';
  import { Video, FileText, HelpCircle, Shield, Upload, X, Check } from 'lucide-react';

const TAGS = ['#SlowBurn', '#3AM', '#TheSpaceBetween', '#Tease', '#GiveIn', '#AfterDark', '#Whispers', '#Heat'];

export default function CreateTab() {
  const [mode, setMode] = useState<'video' | 'story' | 'question' | null>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (t: string) => setSelectedTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  const handleSubmit = () => {
    if (!caption.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMode(null);
      setCaption('');
      setSelectedTags([]);
      setAnonymous(false);
    }, 2200);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-rust-500/30 flex items-center justify-center mb-4 animate-scale-in">
          <Check size={36} className="text-martini-400" strokeWidth={2.5} />
        </div>
        <h2 className="font-display text-3xl text-cream-100 mb-2">It's out there.</h2>
        <p className="text-cream-100/60 text-sm italic">Sealed with trembling hands. We'll let the right eyes find it.</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-martini-400 font-semibold animate-pulse">
          <span>+50 indulgences</span>
        </div>
      </div>
    );
  }

  if (!mode) {
    return (
      <div className="flex flex-col px-4 pt-10">
        <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400 mb-1">Tempt</div>
        <h1 className="font-display text-3xl text-cream-100 mb-2 leading-tight">Drop a <em className="italic text-martini-400">tease.</em></h1>
        <p className="text-cream-100/60 text-sm italic mb-8">Whisper it. Write it. Let someone find it at 3am.</p>
        <div className="space-y-3">
          {([
            { key: 'video', Icon: Video, title: 'A glimpse', desc: 'A short film. Texture, temperature, rhythm.', color: 'rust' },
            { key: 'story', Icon: FileText, title: 'A confession', desc: 'Murmured against warm skin. Words only.', color: 'martini' },
            { key: 'question', Icon: HelpCircle, title: 'A whisper', desc: 'Ask the room. No face, no name.', color: 'violet' },
          ] as const).map(({ key, Icon, title, desc, color }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`w-full flex items-center gap-4 bg-chocolate-300 rounded-2xl border-2 border-chocolate-300 hover:border-${color}-200 p-4 shadow-sm transition-all duration-200 hover:shadow-md text-left group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-${color}-50 flex items-center justify-center flex-shrink-0 group-hover:bg-${color}-100 transition`}>
                <Icon size={22} className={`text-${color}-500`} />
              </div>
              <div>
                <div className="font-display text-xl text-cream-100 leading-tight">{title}</div>
                <div className="text-sm text-cream-100/60 italic mt-0.5">{desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Your trail */}
        <div className="mt-8 bg-gradient-to-br from-violet-600 to-chocolate-500 rounded-3xl p-5 border border-martini-400/20">
          <div className="text-martini-400 text-[10px] font-semibold uppercase tracking-[0.3em] mb-3">Your wiild trail</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[{ v: '2,450', l: 'Indulgences' }, { v: '348', l: 'Glances' }, { v: '42', l: 'Touches' }].map(s => (
              <div key={s.l} className="bg-cream-100/10 rounded-xl p-2.5 text-center">
                <div className="text-cream-100 font-display text-xl">{s.v}</div>
                <div className="text-cream-100/60 text-[10px] uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Keeper of secrets', '3am regular'].map(b => (
              <span key={b} className="text-xs bg-cream-100/10 text-cream-100/80 px-3 py-1 rounded-full font-medium italic">{b}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-cream-100">
          {mode === 'video' ? 'A glimpse' : mode === 'story' ? 'A confession' : 'A whisper'}
        </h1>
        <button onClick={() => setMode(null)} className="w-9 h-9 rounded-full bg-chocolate-200 flex items-center justify-center hover:bg-chocolate-200 transition">
          <X size={18} className="text-cream-100/70" />
        </button>
      </div>

      {mode === 'video' && (
        <button className="w-full h-36 rounded-2xl border-2 border-dashed border-chocolate-200 flex flex-col items-center justify-center gap-2 hover:border-rust-300 hover:bg-rust-50/30 transition mb-4 group">
          <div className="w-12 h-12 rounded-full bg-chocolate-200 flex items-center justify-center group-hover:bg-rust-100 transition">
            <Upload size={20} className="text-cream-100/40 group-hover:text-rust-500 transition" />
          </div>
          <span className="text-sm text-cream-100/60 group-hover:text-martini-400 transition font-medium italic">Drop the glimpse here</span>
          <span className="text-xs text-cream-100/40">60 seconds. That's all you get.</span>
        </button>
      )}

      <div className="mb-4">
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder={mode === 'question' ? 'Ask the room. We won\'t tell.' : 'Say enough to spark. Then stop.'}
          className="w-full bg-chocolate-300 rounded-2xl border border-chocolate-200 px-4 py-3 text-sm text-cream-100 placeholder-gray-400 resize-none focus:outline-none focus:border-rust-300 focus:bg-chocolate-300 transition min-h-[100px]"
        />
        <div className="text-right text-xs text-cream-100/40 mt-1">{caption.length}/280</div>
      </div>

      <div className="mb-4">
        <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-2">Set the mood</div>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                selectedTags.includes(t)
                  ? 'bg-rust-500 text-cream-100'
                  : 'bg-chocolate-200 text-cream-100/70 hover:bg-chocolate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Anonymous toggle */}
      <div className="flex items-center justify-between bg-chocolate-300 rounded-2xl px-4 py-3 mb-6">
        <div className="flex items-center gap-3">
          <Shield size={18} className="text-martini-400" />
          <div>
            <div className="text-sm font-semibold text-cream-100">Behind velvet</div>
            <div className="text-xs text-cream-100/50 italic">No face. No name. Just the wild thing.</div>
          </div>
        </div>
        <button
          onClick={() => setAnonymous(p => !p)}
          className={`w-11 h-6 rounded-full transition-all duration-300 relative ${anonymous ? 'bg-rust-500' : 'bg-chocolate-200'}`}
        >
          <div className={`absolute top-0.5 w-5 h-5 bg-chocolate-300 rounded-full shadow-sm transition-all duration-300 ${anonymous ? 'left-5' : 'left-0.5'}`} />
        </button>
      </div>

      {/* House rules */}
      <div className="bg-violet-700/40 rounded-2xl px-4 py-3 mb-6 space-y-1.5 border border-violet-500/30">
        <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-1">House rules</div>
        {['Suggest, don\'t shout.', 'Innuendo over explicit.', 'No emojis. We don\'t need them.'].map(g => (
          <div key={g} className="flex items-center gap-2">
            <Check size={12} className="text-martini-400" strokeWidth={3} />
            <span className="text-xs text-cream-100/70 italic">{g}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!caption.trim()}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
          caption.trim()
            ? 'bg-rust-500 text-cream-100 shadow-lg shadow-rust-700/40 hover:bg-rust-600 active:scale-[0.98]'
            : 'bg-chocolate-200 text-cream-100/40 cursor-not-allowed'
        }`}
      >
        {anonymous ? 'Slip it out anonymously' : 'Send it out'}
      </button>
    </div>
  );
}
