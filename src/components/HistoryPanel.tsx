import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

export default function HistoryPanel() {
  const history = [
    {
      date: '28 октября 2025',
      trips: [
        { route: 'М1', from: 'Центр', to: 'Парк', time: '10:30', duration: '25 мин', type: 'bus' },
        { route: 'Т3', from: 'Парк', to: 'Вокзал', time: '14:15', duration: '18 мин', type: 'tram' },
      ],
    },
    {
      date: '27 октября 2025',
      trips: [
        { route: 'М7', from: 'Дом', to: 'Офис', time: '09:00', duration: '32 мин', type: 'bus' },
        { route: 'ТБ5', from: 'Офис', to: 'Центр', time: '18:30', duration: '28 мин', type: 'trolleybus' },
      ],
    },
    {
      date: '26 октября 2025',
      trips: [
        { route: 'М9', from: 'Центр', to: 'Аэропорт', time: '07:45', duration: '45 мин', type: 'bus' },
        { route: 'Т3', from: 'Аэропорт', to: 'Дом', time: '20:00', duration: '50 мин', type: 'tram' },
        { route: 'М1', from: 'Дом', to: 'Магазин', time: '21:15', duration: '15 мин', type: 'bus' },
      ],
    },
  ];

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return 'Bus';
      case 'tram':
        return 'Train';
      case 'trolleybus':
        return 'Bus';
      default:
        return 'MapPin';
    }
  };

  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'bus':
        return 'bg-blue-500';
      case 'tram':
        return 'bg-green-500';
      case 'trolleybus':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-semibold mb-4">История поездок</h2>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="space-y-6 pr-4">
          {history.map((day, dayIdx) => (
            <div key={dayIdx} className="animate-fade-in" style={{ animationDelay: `${dayIdx * 100}ms` }}>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Calendar" size={18} className="text-muted-foreground" />
                <h3 className="font-semibold text-lg">{day.date}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {day.trips.length} поездок
                </Badge>
              </div>
              <div className="space-y-3">
                {day.trips.map((trip, tripIdx) => (
                  <Card
                    key={tripIdx}
                    className="p-4 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${getVehicleColor(trip.type)} rounded-full p-2.5 mt-1`}>
                        <Icon name={getVehicleIcon(trip.type)} size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-lg">{trip.route}</span>
                          <Badge variant="outline">{trip.duration}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="MapPin" size={14} />
                          <span>{trip.from}</span>
                          <Icon name="ArrowRight" size={14} />
                          <span>{trip.to}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icon name="Clock" size={14} />
                          <span>{trip.time}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
