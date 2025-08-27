import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, DollarSign, History } from 'lucide-react';

export function MockCalculator() {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl shadow-xl max-w-lg mx-auto" style={{ color: '#C7B3FF' }}>
      <CardHeader className="text-center pb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-purple-400" />
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Spread Checker
          </CardTitle>
        </div>
        <p className="text-xs text-purple-200/70">
          Calculate competitive advantages and client savings in real-time
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Currency Pair */}
        <div className="space-y-1">
          <Label className="text-xs text-purple-200">Currency Pair</Label>
          <div className="bg-gray-800/50 border border-gray-600/50 text-purple-100 p-2 rounded text-xs">
            GBP/USD
          </div>
        </div>

        {/* Live Market Rate */}
        <div className="bg-gray-800/50 border border-gray-600/50 rounded p-2">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="h-3 w-3 text-green-400" />
            <Label className="text-xs text-purple-200">Live Market Rate: GBP/USD</Label>
          </div>
          <p className="text-lg font-bold text-green-400 font-mono">1.3541</p>
        </div>

        {/* Your Rate and Competitor Rate */}
        <div className="space-y-2">
          {/* Labels Row */}
          <div className="grid grid-cols-3 gap-2">
            <Label className="text-xs text-purple-200">Your Rate (+10 pips)</Label>
            <Label className="text-xs text-purple-200">Competitor Rate</Label>
            <div></div> {/* Empty space for alignment */}
          </div>
          
          {/* Buttons Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-800/50 border border-gray-600/50 text-purple-100 p-2 rounded text-xs font-mono">
              1.3510
            </div>
            <div className="bg-gray-800/50 border border-gray-600/50 text-purple-100 p-2 rounded text-xs font-mono">
              1.34
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 text-xs border-white/20 text-purple-200 hover:bg-white/10"
            >
              <History className="h-3 w-3 mr-1" />
              Historical Rate
            </Button>
          </div>
        </div>

        {/* Trade Amount and Trades Per Year */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Amount to Buy</Label>
            <div className="bg-gray-800/50 border border-gray-600/50 text-purple-100 p-2 rounded text-xs">
              500000
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Trades Per Year</Label>
            <div className="bg-gray-800/50 border border-gray-600/50 text-purple-100 p-2 rounded text-xs">
              52
            </div>
          </div>
        </div>

        {/* Margin Inflation */}
        <div className="space-y-2">
          <Label className="text-xs text-purple-200">Inflate Your Margin (Pips)</Label>
          <div className="flex gap-1 flex-wrap">
            <button className="px-2 py-1 bg-gray-700/50 text-purple-200 rounded text-xs border border-gray-600/50">
              None
            </button>
            <button className="px-2 py-1 bg-purple-600 text-white rounded text-xs">
              10 pips
            </button>
            <button className="px-2 py-1 bg-gray-700/50 text-purple-200 rounded text-xs border border-gray-600/50">
              20 pips
            </button>
            <button className="px-2 py-1 bg-gray-700/50 text-purple-200 rounded text-xs border border-gray-600/50">
              30 pips
            </button>
            <button className="px-2 py-1 bg-gray-700/50 text-purple-200 rounded text-xs border border-gray-600/50">
              40 pips
            </button>
            <button className="px-2 py-1 bg-gray-700/50 text-purple-200 rounded text-xs border border-gray-600/50">
              50 pips
            </button>
          </div>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2">
          <Calculator className="h-3 w-3 mr-2" />
          Calculate Savings
        </Button>
        
        {/* Calculation Results */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded p-3 border border-purple-500/30">
          <div className="flex items-center gap-1 mb-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <h3 className="text-sm font-semibold text-purple-200">Calculation Results</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <p className="text-purple-300">Price Difference</p>
              <p className="font-bold text-purple-100">+0.0110</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-purple-300">Pips</p>
              <p className="font-bold text-purple-100">110.0 pips</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-purple-300">Cost With Competitor</p>
              <p className="font-bold text-red-400">373134.33</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-purple-300">Cost With Us</p>
              <p className="font-bold text-green-400">370096.23</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-purple-300">Savings Per Trade</p>
              <p className="font-bold text-green-400">3038.10</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-purple-300">Annual Savings</p>
              <p className="font-bold text-green-400">157981.37</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-purple-300">Percentage Savings</p>
              <p className="font-bold text-green-400">0.81%</p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button 
          variant="outline"
          className="w-full border-white/20 text-purple-200 hover:bg-white/10 py-2 text-xs"
        >
          Reset Calculator
        </Button>
      </CardContent>
    </Card>
  );
}