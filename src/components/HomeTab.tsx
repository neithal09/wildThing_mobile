import { useState } from 'react';
import { Search, Bell, Heart, MessageCircle, Bookmark, Share2, Play, Flame, TrendingUp, Radio } from 'lucide-react';
import { videos, topics, shows } from '../data/mockData';
import { VideoCard } from '../types';

interface Props {
  onVideoClick: (video: VideoCard) => void;
  onLiveClick: () => void;
}

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function HomeTab({ onVideoClick, onLiveClick }: Props) {
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [notifDot, setNotifDot] = useState(true);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-chocolate-500/95 backdrop-blur border-b border-chocolate-300 px-4 py-3 flex items-center gap-3">
        <img src="/wild-logo.png" alt="Wild" className="w-9 h-9 rounded-full object-contain bg-chocolate-400 p-1" />
        <div className="flex-1 flex items-center bg-chocolate-200 rounded-full px-3 py-2 gap-2">
          <Search size={14} className="text-cream-100/40" />
          <span className="text-sm text-cream-100/40 italic">What are you in the mood for...</span>
        </div>
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-chocolate-200 transition"
          onClick={() => setNotifDot(false)}
        >
          <Bell size={20} className="text-cream-100/70" />
          {notifDot && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rust-500 rounded-full" />}
        </button>
      </div>

      {/* For You chip */}
      <div className="px-4 pt-5 pb-3">
        <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-1">Tonight's tease</div>
        <h2 className="font-display text-2xl text-cream-100 leading-tight flex items-center gap-2">
          <Flame size={18} className="text-rust-400" />
          <span>Wide awake? <em className="italic text-martini-400">Must be us.</em></span>
        </h2>
      </div>

      {/* Video Feed */}
      <div className="space-y-4 px-4">
        {videos.map(video => (
          <div
            key={video.id}
            className="rounded-3xl overflow-hidden bg-chocolate-300 shadow-sm border border-chocolate-300 cursor-pointer"
            onClick={() => onVideoClick(video)}
          >
            <div className="relative aspect-video bg-chocolate-500">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <img src={video.creator.avatar} alt={video.creator.name} className="w-6 h-6 rounded-full border border-cream-100/60 object-cover" />
                  <span className="text-cream-100 text-xs font-medium">{video.creator.name}</span>
                  {video.creator.verified && (
                    <span className="text-xs bg-rust-500/90 text-cream-100 px-1.5 py-0.5 rounded-full font-semibold">✔ Expert</span>
                  )}
                </div>
                <p className="text-cream-100 text-sm font-semibold leading-snug line-clamp-2">{video.title}</p>
              </div>
              <div className="absolute top-3 right-3 bg-black/60 text-cream-100 text-xs px-2 py-0.5 rounded-full font-medium">
                {video.duration}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-cream-100/20 backdrop-blur-sm flex items-center justify-center border border-cream-100/30">
                  <Play size={22} className="text-cream-100 ml-1" fill="white" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={e => { e.stopPropagation(); setLiked(p => p.includes(video.id) ? p.filter(x => x !== video.id) : [...p, video.id]); }}
                    className="flex items-center gap-1.5 group"
                  >
                    <Heart
                      size={18}
                      className={`transition-all duration-200 ${liked.includes(video.id) ? 'text-rust-500 fill-rust-500 scale-110' : 'text-cream-100/40 group-hover:text-rust-400'}`}
                    />
                    <span className={`text-sm font-medium ${liked.includes(video.id) ? 'text-rust-500' : 'text-cream-100/50'}`}>
                      {formatNumber(video.likes + (liked.includes(video.id) ? 1 : 0))}
                    </span>
                  </button>
                  <button className="flex items-center gap-1.5">
                    <MessageCircle size={18} className="text-cream-100/40" />
                    <span className="text-sm text-cream-100/50 font-medium">{formatNumber(video.comments)}</span>
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setSaved(p => p.includes(video.id) ? p.filter(x => x !== video.id) : [...p, video.id]); }}
                    className="flex items-center gap-1.5"
                  >
                    <Bookmark
                      size={18}
                      className={`transition-all duration-200 ${saved.includes(video.id) ? 'text-martini-500 fill-martini-500' : 'text-cream-100/40'}`}
                    />
                    <span className="text-sm text-cream-100/50 font-medium">{formatNumber(video.saves + (saved.includes(video.id) ? 1 : 0))}</span>
                  </button>
                </div>
                <button onClick={e => e.stopPropagation()}>
                  <Share2 size={18} className="text-cream-100/40" />
                </button>
              </div>
              {/* Product strip */}
              {video.products && video.products.length > 0 && (
                <div className="mt-3 flex items-center gap-3 bg-chocolate-400 rounded-2xl px-3 py-2.5 border border-martini-400/30">
                  <img src={video.products[0].image} alt={video.products[0].name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-[10px] tracking-widest uppercase text-martini-400 font-semibold">{video.products[0].tag}</div>
                    <div className="text-sm font-display text-cream-100 leading-tight">{video.products[0].name}</div>
                  </div>
                  <button
                    onClick={e => e.stopPropagation()}
                    className="text-xs bg-rust-500 text-cream-100 px-3 py-1.5 rounded-xl font-bold hover:bg-rust-600 transition"
                  >
                    Take it home
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Show */}
      <div className="mt-8 px-4">
        <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-1">After dark</div>
        <h2 className="font-display text-2xl text-cream-100 leading-tight mb-3 flex items-center gap-2">
          <Play size={14} className="text-rust-400" fill="currentColor" />
          A long, slow watch
        </h2>
        <div className="bg-chocolate-400 rounded-3xl overflow-hidden border border-chocolate-300">
          <img src={shows[0].banner} alt={shows[0].title} className="w-full h-36 object-cover opacity-80" />
          <div className="p-4">
            <h3 className="text-cream-100 font-display text-xl mb-1">{shows[0].title}</h3>
            <p className="text-cream-100/60 text-xs italic mb-3 line-clamp-2">{shows[0].description}</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {shows[0].episodes.map(ep => (
                <button key={ep.id} className="flex-shrink-0 bg-cream-100/10 hover:bg-cream-100/20 text-cream-100 text-xs px-4 py-2 rounded-full font-medium transition border border-cream-100/10">
                  Ep {ep.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Now */}
      <div className="mt-6 px-4">
        <button
          onClick={onLiveClick}
          className="w-full flex items-center gap-4 bg-gradient-to-r from-rust-600 to-violet-600 rounded-3xl p-4 shadow-lg shadow-rust-700/40 border border-martini-400/30"
        >
          <div className="w-12 h-12 rounded-2xl bg-cream-100/15 flex items-center justify-center">
            <Radio size={22} className="text-martini-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 bg-martini-400 rounded-full animate-pulse" />
              <span className="text-martini-400 text-[10px] font-semibold tracking-[0.25em] uppercase">Live · 3am club</span>
            </div>
            <span className="text-cream-100 font-display text-base italic">"Whisper to me about strangers"</span>
          </div>
          <span className="text-cream-100/80 text-sm font-semibold">Slip in →</span>
        </button>
      </div>

      {/* Trending Topics */}
      <div className="mt-8 px-4 pb-6">
        <div className="text-[10px] tracking-[0.3em] uppercase text-martini-400 mb-1">In the air tonight</div>
        <h2 className="font-display text-2xl text-cream-100 leading-tight mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-rust-400" />
          Trending hungers
        </h2>
        <div className="flex flex-wrap gap-2">
          {topics.slice(0, 8).map(t => (
            <button key={t} className="px-3 py-1.5 bg-chocolate-400 hover:bg-rust-500/30 hover:text-martini-400 border border-chocolate-300 text-cream-100/70 text-sm rounded-full font-medium transition-colors duration-150">
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
