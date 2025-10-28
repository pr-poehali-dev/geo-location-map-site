import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Vehicle {
  id: number;
  type: string;
  lat: number;
  lng: number;
  speed: number;
  route: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export default function MapView() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: 'Геолокация получена',
            description: 'Ваше местоположение определено',
          });
        },
        () => {
          setUserLocation({ lat: 55.7558, lng: 37.6173 });
          toast({
            title: 'Геолокация недоступна',
            description: 'Используется местоположение по умолчанию',
            variant: 'destructive',
          });
        }
      );
    } else {
      setUserLocation({ lat: 55.7558, lng: 37.6173 });
    }

    const mockVehicles: Vehicle[] = [
      { id: 1, type: 'bus', lat: 55.7558, lng: 37.6273, speed: 35, route: 'М1' },
      { id: 2, type: 'tram', lat: 55.7458, lng: 37.6173, speed: 25, route: 'Т3' },
      { id: 3, type: 'bus', lat: 55.7658, lng: 37.6073, speed: 40, route: 'М7' },
      { id: 4, type: 'trolleybus', lat: 55.7358, lng: 37.6373, speed: 30, route: 'ТБ5' },
      { id: 5, type: 'bus', lat: 55.7758, lng: 37.6473, speed: 45, route: 'М9' },
    ];
    setVehicles(mockVehicles);

    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          lat: v.lat + (Math.random() - 0.5) * 0.002,
          lng: v.lng + (Math.random() - 0.5) * 0.002,
          speed: Math.max(20, Math.min(50, v.speed + (Math.random() - 0.5) * 5)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const buildRoute = (vehicle: Vehicle) => {
    if (!userLocation) {
      toast({
        title: 'Ошибка',
        description: 'Геолокация не определена',
        variant: 'destructive',
      });
      return;
    }

    setSelectedVehicle(vehicle);
    setIsTracking(true);
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      vehicle.lat,
      vehicle.lng
    );
    toast({
      title: 'Маршрут построен',
      description: `Расстояние до ${vehicle.route}: ${distance.toFixed(2)} км`,
    });
  };

  const getPosition = (lat: number, lng: number) => {
    if (!userLocation) return { top: '50%', left: '50%' };
    const centerLat = userLocation.lat;
    const centerLng = userLocation.lng;
    const scale = 8000;
    const top = 50 - (lat - centerLat) * scale;
    const left = 50 + (lng - centerLng) * scale;
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="relative w-full h-full bg-muted/20">
      <div
        ref={mapRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {userLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse"
            style={getPosition(userLocation.lat, userLocation.lng)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full opacity-25 animate-ping"></div>
              <div className="relative bg-primary rounded-full p-3 shadow-lg">
                <Icon name="MapPin" size={24} className="text-primary-foreground" />
              </div>
            </div>
          </div>
        )}

        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all hover:scale-110 animate-pulse-marker"
            style={getPosition(vehicle.lat, vehicle.lng)}
            onClick={() => buildRoute(vehicle)}
          >
            <div className={`${getVehicleColor(vehicle.type)} rounded-full p-2 shadow-lg`}>
              <Icon name={getVehicleIcon(vehicle.type)} size={20} className="text-white" />
            </div>
            {selectedVehicle?.id === vehicle.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                <Card className="px-2 py-1 text-xs font-medium animate-fade-in">
                  {vehicle.route} • {vehicle.speed} км/ч
                </Card>
              </div>
            )}
          </div>
        ))}

        {isTracking && selectedVehicle && userLocation && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
            <line
              x1={`${getPosition(userLocation.lat, userLocation.lng).left}`}
              y1={`${getPosition(userLocation.lat, userLocation.lng).top}`}
              x2={`${getPosition(selectedVehicle.lat, selectedVehicle.lng).left}`}
              y2={`${getPosition(selectedVehicle.lat, selectedVehicle.lng).top}`}
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-fade-in"
            />
          </svg>
        )}
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        <Button
          size="icon"
          variant="secondary"
          className="shadow-lg hover:scale-105 transition-transform"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
                toast({
                  title: 'Местоположение обновлено',
                });
              });
            }
          }}
        >
          <Icon name="Crosshair" size={20} />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="shadow-lg hover:scale-105 transition-transform"
          onClick={() => setIsTracking(false)}
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      {selectedVehicle && (
        <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 shadow-lg z-30 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className={`${getVehicleColor(selectedVehicle.type)} rounded-full p-3`}>
              <Icon
                name={getVehicleIcon(selectedVehicle.type)}
                size={24}
                className="text-white"
              />
            </div>
            <div>
              <div className="font-semibold text-lg">{selectedVehicle.route}</div>
              <div className="text-sm text-muted-foreground">
                Скорость: {selectedVehicle.speed} км/ч
              </div>
            </div>
            <Button size="sm" className="ml-auto">
              <Icon name="Navigation" size={16} className="mr-2" />
              Навигация
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
