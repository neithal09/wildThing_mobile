import { useState } from 'react';
import { Heart, MessageCircle, ChevronUp, ChevronDown, Award, Trophy } from 'lucide-react';
import { posts } from '../data/mockData';
import { CommunityTab as CommunityTabType } from '../types';

const TABS: { key: CommunityTabType; label: string }[] = [
  { key: 'discussions', label: 'Pillow talk' },
  { key: 'questions', label: '3am DMs' },
  { key: 'stories', label: 'Confessions' },
  { key: 'top10', label: 'Loudest' },
];

const top10 = [
  'I used to sip. Now I drink.',
  'The space between a glance and a touch — that\'s where I live now.',
  'Sent myself nudes for the first time. Highly recommend.',
  'Whispered "tied up tonight?" in his ear. Got my answer.',
  'Lit a candle. Locked the door. Forgot my name for a minute.',
  'My scent is armor. Don\'t test me.',
  'Buzzing at the edge for an hour. Worth it.',
  'Footsie under the table at his sister\'s wedding. Send help.',
  'The shiver down the spine? Real. Recorded it.',
  'Bad decisions made the best stories. I have nine more volumes.',
];

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function CommunityTab() {
  const [tab, setTab] = useState<CommunityTabType>('discussions');
  const [voted, setVoted] = useState<Record<string, 'up' | 'down' | null>>({});
  const [liked, setLiked] = useState<string[]>([]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-chocolate-500/95 backdrop-blur border-b border-chocolate-300">
        <div className="px-4 pt-4 pb-3">
          <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400 mb-1">Confess</div>
          <h1 className="font-display text-2xl text-cream-100 leading-tight">Tell me <em className="italic text-martini-400">everything.</em></h1>
        </div>
        <div className="flex px-4 gap-1 pb-3">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                tab === t.key
                  ? 'bg-chocolate-500 text-cream-100'
                  : 'text-cream-100/50 hover:text-cream-100/80 hover:bg-chocolate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-6 space-y-3">
        {(tab === 'discussions' || tab === 'questions' || tab === 'stories') && (
          <>
            {posts.map(post => (
              <div
                key={post.id}
                className={`bg-chocolate-300 rounded-2xl border p-4 shadow-sm ${
                  post.expert ? 'border-rust-200 bg-rust-50/30' : 'border-chocolate-300'
                }`}
              >
                {post.expert && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Award size={13} className="text-martini-400" />
                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-martini-400">From the voice · pinned</span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  {post.anonymous || !post.avatar ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chocolate-200 to-chocolate-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-cream-100/50 text-sm font-bold">?</span>
                    </div>
                  ) : (
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-sm text-cream-100">{post.author}</span>
                      {post.anonymous && (
                        <span className="text-[10px] tracking-wider uppercase bg-violet-700/50 text-violet-200 px-2 py-0.5 rounded-full italic">behind velvet</span>
                      )}
                      <span className="text-xs text-cream-100/40 ml-auto">{post.timeAgo}</span>
                    </div>
                    <p className="text-sm text-cream-100/80 leading-relaxed mb-3">{post.content}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-rust-600 font-medium bg-rust-50 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 bg-chocolate-200 rounded-full px-1 py-0.5">
                        <button
                          onClick={() => setVoted(p => ({ ...p, [post.id]: p[post.id] === 'up' ? null : 'up' }))}
                          className={`p-1 rounded-full transition ${voted[post.id] === 'up' ? 'text-rust-500' : 'text-cream-100/50 hover:text-cream-100/80'}`}
                        >
                          <ChevronUp size={14} strokeWidth={2.5} />
                        </button>
                        <span className="text-xs font-bold text-cream-100/80 min-w-[24px] text-center">
                          {formatNumber(post.likes + (voted[post.id] === 'up' ? 1 : voted[post.id] === 'down' ? -1 : 0))}
                        </span>
                        <button
                          onClick={() => setVoted(p => ({ ...p, [post.id]: p[post.id] === 'down' ? null : 'down' }))}
                          className={`p-1 rounded-full transition ${voted[post.id] === 'down' ? 'text-violet-300' : 'text-cream-100/50 hover:text-cream-100/80'}`}
                        >
                          <ChevronDown size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                      <button className="flex items-center gap-1.5 text-cream-100/50 hover:text-cream-100/80">
                        <MessageCircle size={15} />
                        <span className="text-xs font-medium">{post.replies} replies</span>
                      </button>
                      <button
                        onClick={() => setLiked(p => p.includes(post.id) ? p.filter(x => x !== post.id) : [...p, post.id])}
                        className="flex items-center gap-1 ml-auto"
                      >
                        <Heart
                          size={15}
                          className={liked.includes(post.id) ? 'text-rust-500 fill-rust-500' : 'text-cream-100/40'}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'top10' && (
          <div className="space-y-3">
            <div className="mb-3">
              <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-1 flex items-center gap-2">
                <Trophy size={12} className="text-martini-400" /> Loudest this week
              </div>
              <h2 className="font-display text-xl text-cream-100 italic">"Lahu munh lag gaya."</h2>
            </div>
            {top10.map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 bg-chocolate-300 rounded-2xl border border-chocolate-300 p-4 shadow-sm hover:border-chocolate-200 text-left transition">
                <span className={`text-xl font-black w-8 flex-shrink-0 ${
                  i === 0 ? 'text-martini-500' : i === 1 ? 'text-cream-100/40' : i === 2 ? 'text-martini-400' : 'text-cream-100/30'
                }`}>
                  {i + 1}
                </span>
                <p className="text-sm text-cream-100 font-medium leading-snug flex-1">"{item}"</p>
                <ChevronUp size={14} className="text-rust-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
