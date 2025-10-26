import { motion } from 'motion/react';
import { User, Settings, Bell, Palette, MapPin, LogOut, ChevronRight } from 'lucide-react';

export function ProfileScreen() {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: 'profile' },
        { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Palette, label: 'Style Preferences', action: 'style' },
        { icon: Bell, label: 'Notifications', action: 'notifications' },
        { icon: Settings, label: 'App Settings', action: 'settings' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account</p>
        </div>

        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-chart-2 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">AS</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl text-foreground">Alex Smith</h2>
              <p className="text-sm text-muted-foreground">alex.smith@example.com</p>
              <div className="flex gap-2 mt-2">
                <div className="px-3 py-1 bg-secondary rounded-lg">
                  <p className="text-xs text-foreground">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-2xl text-foreground">127</p>
            <p className="text-xs text-muted-foreground mt-1">Days Active</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-2xl text-foreground">42</p>
            <p className="text-xs text-muted-foreground mt-1">Saved Fits</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-2xl text-foreground">8</p>
            <p className="text-xs text-muted-foreground mt-1">Collections</p>
          </div>
        </motion.div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + groupIndex * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-sm text-muted-foreground px-1">{group.title}</h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 border-b border-border last:border-b-0 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary rounded-lg">
                        <Icon className="w-5 h-5 text-foreground" strokeWidth={2} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-foreground">{item.label}</p>
                        {item.value && (
                          <p className="text-xs text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-card text-destructive py-4 rounded-xl flex items-center justify-center gap-2 border border-border hover:bg-destructive/5 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" strokeWidth={2} />
          <span>Log Out</span>
        </motion.button>
      </div>
    </div>
  );
}
