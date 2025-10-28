import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression, divIcon } from 'leaflet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import 'leaflet/dist/leaflet.css';

interface Vehicle {
  id: number;
  type: string;
  lat: number;
  lng: number;
  speed: number;
  route: string;
  source: 'satellite' | 'camera' | 'v2v';
}

interface TrafficSegment {
  coords: [number, number][];
  level: 'low' | 'medium' | 'high' | 'severe';
}

function LocationMarker({ position }: { position: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1 });
    }
  }, [map, position]);

  const userIcon = divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="position: relative;">
        <div style="position: absolute; inset: 0; background: #3B82F6; border-radius: 50%; opacity: 0.25; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; width: 40px; height: 40px; transform: translate(-50%, -50%);"></div>
        <div style="position: relative; background: #3B82F6; border-radius: 50%; padding: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return <Marker position={position} icon={userIcon} />;
}

export default function MapView() {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [trafficSegments, setTrafficSegments] = useState<TrafficSegment[]>([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos: LatLngExpression = [position.coords.latitude, position.coords.longitude];
          setUserLocation(pos);
          toast({
            title: 'Геолокация активирована',
            description: 'Ваше местоположение определено точно',
          });
        },
        () => {
          setUserLocation([55.7558, 37.6173]);
          toast({
            title: 'Доступ к геолокации запрещен',
            description: 'Используется местоположение по умолчанию',
            variant: 'destructive',
          });
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setUserLocation([55.7558, 37.6173]);
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const center = Array.isArray(userLocation) ? userLocation : [55.7558, 37.6173];
    const [lat, lng] = center;

    const mockVehicles: Vehicle[] = [
      { id: 1, type: 'car', lat: lat + 0.01, lng: lng + 0.01, speed: 45, route: 'А-101', source: 'satellite' },
      { id: 2, type: 'car', lat: lat - 0.008, lng: lng, speed: 30, route: 'М-11', source: 'camera' },
      { id: 3, type: 'car', lat: lat + 0.015, lng: lng - 0.01, speed: 60, route: 'Е-105', source: 'v2v' },
      { id: 4, type: 'bus', lat: lat - 0.005, lng: lng + 0.015, speed: 35, route: 'М1', source: 'camera' },
      { id: 5, type: 'car', lat: lat + 0.02, lng: lng + 0.02, speed: 50, route: 'Р-132', source: 'satellite' },
      { id: 6, type: 'tram', lat: lat - 0.012, lng: lng - 0.008, speed: 25, route: 'Т3', source: 'camera' },
      { id: 7, type: 'car', lat: lat + 0.005, lng: lng - 0.015, speed: 40, route: 'М-7', source: 'v2v' },
    ];
    setVehicles(mockVehicles);

    const mockTraffic: TrafficSegment[] = [
      { coords: [[lat + 0.01, lng], [lat + 0.01, lng + 0.02]], level: 'high' },
      { coords: [[lat, lng - 0.01], [lat - 0.015, lng - 0.01]], level: 'medium' },
      { coords: [[lat - 0.008, lng + 0.005], [lat - 0.008, lng + 0.02]], level: 'severe' },
      { coords: [[lat + 0.015, lng - 0.015], [lat + 0.015, lng]], level: 'low' },
    ];
    setTrafficSegments(mockTraffic);

    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          lat: v.lat + (Math.random() - 0.5) * 0.0008,
          lng: v.lng + (Math.random() - 0.5) * 0.0008,
          speed: Math.max(20, Math.min(80, v.speed + (Math.random() - 0.5) * 5)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [userLocation]);

  const getVehicleIcon = useCallback((vehicle: Vehicle) => {
    const getColor = () => {
      switch (vehicle.type) {
        case 'car': return '#3B82F6';
        case 'bus': return '#10B981';
        case 'tram': return '#8B5CF6';
        default: return '#6B7280';
      }
    };

    const getIconPath = () => {
      switch (vehicle.type) {
        case 'bus':
          return '<path d="M8 6v6M16 6v6M2 18h3m15 0h3m0-4v-6a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v6m21 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2" stroke-width="2"/>';
        case 'tram':
          return '<path d="M5 15h14M5 15l-2 4m16-4l2 4M12 12h.01M8 12h.01m7.99 0h.01M5 8h14a2 2 0 0 1 2 2v5H3V10a2 2 0 0 1 2-2z" stroke-width="2"/>';
        default:
          return '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" stroke-width="2"/><circle cx="7" cy="17" r="2" stroke-width="2"/><circle cx="17" cy="17" r="2" stroke-width="2"/>';
      }
    };

    return divIcon({
      className: 'custom-vehicle-marker',
      html: `
        <div style="position: relative;">
          <div style="background: ${getColor()}; border-radius: 50%; padding: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round">
              ${getIconPath()}
            </svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }, []);

  const getTrafficColor = (level: string) => {
    switch (level) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'severe': return '#991B1B';
      default: return '#6B7280';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'satellite': return '🛰️ Спутник';
      case 'camera': return '📹 Камера';
      case 'v2v': return '🚗 V2V';
      default: return 'Неизвестно';
    }
  };

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-6 max-w-md text-center">
          <div className="mb-4">
            <Icon name="MapPin" size={48} className="mx-auto text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Запрос геолокации</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Для отображения карты и транспорта разрешите доступ к вашему местоположению
          </p>
          <Button onClick={() => window.location.reload()}>
            <Icon name="Navigation" size={18} className="mr-2" />
            Разрешить доступ
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={userLocation}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {trafficSegments.map((segment, idx) => (
          <Polyline
            key={idx}
            positions={segment.coords}
            pathOptions={{
              color: getTrafficColor(segment.level),
              weight: 6,
              opacity: 0.7,
            }}
          />
        ))}

        <LocationMarker position={userLocation} />

        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.lat, vehicle.lng]}
            icon={getVehicleIcon(vehicle)}
            eventHandlers={{
              click: () => setSelectedVehicle(vehicle),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{vehicle.route}</p>
                <p className="text-muted-foreground">{vehicle.speed} км/ч</p>
                <p className="text-xs mt-1">{getSourceLabel(vehicle.source)}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedVehicle && userLocation && (
          <Polyline
            positions={[userLocation, [selectedVehicle.lat, selectedVehicle.lng]]}
            pathOptions={{
              color: '#0EA5E9',
              weight: 3,
              dashArray: '10, 10',
            }}
          />
        )}
      </MapContainer>

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          size="icon"
          variant="secondary"
          className="shadow-lg"
          onClick={() => window.location.reload()}
        >
          <Icon name="Crosshair" size={20} />
        </Button>
        {selectedVehicle && (
          <Button
            size="icon"
            variant="secondary"
            className="shadow-lg"
            onClick={() => setSelectedVehicle(null)}
          >
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      <Card className="absolute top-4 left-4 p-3 z-[1000] animate-fade-in">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs">Свободно</span>
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs">Загружено</span>
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs">Пробка</span>
        </div>
      </Card>

      {selectedVehicle && (
        <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 shadow-xl z-[1000] animate-scale-in min-w-[320px]">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-full p-3">
              <Icon name={selectedVehicle.type === 'car' ? 'Car' : selectedVehicle.type === 'bus' ? 'Bus' : 'Train'} size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-lg">{selectedVehicle.route}</div>
              <div className="text-sm text-muted-foreground">
                Скорость: {selectedVehicle.speed} км/ч
              </div>
              <Badge variant="outline" className="mt-1 text-xs">
                {getSourceLabel(selectedVehicle.source)}
              </Badge>
            </div>
            <Button size="sm">
              <Icon name="Navigation" size={16} className="mr-2" />
              Маршрут
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
