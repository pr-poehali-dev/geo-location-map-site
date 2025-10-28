import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HelpPanel() {
  const faqItems = [
    {
      question: 'Как построить маршрут до транспорта?',
      answer: 'Нажмите на любой маркер транспорта на карте. Система автоматически построит маршрут от вашего текущего местоположения до выбранного транспорта и покажет расстояние.',
    },
    {
      question: 'Почему не определяется моя геолокация?',
      answer: 'Убедитесь, что в настройках браузера разрешен доступ к геолокации. Также проверьте, что у вас включен GPS на устройстве.',
    },
    {
      question: 'Как отменить построенный маршрут?',
      answer: 'Нажмите на кнопку с крестиком в правом верхнем углу карты или выберите другой транспорт для построения нового маршрута.',
    },
    {
      question: 'Как часто обновляется положение транспорта?',
      answer: 'Положение транспортных средств обновляется в реальном времени каждые 2 секунды для максимальной точности.',
    },
    {
      question: 'Что означают разные цвета маркеров?',
      answer: 'Синий цвет - автобусы, зеленый - трамваи, фиолетовый - троллейбусы. Ваше местоположение отмечено пульсирующим синим маркером.',
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Помощь</h2>

      <Card className="p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="HelpCircle" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Частые вопросы</h3>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <Icon name="BookOpen" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Руководство</h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-primary/10 rounded-full p-2 h-fit">
              <Icon name="MapPin" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Ваше местоположение</h4>
              <p className="text-sm text-muted-foreground">
                Синий пульсирующий маркер показывает ваше текущее местоположение. Нажмите кнопку с прицелом для обновления.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 rounded-full p-2 h-fit">
              <Icon name="Bus" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Транспорт</h4>
              <p className="text-sm text-muted-foreground">
                Цветные маркеры показывают движущийся транспорт. Нажмите на маркер для построения маршрута и просмотра информации.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 rounded-full p-2 h-fit">
              <Icon name="Navigation" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Навигация</h4>
              <p className="text-sm text-muted-foreground">
                После выбора транспорта появится пунктирная линия маршрута и карточка с информацией о выбранном транспорте.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <Icon name="MessageSquare" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold">Связь с поддержкой</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Не нашли ответ на свой вопрос? Свяжитесь с нами!
        </p>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Mail" size={18} className="mr-2" />
            support@transport.app
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Phone" size={18} className="mr-2" />
            +7 (800) 555-35-35
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="MessageCircle" size={18} className="mr-2" />
            Онлайн-чат
          </Button>
        </div>
      </Card>
    </div>
  );
}
