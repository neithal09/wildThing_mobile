import { useState } from 'react';
import { Star, Play, Users, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { shows, courses, experts, topics } from '../data/mockData';
import { ExploreTab as ExploreTabType } from '../types';

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

const TABS: { key: ExploreTabType; label: string }[] = [
  { key: 'shows', label: 'Watch' },
  { key: 'learn', label: 'Edges' },
  { key: 'experts', label: 'Voices' },
  { key: 'topics', label: 'Moods' },
];

const COURSE_CATEGORIES = ['All', 'Slow burn', 'Two of us', 'Tease', 'Tied up'];

export default function ExploreTab() {
  const [tab, setTab] = useState<ExploreTabType>('shows');
  const [courseCategory, setCourseCategory] = useState('All');
  const [following, setFollowing] = useState<string[]>([]);

  const filteredCourses = courseCategory === 'All'
    ? courses
    : courses.filter(c => c.category === courseCategory);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-chocolate-500/95 backdrop-blur border-b border-chocolate-300">
        <div className="px-4 pt-4 pb-3">
          <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400 mb-1">Crave</div>
          <h1 className="font-display text-2xl text-cream-100 leading-tight">What are we <em className="italic text-martini-400">hungry</em> for?</h1>
        </div>
        <div className="flex px-4 gap-1 pb-3">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                tab === t.key
                  ? 'bg-rust-500 text-cream-100 shadow-sm'
                  : 'text-cream-100/50 hover:text-cream-100/80 hover:bg-chocolate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        {/* Shows */}
        {tab === 'shows' && (
          <div className="space-y-4">
            {/* Hero show */}
            <div className="rounded-3xl overflow-hidden relative">
              <img src={shows[0].banner} alt={shows[0].title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-rust-500 text-cream-100 px-2 py-0.5 rounded-full font-semibold">{shows[0].category}</span>
                  <div className="flex items-center gap-1">
                    <Star size={11} fill="gold" className="text-martini-400" />
                    <span className="text-cream-100 text-xs font-medium">{shows[0].rating}</span>
                  </div>
                </div>
                <h3 className="text-cream-100 font-display text-2xl">{shows[0].title}</h3>
                <p className="text-cream-100/70 italic text-xs mt-1 line-clamp-2">{shows[0].description}</p>
                <button className="mt-2 flex items-center gap-1.5 bg-martini-400 text-chocolate-500 px-4 py-1.5 rounded-full text-sm font-bold">
                  <Play size={12} fill="currentColor" /> Slip in
                </button>
              </div>
            </div>

            {shows.map(show => (
              <div key={show.id} className="bg-chocolate-300 rounded-2xl border border-chocolate-300 overflow-hidden shadow-sm">
                <img src={show.banner} alt={show.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-cream-100">{show.title}</h4>
                    <div className="flex items-center gap-1">
                      <Star size={12} fill="gold" className="text-martini-400" />
                      <span className="text-xs text-cream-100/70 font-medium">{show.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-cream-100/50 mb-3 line-clamp-2">{show.description}</p>
                  <div className="space-y-2">
                    {show.episodes.map(ep => (
                      <button key={ep.id} className="w-full flex items-center gap-3 bg-chocolate-300 rounded-xl p-2.5 hover:bg-chocolate-200 transition">
                        <img src={ep.thumbnail} alt={ep.title} className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <div className="text-sm font-semibold text-cream-100">Ep {ep.number}: {ep.title}</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Clock size={10} className="text-cream-100/40" />
                            <span className="text-xs text-cream-100/40">{ep.duration}</span>
                          </div>
                        </div>
                        <Play size={16} className="text-rust-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Learn */}
        {tab === 'learn' && (
          <div>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
              {COURSE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCourseCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    courseCategory === cat
                      ? 'bg-chocolate-500 text-cream-100'
                      : 'bg-chocolate-200 text-cream-100/70 hover:bg-chocolate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-chocolate-300 rounded-2xl border border-chocolate-300 overflow-hidden shadow-sm flex gap-0">
                  <img src={course.thumbnail} alt={course.title} className="w-28 object-cover flex-shrink-0" />
                  <div className="p-3 flex-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      course.level === 'Beginner' ? 'bg-martini-400/30 text-martini-200' :
                      course.level === 'Intermediate' ? 'bg-violet-600/30 text-violet-100' :
                      'bg-rust-100 text-rust-700'
                    }`}>{course.level}</span>
                    <h4 className="font-bold text-cream-100 text-sm mt-1 mb-1 leading-tight">{course.title}</h4>
                    <p className="text-xs text-cream-100/50 mb-2">{course.expert.name}</p>
                    <div className="flex items-center gap-3 text-xs text-cream-100/40">
                      <span className="flex items-center gap-1"><Clock size={10} />{course.duration}</span>
                      <span className="flex items-center gap-1"><Users size={10} />{formatNumber(course.enrolled)}</span>
                    </div>
                    {/* Progress bar placeholder */}
                    <div className="mt-2 h-1.5 bg-chocolate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-rust-400 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experts */}
        {tab === 'experts' && (
          <div className="space-y-3">
            {experts.map(expert => (
              <div key={expert.id} className="bg-chocolate-300 rounded-2xl border border-chocolate-300 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={expert.avatar} alt={expert.name} className="w-16 h-16 rounded-2xl object-cover" />
                    {expert.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-rust-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle size={10} className="text-cream-100" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-cream-100">{expert.name}</h4>
                    </div>
                    <p className="text-sm text-cream-100/50 mb-2">{expert.specialty}</p>
                    <div className="flex gap-4 text-xs text-cream-100/40">
                      <span><b className="text-cream-100/80">{formatNumber(expert.followers)}</b> followers</span>
                      <span><b className="text-cream-100/80">{expert.videos}</b> videos</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setFollowing(p => p.includes(expert.id) ? p.filter(x => x !== expert.id) : [...p, expert.id])}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                      following.includes(expert.id)
                        ? 'bg-chocolate-200 text-cream-100/70 border border-chocolate-200'
                        : 'bg-rust-500 text-cream-100 shadow-sm shadow-rust-200'
                    }`}
                  >
                    {following.includes(expert.id) ? 'Following' : 'Follow'}
                  </button>
                </div>
                <button className="mt-3 w-full flex items-center justify-between bg-chocolate-400 rounded-xl px-3 py-2 hover:bg-chocolate-200 transition">
                  <span className="text-xs text-cream-100/70 font-medium italic">Open their drawer</span>
                  <ChevronRight size={14} className="text-cream-100/40" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Topics */}
        {tab === 'topics' && (
          <div>
            <p className="text-sm text-cream-100/60 italic mb-4">Pick a mood. We'll meet you there.</p>
            <div className="grid grid-cols-2 gap-3">
              {topics.map((topic, i) => {
                const colors = [
                  'from-rust-500 to-martini-500',
                  'from-violet-500 to-violet-300',
                  'from-rust-600 to-rust-400',
                  'from-martini-500 to-martini-300',
                  'from-violet-600 to-rust-500',
                  'from-rust-400 to-violet-500',
                ];
                return (
                  <button
                    key={topic}
                    className={`bg-gradient-to-br ${colors[i % colors.length]} rounded-2xl p-4 text-left shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150`}
                  >
                    <div className="text-cream-100/70 text-[10px] font-semibold tracking-widest uppercase mb-1">Mood</div>
                    <div className="text-cream-100 font-display text-lg leading-tight">{topic}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
