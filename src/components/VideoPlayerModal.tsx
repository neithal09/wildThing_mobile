import { useState } from 'react';
import { X, Heart, MessageCircle, Bookmark, Share2, ShoppingCart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { VideoCard } from '../types';

interface Props {
  video: VideoCard;
  onClose: () => void;
}

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function VideoPlayerModal({ video, onClose }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Video area */}
      <div className="relative flex-1">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-safe top-12 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
        >
          <X size={18} className="text-cream-100" />
        </button>

        {/* Duration */}
        <div className="absolute top-12 right-4 bg-black/60 text-cream-100 text-xs px-2 py-0.5 rounded-full font-medium">
          {video.duration}
        </div>

        {/* Fake play progress */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-cream-100/20">
          <div className="h-full bg-rust-400 w-1/3 rounded-full" />
        </div>

        {/* Right action bar */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5">
          <button
            onClick={() => setLiked(p => !p)}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${liked ? 'bg-rust-500' : 'bg-black/40 backdrop-blur'}`}>
              <Heart size={20} className={liked ? 'text-cream-100 fill-white' : 'text-cream-100'} />
            </div>
            <span className="text-cream-100 text-xs font-medium">{formatNumber(video.likes + (liked ? 1 : 0))}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
              <MessageCircle size={20} className="text-cream-100" />
            </div>
            <span className="text-cream-100 text-xs font-medium">{formatNumber(video.comments)}</span>
          </button>
          <button onClick={() => setSaved(p => !p)} className="flex flex-col items-center gap-1">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${saved ? 'bg-martini-500' : 'bg-black/40 backdrop-blur'}`}>
              <Bookmark size={20} className={saved ? 'text-cream-100 fill-white' : 'text-cream-100'} />
            </div>
            <span className="text-cream-100 text-xs font-medium">{formatNumber(video.saves + (saved ? 1 : 0))}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
              <Share2 size={20} className="text-cream-100" />
            </div>
            <span className="text-cream-100 text-xs font-medium">Share</span>
          </button>
        </div>

        {/* Creator info + title */}
        <div className="absolute bottom-10 left-4 right-16 pr-4">
          <div className="flex items-center gap-2 mb-2">
            <img src={video.creator.avatar} alt={video.creator.name} className="w-8 h-8 rounded-full object-cover border-2 border-cream-100/50" />
            <span className="text-cream-100 text-sm font-semibold">{video.creator.name}</span>
            {video.creator.verified && (
              <span className="text-xs bg-rust-500/90 text-cream-100 px-1.5 py-0.5 rounded-full font-bold">✔</span>
            )}
          </div>
          <p className="text-cream-100 text-sm font-semibold leading-snug line-clamp-2 mb-2">{video.title}</p>
          <div className="flex gap-1.5 flex-wrap">
            {video.tags.map(t => (
              <span key={t} className="text-xs text-cream-100/70 bg-cream-100/10 px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Panel */}
      {video.products && video.products.length > 0 && (
        <div className="bg-chocolate-500 border-t border-cream-100/10">
          <button
            onClick={() => setProductExpanded(p => !p)}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={16} className="text-martini-400" />
              <span className="text-martini-400 text-[10px] tracking-[0.3em] uppercase font-semibold">Taste of this</span>
            </div>
            {productExpanded ? <ChevronDown size={16} className="text-cream-100/60" /> : <ChevronUp size={16} className="text-cream-100/60" />}
          </button>
          {productExpanded && (
            <div className="px-4 pb-4 space-y-3">
              {video.products.map(product => (
                <div key={product.id} className="flex items-center gap-3 bg-cream-100/10 rounded-2xl p-3">
                  <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-martini-400 font-semibold mb-0.5">{product.tag}</div>
                    <div className="text-cream-100 text-sm font-bold">{product.name}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-martini-400" fill="currentColor" />
                      <span className="text-cream-100/60 text-xs">{product.rating} ({formatNumber(product.reviews)})</span>
                    </div>
                    <div className="text-cream-100 font-bold text-sm mt-0.5">${product.price}</div>
                  </div>
                  <button
                    onClick={() => setCartAdded(true)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      cartAdded ? 'bg-martini-500 text-cream-100' : 'bg-martini-500 text-cream-100 hover:bg-martini-600'
                    }`}
                  >
                    {cartAdded ? 'Yours' : 'Take it home'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
