import { useState } from 'react';
import { Shield, Settings, Bookmark, ShoppingBag, FileText, Gift, Eye, Bell, ChevronRight, Star } from 'lucide-react';

export default function ProfileTab() {
  const [anonymous, setAnonymous] = useState(false);
  const [activeSection, setActiveSection] = useState<'posts' | 'saved' | 'purchases'>('posts');

  return (
    <div className="flex flex-col pb-6">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-violet-700 to-chocolate-500 px-4 pt-10 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400">Mine</div>
            <h1 className="text-cream-100 font-display text-xl italic leading-none">The wild thing</h1>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-100/10 hover:bg-cream-100/20 transition">
            <Settings size={18} className="text-cream-100" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-rust-400 to-martini-300 flex items-center justify-center shadow-lg">
              <span className="text-cream-100 text-2xl font-bold">J</span>
            </div>
            {anonymous && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-chocolate-500 rounded-full flex items-center justify-center border-2 border-chocolate-200">
                <Shield size={11} className="text-rust-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-cream-100 font-display text-2xl leading-tight">{anonymous ? 'Behind velvet' : 'velvet_42'}</h2>
            <p className="text-cream-100/50 text-xs italic">Wild since Jan 2025</p>
            <div className="flex gap-4 mt-2">
              {[{ v: '12', l: 'Teases' }, { v: '48', l: 'Voices' }, { v: '2,450', l: 'Indulgences' }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-martini-400 font-display text-lg leading-none">{s.v}</div>
                  <div className="text-cream-100/40 text-[10px] uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Anonymous Toggle */}
      <div className="mx-4 -mt-6 bg-chocolate-300 rounded-2xl shadow-sm border border-chocolate-300 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rust-50 flex items-center justify-center">
            <Shield size={18} className="text-rust-500" />
          </div>
          <div>
            <div className="font-semibold text-cream-100 text-sm">Behind velvet</div>
            <div className="text-xs text-cream-100/50 italic">No face. No name. Just the wild thing.</div>
          </div>
        </div>
        <button
          onClick={() => setAnonymous(p => !p)}
          className={`w-12 h-6 rounded-full transition-all duration-300 relative ${anonymous ? 'bg-rust-500' : 'bg-chocolate-200'}`}
        >
          <div className={`absolute top-0.5 w-5 h-5 bg-chocolate-300 rounded-full shadow-sm transition-all duration-300 ${anonymous ? 'left-6' : 'left-0.5'}`} />
        </button>
      </div>

      {/* Indulgences card */}
      <div className="mx-4 mt-3 bg-gradient-to-r from-rust-600 to-violet-600 rounded-2xl p-4 flex items-center gap-4 border border-martini-400/30">
        <div className="w-12 h-12 bg-cream-100/15 rounded-xl flex items-center justify-center">
          <Star size={22} className="text-martini-400" fill="currentColor" />
        </div>
        <div className="flex-1">
          <div className="text-martini-400 text-[10px] tracking-[0.3em] uppercase font-semibold">Your indulgences</div>
          <div className="text-cream-100 font-display text-3xl leading-tight">2,450</div>
          <div className="text-cream-100/70 text-xs italic">Keeper of secrets — unlocked.</div>
        </div>
        <button className="bg-martini-400 hover:bg-martini-300 text-chocolate-500 text-xs font-bold px-3 py-1.5 rounded-full transition">
          Spend
        </button>
      </div>

      {/* Marks */}
      <div className="px-4 mt-5">
        <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-2">Marks left on you</div>
        <div className="flex gap-3">
          {[
            { label: 'Keeper of secrets', mono: 'i', color: 'bg-rust-500/20 border-rust-400/40' },
            { label: '3am regular', mono: 'ii', color: 'bg-violet-600/40 border-violet-300/40' },
            { label: 'Slow burn devotee', mono: 'iii', color: 'bg-martini-500/25 border-martini-400/40' },
          ].map(b => (
            <div key={b.label} className={`flex-1 ${b.color} border rounded-2xl p-3 text-center`}>
              <div className="font-display text-2xl italic text-martini-400 mb-1">{b.mono}</div>
              <div className="text-[11px] font-semibold text-cream-100/80 leading-tight">{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="px-4 mt-5">
        <div className="flex bg-chocolate-200 rounded-xl p-1 mb-4">
          {([['posts', FileText, 'Mine'], ['saved', Bookmark, 'Velvet drawer'], ['purchases', ShoppingBag, 'Spoils']] as const).map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeSection === key ? 'bg-chocolate-300 text-cream-100 shadow-sm' : 'text-cream-100/50'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {activeSection === 'posts' && (
            <>
              {['Whispered "tied up tonight?" — got 312 replies.', 'A confession sealed with trembling hands.', 'Slipped into the 3am DMs. Anonymously.'].map((t, i) => (
                <div key={i} className="bg-chocolate-400 rounded-xl border border-chocolate-300 px-4 py-3 text-sm text-cream-100/80 italic">{t}</div>
              ))}
            </>
          )}
          {activeSection === 'saved' && (
            <div className="text-center py-8 text-cream-100/50 text-sm italic">The velvet drawer is empty. For now.</div>
          )}
          {activeSection === 'purchases' && (
            <div className="text-center py-8 text-cream-100/50 text-sm italic">Nothing taken home yet.</div>
          )}
        </div>
      </div>

      {/* Spoils */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400">Waiting for you</div>
          <Gift size={16} className="text-martini-400" />
        </div>
        <div className="bg-gradient-to-r from-violet-700 to-rust-600 rounded-2xl p-4 flex items-center justify-between border border-martini-400/30">
          <div>
            <div className="font-display text-xl text-cream-100 leading-tight">20% off, just for being wiild</div>
            <div className="text-xs text-cream-100/60 italic mt-0.5">Until June 30. Don't be polite about it.</div>
          </div>
          <button className="bg-martini-400 text-chocolate-500 text-sm font-bold px-4 py-2 rounded-xl hover:bg-martini-300 transition">Take it</button>
        </div>
      </div>

      {/* Settings Links */}
      <div className="px-4 mt-5">
        <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-2">Behind the scenes</div>
        <div className="bg-chocolate-300 rounded-2xl border border-chocolate-300 overflow-hidden divide-y divide-chocolate-300">
          {[
            { icon: Eye, label: 'Who sees what' },
            { icon: Bell, label: 'How loud we whisper' },
            { icon: Settings, label: 'The fine print' },
          ].map(item => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-chocolate-300 transition">
              <item.icon size={16} className="text-cream-100/50" />
              <span className="text-sm text-cream-100/80 font-medium flex-1 text-left">{item.label}</span>
              <ChevronRight size={15} className="text-cream-100/30" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
