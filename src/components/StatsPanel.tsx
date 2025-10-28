import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

export default function StatsPanel() {
  const stats = [
    { label: 'Всего поездок', value: '127', icon: 'TrendingUp', color: 'text-blue-500' },
    { label: 'Пройдено км', value: '1,234', icon: 'MapPin', color: 'text-green-500' },
    { label: 'Время в пути', value: '42ч', icon: 'Clock', color: 'text-purple-500' },
    { label: 'Сэкономлено', value: '₽2,450', icon: 'Wallet', color: 'text-orange-500' },
  ];

  const recentRoutes = [
    { route: 'М1', distance: 12.5, time: '25 мин', date: 'Сегодня' },
    { route: 'Т3', distance: 8.3, time: '18 мин', date: 'Вчера' },
    { route: 'М7', distance: 15.2, time: '32 мин', date: '2 дня назад' },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Статистика</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-4 hover:shadow-lg transition-shadow animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} bg-opacity-10 rounded-full p-3`}>
                  <Icon name={stat.icon} size={28} className={stat.color} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6 animate-scale-in">
        <h3 className="text-lg font-semibold mb-4">Активность за неделю</h3>
        <div className="space-y-4">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => (
            <div key={day} className="flex items-center gap-3">
              <span className="text-sm font-medium w-8">{day}</span>
              <Progress value={[75, 60, 85, 70, 90, 45, 55][idx]} className="flex-1" />
              <span className="text-sm text-muted-foreground w-12 text-right">
                {[15, 12, 17, 14, 18, 9, 11][idx]} км
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4">Последние маршруты</h3>
        <div className="space-y-3">
          {recentRoutes.map((route, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Icon name="Navigation" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{route.route}</p>
                  <p className="text-sm text-muted-foreground">{route.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{route.distance} км</p>
                <p className="text-sm text-muted-foreground">{route.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
