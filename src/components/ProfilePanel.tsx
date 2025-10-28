import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function ProfilePanel() {
  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Профиль</h2>

      <Card className="p-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              АП
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">Алексей Петров</h3>
            <p className="text-sm text-muted-foreground">alex.petrov@email.com</p>
            <Badge className="mt-2" variant="secondary">
              <Icon name="Award" size={14} className="mr-1" />
              Активный пользователь
            </Badge>
          </div>
        </div>
        <Button className="w-full">
          <Icon name="Edit" size={18} className="mr-2" />
          Редактировать профиль
        </Button>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <h3 className="text-lg font-semibold mb-4">Достижения</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Icon name="Trophy" size={24} className="text-blue-500 mb-2" />
            <p className="text-sm font-medium">Первая поездка</p>
          </div>
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <Icon name="Target" size={24} className="text-green-500 mb-2" />
            <p className="text-sm font-medium">100 поездок</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <Icon name="Zap" size={24} className="text-purple-500 mb-2" />
            <p className="text-sm font-medium">Быстрый маршрут</p>
          </div>
          <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
            <Icon name="Star" size={24} className="text-orange-500 mb-2" />
            <p className="text-sm font-medium">Эко-герой</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h3 className="text-lg font-semibold mb-4">Статистика профиля</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Рейтинг</span>
            <span className="font-semibold">4.8 ⭐</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Участник с</span>
            <span className="font-semibold">15 марта 2024</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Уровень</span>
            <Badge>Золотой</Badge>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Бонусы</span>
            <span className="font-semibold">350 баллов</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <h3 className="text-lg font-semibold mb-4">Избранные маршруты</h3>
        <div className="space-y-3">
          {[
            { route: 'М1', name: 'Дом — Работа', icon: 'Home' },
            { route: 'Т3', name: 'Центр — Парк', icon: 'Coffee' },
            { route: 'М7', name: 'Вокзал — Аэропорт', icon: 'Plane' },
          ].map((fav, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Icon name={fav.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{fav.route}</p>
                  <p className="text-sm text-muted-foreground">{fav.name}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost">
                <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <h3 className="text-lg font-semibold mb-4 text-destructive">Управление аккаунтом</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Download" size={18} className="mr-2" />
            Экспорт данных
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive">
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти из аккаунта
          </Button>
        </div>
      </Card>
    </div>
  );
}
