import { Home, Search, PlusCircle, Users, ShoppingBag, User } from 'lucide-react';
import { TabKey } from '../types';

const TABS: { key: TabKey; Icon: React.ElementType; label: string }[] = [
  { key: 'home', Icon: Home, label: 'Bedroom' },
  { key: 'explore', Icon: Search, label: 'Crave' },
  { key: 'create', Icon: PlusCircle, label: 'Tempt' },
  { key: 'community', Icon: Users, label: 'Confess' },
  { key: 'store', Icon: ShoppingBag, label: 'Store' },
  { key: 'profile', Icon: User, label: 'Mine' },
];

interface Props {
  active: TabKey;
  onChange: (t: TabKey) => void;
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-chocolate-500/95 backdrop-blur border-t border-chocolate-300 z-30 safe-bottom">
      <div className="flex items-center">
        {TABS.map(({ key, Icon, label }) => {
          const isCreate = key === 'create';
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="flex-1 flex flex-col items-center py-3 transition-all duration-200"
            >
              {isCreate ? (
                <div className="w-11 h-11 -mt-5 rounded-2xl bg-gradient-to-br from-rust-500 to-martini-500 flex items-center justify-center shadow-lg shadow-rust-900/40 hover:scale-105 active:scale-95 transition-transform duration-150 ring-2 ring-chocolate-500">
                  <Icon size={22} className="text-cream-100" strokeWidth={2} />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-0.5">
                  <Icon
                    size={20}
                    className={`transition-all duration-200 ${isActive ? 'text-martini-400' : 'text-cream-100/50'}`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${isActive ? 'text-martini-400' : 'text-cream-100/50'}`}>
                    {label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}
