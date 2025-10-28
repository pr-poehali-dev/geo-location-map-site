import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function SettingsPanel() {
  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Настройки</h2>

      <Card className="p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Map" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Карта</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="traffic">Показывать пробки</Label>
              <p className="text-sm text-muted-foreground">
                Отображение загруженности дорог
              </p>
            </div>
            <Switch id="traffic" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="transport">Показывать транспорт</Label>
              <p className="text-sm text-muted-foreground">
                Отображение движущихся маршрутов
              </p>
            </div>
            <Switch id="transport" defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Стиль карты</Label>
            <Select defaultValue="standard">
              <SelectTrigger>
                <SelectValue placeholder="Выберите стиль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Стандартный</SelectItem>
                <SelectItem value="satellite">Спутник</SelectItem>
                <SelectItem value="hybrid">Гибридный</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Bell" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Уведомления</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push">Push-уведомления</Label>
              <p className="text-sm text-muted-foreground">
                Уведомления о прибытии транспорта
              </p>
            </div>
            <Switch id="push" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sound">Звук уведомлений</Label>
              <p className="text-sm text-muted-foreground">
                Звуковые оповещения
              </p>
            </div>
            <Switch id="sound" />
          </div>
        </div>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Navigation" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Навигация</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-route">Автопостроение маршрута</Label>
              <p className="text-sm text-muted-foreground">
                Автоматический расчет оптимального пути
              </p>
            </div>
            <Switch id="auto-route" defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Предпочитаемый транспорт</Label>
            <Select defaultValue="any">
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Любой</SelectItem>
                <SelectItem value="bus">Автобус</SelectItem>
                <SelectItem value="tram">Трамвай</SelectItem>
                <SelectItem value="trolleybus">Троллейбус</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Единицы расстояния</Label>
            <Select defaultValue="km">
              <SelectTrigger>
                <SelectValue placeholder="Выберите единицу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">Километры</SelectItem>
                <SelectItem value="mi">Мили</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Palette" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Внешний вид</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Темная тема</Label>
              <p className="text-sm text-muted-foreground">
                Включить темное оформление
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>
        </div>
      </Card>
    </div>
  );
}
