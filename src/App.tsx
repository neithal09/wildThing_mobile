import { useState } from 'react';
import Onboarding from './components/Onboarding';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import ExploreTab from './components/ExploreTab';
import CreateTab from './components/CreateTab';
import CommunityTab from './components/CommunityTab';
import StoreTab from './components/StoreTab';
import ProfileTab from './components/ProfileTab';
import VideoPlayerModal from './components/VideoPlayerModal';
import LiveSessionModal from './components/LiveSessionModal';
import { TabKey, VideoCard } from './types';

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [activeVideo, setActiveVideo] = useState<VideoCard | null>(null);
  const [liveOpen, setLiveOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Status bar indicator (decorative on mobile web) */}
      <div className="hidden sm:flex h-7 items-end justify-between px-6 pb-1 bg-chocolate-500">
        <span className="text-xs font-bold text-cream-100">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5 items-end h-3">
            {[2, 3, 4, 4].map((h, i) => (
              <div key={i} className="w-1 bg-cream-100 rounded-sm" style={{ height: `${h * 3}px` }} />
            ))}
          </div>
          <svg width="16" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0" y="0" width="22" height="12" rx="3" stroke="#FCF5E2" strokeWidth="1.5" />
            <rect x="1.5" y="1.5" width="17" height="9" rx="1.5" fill="#FCF5E2" />
            <path d="M23 4v4a2 2 0 0 0 0-4z" fill="#FCF5E2" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 sm:top-7">
        {!onboarded ? (
          <div className="absolute inset-0">
            <Onboarding onComplete={() => setOnboarded(true)} />
          </div>
        ) : (
          <>
            <div className="tab-scroll">
              <div className="tab-panel">
                {activeTab === 'home' && (
                  <HomeTab
                    onVideoClick={setActiveVideo}
                    onLiveClick={() => setLiveOpen(true)}
                  />
                )}
                {activeTab === 'explore' && <ExploreTab />}
                {activeTab === 'create' && <CreateTab />}
                {activeTab === 'community' && <CommunityTab />}
                {activeTab === 'store' && <StoreTab />}
                {activeTab === 'profile' && <ProfileTab />}
              </div>
            </div>

            <BottomNav active={activeTab} onChange={setActiveTab} />

            {activeVideo && (
              <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
            )}

            {liveOpen && (
              <LiveSessionModal onClose={() => setLiveOpen(false)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
