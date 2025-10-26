import { Home, Shirt, User } from 'lucide-react';

interface NavigationProps {
  activeTab: 'home' | 'closet' | 'profile';
  onTabChange: (tab: 'home' | 'closet' | 'profile') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'closet' as const, label: 'Closet', icon: Shirt },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around h-20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center gap-1 py-2 px-4 transition-all duration-200 group"
              >
                <div className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground group-hover:bg-secondary'
                }`}>
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-xs transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
