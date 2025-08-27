import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp } from 'lucide-react';

export function MockCalculator() {
  const today = new Date().toLocaleDateString('en-US');
  
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl shadow-xl max-w-lg mx-auto" style={{ color: '#C7B3FF' }}>
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="h-6 w-6 text-purple-400" />
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            FX Pitch Calculator
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-purple-200">Currency Pair</Label>
          <div className="bg-white/10 border-white/30 text-purple-100 p-2 rounded-lg text-sm">
            GBP/USD
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Your Rate</Label>
            <div className="bg-white/5 border-green-500/30 text-purple-100 p-2 rounded font-mono text-sm">
              1.3550
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Competitor</Label>
            <div className="bg-white/5 border-red-500/30 text-purple-100 p-2 rounded font-mono text-sm">
              1.3575
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-purple-200">Competitor Company</Label>
          <div className="bg-white/10 border-white/30 text-purple-100 p-2 rounded-lg text-sm">
            ExampleFXBroker
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-purple-200">Comparison Date</Label>
          <div className="bg-white/5 border-white/30 text-purple-100 p-2 rounded-lg text-sm">
            {today}
          </div>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm py-2">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Savings
        </Button>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="text-center p-2 bg-white/5 rounded">
            <p className="text-xs text-purple-300/70">PIPs Advantage</p>
            <p className="text-sm font-mono font-bold text-blue-400">25.0</p>
          </div>
          <div className="text-center p-2 bg-white/5 rounded">
            <p className="text-xs text-purple-300/70">Annual Savings</p>
            <p className="text-sm font-mono font-bold text-green-400">£130,000</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}