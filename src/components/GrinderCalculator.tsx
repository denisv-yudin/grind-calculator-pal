
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  c3espToMicrons, 
  zp6ToMicrons, 
  micronsToC3esp, 
  micronsToZp6,
  validateC3espClicks,
  validateZp6Clicks,
  validateMicrons,
  getGrinderRanges,
  formatNumber
} from '@/utils/conversionUtils';
import { Coffee } from 'lucide-react';

const GrinderCalculator: React.FC = () => {
  const [c3espClicks, setC3espClicks] = useState<number>(36);
  const [zp6Clicks, setZp6Clicks] = useState<number>(31);
  const [microns, setMicrons] = useState<number>(400);
  const [lastUpdated, setLastUpdated] = useState<'c3esp' | 'zp6' | 'microns'>('c3esp');
  
  const grinderRanges = getGrinderRanges();

  // Update all values when one changes
  useEffect(() => {
    // Skip running effect on mount
    if (lastUpdated === 'c3esp') {
      const newMicrons = c3espToMicrons(c3espClicks);
      setMicrons(newMicrons);
      setZp6Clicks(micronsToZp6(newMicrons));
    } else if (lastUpdated === 'zp6') {
      const newMicrons = zp6ToMicrons(zp6Clicks);
      setMicrons(newMicrons);
      setC3espClicks(micronsToC3esp(newMicrons));
    } else if (lastUpdated === 'microns') {
      setC3espClicks(micronsToC3esp(microns));
      setZp6Clicks(micronsToZp6(microns));
    }
  }, [c3espClicks, zp6Clicks, microns, lastUpdated]);

  // Handle input changes
  const handleC3espChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const validValue = validateC3espClicks(numValue);
      setC3espClicks(validValue);
      setLastUpdated('c3esp');
    }
  };

  const handleZp6Change = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const validValue = validateZp6Clicks(numValue);
      setZp6Clicks(validValue);
      setLastUpdated('zp6');
    }
  };

  const handleMicronChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const validValue = validateMicrons(numValue);
      setMicrons(validValue);
      setLastUpdated('microns');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="hover-grow shadow-md">
          <CardHeader className="bg-coffee-dark text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Coffee size={20} />
              C3 ESP
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="c3esp-clicks">Щелчки</Label>
                  <span className="text-sm text-muted-foreground">
                    Диапазон: {grinderRanges.c3esp.min}-{grinderRanges.c3esp.max}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="c3esp-slider"
                    min={grinderRanges.c3esp.min}
                    max={grinderRanges.c3esp.max}
                    step={1}
                    value={[c3espClicks]}
                    onValueChange={(value) => {
                      setC3espClicks(value[0]);
                      setLastUpdated('c3esp');
                    }}
                    className="flex-1"
                  />
                  <Input
                    id="c3esp-clicks"
                    type="number"
                    value={c3espClicks}
                    onChange={(e) => handleC3espChange(e.target.value)}
                    className="w-20"
                    min={grinderRanges.c3esp.min}
                    max={grinderRanges.c3esp.max}
                  />
                </div>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-center">
                  <div className="font-medium">Калибровка</div>
                  <div className="text-sm text-muted-foreground">36 щелчков = 400 мкм</div>
                  <div className="text-sm text-muted-foreground">54 щелчка = 600 мкм</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-grow shadow-md">
          <CardHeader className="bg-coffee-dark text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Coffee size={20} />
              1zpresso ZP6
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="zp6-clicks">Щелчки</Label>
                  <span className="text-sm text-muted-foreground">
                    Диапазон: {grinderRanges.zp6.min}-{grinderRanges.zp6.max}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="zp6-slider"
                    min={grinderRanges.zp6.min}
                    max={grinderRanges.zp6.max}
                    step={1}
                    value={[zp6Clicks]}
                    onValueChange={(value) => {
                      setZp6Clicks(value[0]);
                      setLastUpdated('zp6');
                    }}
                    className="flex-1"
                  />
                  <Input
                    id="zp6-clicks"
                    type="number"
                    value={zp6Clicks}
                    onChange={(e) => handleZp6Change(e.target.value)}
                    className="w-20"
                    min={grinderRanges.zp6.min}
                    max={grinderRanges.zp6.max}
                  />
                </div>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-center">
                  <div className="font-medium">Калибровка</div>
                  <div className="text-sm text-muted-foreground">31 щелчок = 600 мкм</div>
                  <div className="text-sm text-muted-foreground">55 щелчков = 800 мкм</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Microns Card */}
      <Card className="hover-grow shadow-md mt-6">
        <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
          <CardTitle>Размер в микронах</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="microns">Микроны (мкм)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="microns-slider"
                min={200}
                max={1200}
                step={10}
                value={[microns]}
                onValueChange={(value) => {
                  setMicrons(value[0]);
                  setLastUpdated('microns');
                }}
                className="flex-1"
              />
              <Input
                id="microns"
                type="number"
                value={microns}
                onChange={(e) => handleMicronChange(e.target.value)}
                className="w-20"
                min={200}
                max={1200}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mt-8">
        <Card className="bg-gradient-to-br from-coffee-medium to-coffee-light">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3 text-center">Результаты</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-muted-foreground">C3 ESP</div>
                <div className="text-2xl font-bold">{formatNumber(c3espClicks)} щелчков</div>
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-muted-foreground">1zpresso ZP6</div>
                <div className="text-2xl font-bold">{formatNumber(zp6Clicks)} щелчков</div>
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-muted-foreground">Размер частиц</div>
                <div className="text-2xl font-bold">{formatNumber(microns)} мкм</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrinderCalculator;
