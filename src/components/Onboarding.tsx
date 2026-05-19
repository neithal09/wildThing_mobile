import { useState } from 'react';
import { Shield, Globe, ChevronRight, Check } from 'lucide-react';

const interests = [
  { id: 'slow-burn', label: 'Slow burns', icon: '✦' },
  { id: 'after-dark', label: 'After dark', icon: '✧' },
  { id: 'tease', label: 'The tease', icon: '♡' },
  { id: 'whispers', label: 'Whispers', icon: '◈' },
  { id: 'tied-up', label: 'Tied up', icon: '◎' },
  { id: 'two-of-us', label: 'Two of us', icon: '⟡' },
  { id: 'goosebumps', label: 'Goosebumps', icon: '◇' },
  { id: 'edge', label: 'Walk the edge', icon: '○' },
];

interface Props {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [mode, setMode] = useState<'private' | 'social' | null>(null);

  const toggleInterest = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    if (step === 1) return selected.length >= 1;
    if (step === 2) return mode !== null;
    return true;
  };

  const steps = [
    {
      content: (
        <div className="flex flex-col items-center text-center px-6 pt-10">
          <img src="/wild-logo.png" alt="WiildThing" className="w-24 h-24 object-contain mb-8 drop-shadow-[0_8px_30px_rgba(170,70,43,0.4)]" />
          <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400 mb-3">An invitation</div>
          <h1 className="font-display text-4xl text-cream-100 mb-4 leading-[1.05]">
            Give in <em className="italic text-martini-400">to desire.</em>
          </h1>
          <p className="text-cream-100/60 text-sm leading-relaxed max-w-xs">
            We deal in heat. We deal in hunger. Step beyond the edge of hesitation — the wild thing within you is eternal.
          </p>
          <div className="mt-10 space-y-3 w-full max-w-sm">
            {[
              'No distance. Just raw, real talk about desire.',
              'Tools, toys and temptations — no lessons.',
              'Anonymous if you want it. Loud if you don\'t.',
            ].map(f => (
              <div key={f} className="flex items-center gap-3 bg-chocolate-400 rounded-2xl px-4 py-3 border border-chocolate-300">
                <div className="w-7 h-7 rounded-full bg-rust-500/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-martini-400" strokeWidth={3} />
                </div>
                <span className="text-sm text-cream-100/80 font-medium text-left">{f}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col px-6 pt-10">
          <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400 mb-2">Pick your poison</div>
          <h2 className="font-display text-3xl text-cream-100 mb-2 leading-tight">What gets your <em className="italic text-martini-400">wild</em> side going?</h2>
          <p className="text-cream-100/50 text-sm mb-8">Tap a few. We'll keep your secrets.</p>
          <div className="grid grid-cols-2 gap-3">
            {interests.map(item => {
              const active = selected.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleInterest(item.id)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-4 border transition-all duration-200 ${
                    active
                      ? 'border-martini-400 bg-rust-500/15'
                      : 'border-chocolate-300 bg-chocolate-400 hover:border-chocolate-200'
                  }`}
                >
                  <span className={`text-lg ${active ? 'text-martini-400' : 'text-cream-100/40'}`}>{item.icon}</span>
                  <span className={`text-sm font-semibold ${active ? 'text-cream-100' : 'text-cream-100/80'}`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col px-6 pt-10">
          <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400 mb-2">How wild are we feeling</div>
          <h2 className="font-display text-3xl text-cream-100 mb-2 leading-tight">Hide, or be <em className="italic text-martini-400">heard.</em></h2>
          <p className="text-cream-100/50 text-sm mb-8">Switch any time. We don't keep receipts.</p>
          <div className="space-y-4">
            <button
              onClick={() => setMode('private')}
              className={`w-full flex items-start gap-4 rounded-2xl px-5 py-5 border transition-all duration-200 ${
                mode === 'private'
                  ? 'border-martini-400 bg-rust-500/15'
                  : 'border-chocolate-300 bg-chocolate-400 hover:border-chocolate-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${mode === 'private' ? 'bg-rust-500/30' : 'bg-chocolate-200'}`}>
                <Shield size={22} className={mode === 'private' ? 'text-martini-400' : 'text-cream-100/40'} />
              </div>
              <div className="text-left">
                <div className="font-bold text-cream-100 mb-1">Behind velvet</div>
                <div className="text-sm text-cream-100/60 leading-relaxed">Anonymous. No face, no name. Just the wild thing.</div>
              </div>
              {mode === 'private' && (
                <div className="ml-auto w-6 h-6 rounded-full bg-martini-400 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-chocolate-500" strokeWidth={3} />
                </div>
              )}
            </button>
            <button
              onClick={() => setMode('social')}
              className={`w-full flex items-start gap-4 rounded-2xl px-5 py-5 border transition-all duration-200 ${
                mode === 'social'
                  ? 'border-violet-300 bg-violet-500/20'
                  : 'border-chocolate-300 bg-chocolate-400 hover:border-chocolate-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${mode === 'social' ? 'bg-violet-500/40' : 'bg-chocolate-200'}`}>
                <Globe size={22} className={mode === 'social' ? 'text-violet-200' : 'text-cream-100/40'} />
              </div>
              <div className="text-left">
                <div className="font-bold text-cream-100 mb-1">In the open</div>
                <div className="text-sm text-cream-100/60 leading-relaxed">Build a profile. Be a voice. Send nudes to yourself.</div>
              </div>
              {mode === 'social' && (
                <div className="ml-auto w-6 h-6 rounded-full bg-violet-300 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-chocolate-500" strokeWidth={3} />
                </div>
              )}
            </button>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col px-6 pt-10">
          <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400 mb-2">The voices</div>
          <h2 className="font-display text-3xl text-cream-100 mb-2 leading-tight">Keepers of your <em className="italic text-martini-400">secrets.</em></h2>
          <p className="text-cream-100/50 text-sm mb-8">Silent companions on the voyage. Follow a few.</p>
          <div className="space-y-4">
            {[
              { name: 'Maya Reeves', spec: 'Voice behind the manifesto', img: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=80' },
              { name: 'Priya Nair', spec: 'Whispered confessions only', img: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=80' },
              { name: 'Jordan Kai', spec: 'Curator of slow burns', img: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=80' },
              { name: 'Marcus Bell', spec: 'Editor of after-dark stories', img: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=80' },
            ].map(e => (
              <div key={e.name} className="flex items-center gap-4 bg-chocolate-400 rounded-2xl px-4 py-3 border border-chocolate-300">
                <img src={e.img} alt={e.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="font-semibold text-cream-100 text-sm">{e.name}</div>
                  <div className="text-xs text-cream-100/50 italic">{e.spec}</div>
                </div>
                <button className="px-4 py-1.5 rounded-full bg-rust-500 text-cream-100 text-xs font-semibold">Follow</button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col bg-chocolate-500">
      <div className="flex-1 overflow-y-auto pb-32">
        {steps[step].content}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-chocolate-500 border-t border-chocolate-300 px-6 py-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-martini-400' : i < step ? 'w-4 bg-rust-500' : 'w-4 bg-chocolate-200'
                }`}
              />
            ))}
          </div>
          {step < steps.length - 1 && (
            <button onClick={() => setStep(steps.length - 1)} className="text-sm text-cream-100/40 hover:text-cream-100/70 italic">
              Maybe later
            </button>
          )}
        </div>
        <button
          onClick={() => {
            if (step < steps.length - 1) setStep(s => s + 1);
            else onComplete();
          }}
          disabled={!canNext()}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
            canNext()
              ? 'bg-rust-500 text-cream-100 shadow-lg shadow-rust-700/40 hover:bg-rust-600 active:scale-[0.98]'
              : 'bg-chocolate-200 text-cream-100/40 cursor-not-allowed'
          }`}
        >
          {step < steps.length - 1 ? 'Take me further' : 'Give in'}
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
