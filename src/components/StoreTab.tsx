import { useState } from 'react';
import { ShoppingBag, Star, Heart, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Toys', 'Oils & wax', 'Velvet things', 'Reads'];

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Velvet Restraint Set',
    tag: 'Tied up tonight?',
    price: 89,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.pexels.com/photos/4577375/pexels-photo-4577375.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Velvet things',
  },
  {
    id: 'p2',
    name: 'Slow Burn Oil',
    tag: 'Goes on warm',
    price: 32,
    rating: 4.9,
    reviews: 1240,
    image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Oils & wax',
  },
  {
    id: 'p3',
    name: 'The Tease — vol. I',
    tag: 'Sealed with hands',
    price: 24,
    rating: 4.7,
    reviews: 188,
    image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Reads',
  },
  {
    id: 'p4',
    name: 'Dusk Candle Trio',
    tag: 'Light, lock, lose it',
    price: 48,
    rating: 4.6,
    reviews: 96,
    image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Oils & wax',
  },
  {
    id: 'p5',
    name: 'The Hum',
    tag: 'A slow burn. A deep hum.',
    price: 68,
    rating: 4.9,
    reviews: 2104,
    image: 'https://images.pexels.com/photos/4577376/pexels-photo-4577376.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Toys',
  },
  {
    id: 'p6',
    name: 'The Whip',
    tag: 'The sound. The snap.',
    price: 54,
    rating: 4.8,
    reviews: 612,
    image: 'https://images.pexels.com/photos/4202326/pexels-photo-4202326.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Toys',
  },
];

export default function StoreTab() {
  const [category, setCategory] = useState('All');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const items = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-20 bg-chocolate-500/95 backdrop-blur border-b border-chocolate-300">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-martini-400">Velvet drawer</div>
            <h1 className="font-display text-2xl text-cream-100 leading-tight">Tools, toys & <em className="italic text-martini-400">temptations.</em></h1>
          </div>
          <button className="w-9 h-9 rounded-full bg-chocolate-300 flex items-center justify-center">
            <Filter size={16} className="text-martini-400" />
          </button>
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                category === c
                  ? 'bg-rust-500 text-cream-100'
                  : 'bg-chocolate-300 text-cream-100/60'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Featured banner */}
      <div className="mx-4 mt-4 rounded-3xl overflow-hidden relative bg-gradient-to-br from-violet-700 to-rust-600 p-5 border border-martini-400/30">
        <div className="text-martini-400 text-[10px] font-semibold tracking-[0.3em] uppercase mb-2">Handle with care... or don't</div>
        <h2 className="font-display text-2xl text-cream-100 leading-tight mb-2">The Dusk Edit</h2>
        <p className="text-cream-100/70 text-xs italic mb-3 max-w-[240px]">A candle. An oil. Something to tie. Everything to surrender to.</p>
        <button className="bg-martini-400 text-chocolate-500 text-xs font-bold px-4 py-2 rounded-full">Unwrap it →</button>
      </div>

      <div className="px-4 pt-5 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {items.map(p => (
            <div key={p.id} className="bg-chocolate-300 rounded-2xl overflow-hidden border border-chocolate-200">
              <div className="relative aspect-square bg-chocolate-400">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-95" />
                <button
                  onClick={() => setWishlist(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-chocolate-500/70 backdrop-blur flex items-center justify-center"
                >
                  <Heart
                    size={14}
                    className={wishlist.includes(p.id) ? 'text-rust-400 fill-rust-400' : 'text-cream-100/70'}
                  />
                </button>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-martini-400 text-chocolate-500 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {p.tag}
                </span>
              </div>
              <div className="p-3">
                <div className="text-cream-100 font-semibold text-sm leading-tight mb-1">{p.name}</div>
                <div className="flex items-center gap-1 text-[11px] text-cream-100/50 mb-2">
                  <Star size={10} className="text-martini-400" fill="currentColor" />
                  <span>{p.rating}</span>
                  <span>· {p.reviews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-martini-400">${p.price}</span>
                  <button className="w-7 h-7 rounded-full bg-rust-500 hover:bg-rust-600 flex items-center justify-center transition">
                    <ShoppingBag size={13} className="text-cream-100" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
