import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Icon from '@/components/ui/icon';
import MapView from '@/components/MapView';
import StatsPanel from '@/components/StatsPanel';
import HistoryPanel from '@/components/HistoryPanel';
import SettingsPanel from '@/components/SettingsPanel';
import HelpPanel from '@/components/HelpPanel';
import ProfilePanel from '@/components/ProfilePanel';

type Section = 'map' | 'stats' | 'history' | 'settings' | 'help' | 'profile';

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('map');

  const menuItems = [
    { id: 'map' as Section, label: 'Карта', icon: 'Map' },
    { id: 'stats' as Section, label: 'Статистика', icon: 'BarChart3' },
    { id: 'history' as Section, label: 'История', icon: 'History' },
    { id: 'settings' as Section, label: 'Настройки', icon: 'Settings' },
    { id: 'help' as Section, label: 'Помощь', icon: 'HelpCircle' },
    { id: 'profile' as Section, label: 'Профиль', icon: 'User' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'map':
        return <MapView />;
      case 'stats':
        return <StatsPanel />;
      case 'history':
        return <HistoryPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'help':
        return <HelpPanel />;
      case 'profile':
        return <ProfilePanel />;
      default:
        return <MapView />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar className="border-r animate-fade-in">
          <SidebarContent>
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-lg p-2">
                  <Icon name="Navigation" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">TransitMap</h1>
                  <p className="text-xs text-muted-foreground">Навигация онлайн</p>
                </div>
              </div>
            </div>
            <SidebarMenu className="p-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start gap-3 px-4 py-3 hover:scale-[1.02] transition-transform"
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-hidden animate-scale-in">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}
