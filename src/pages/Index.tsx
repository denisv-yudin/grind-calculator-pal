
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrinderCalculator from '@/components/GrinderCalculator';
import { Coffee, CoffeeIcon } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="flex-1 container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Калькулятор настроек кофемолки</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Конвертируйте настройки между кофемолками C3 ESP и 1zpresso ZP6, 
            или используйте значения в микронах для точного помола.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-coffee-medium/20 rounded-full">
            <CoffeeIcon size={18} className="text-coffee-darker" />
            <span>C3 ESP</span>
            <span className="mx-1">⟷</span>
            <span>1zpresso ZP6</span>
            <Coffee size={18} className="text-coffee-darker" />
          </div>
        </div>
        
        <GrinderCalculator />
        
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">О калькуляторе</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="mb-4">
              Этот калькулятор помогает конвертировать настройки между двумя популярными кофемолками:
              C3 ESP и 1zpresso ZP6, а также показывает соответствующий размер частиц в микронах.
            </p>
            <p>
              Настройки основаны на следующих данных калибровки:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>C3 ESP: 36 щелчков = 400 мкм, 54 щелчка = 600 мкм (шкала от 0 до 90)</li>
              <li>1zpresso ZP6: 31 щелчок = 600 мкм, 55 щелчков = 800 мкм (шкала от 0 до 130)</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
