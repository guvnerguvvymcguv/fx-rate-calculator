import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

export function MockCalculator() {
  const [showHistoricalModal, setShowHistoricalModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPair, setSelectedPair] = useState('GBPUSD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('5D');
  const [timeInput, setTimeInput] = useState('11:00');
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6)); // July 2025

  const availablePairs = ['GBPUSD', 'GBPEUR', 'EURUSD'];
  const timeframes = ['1D', '5D', '1M', '3M'];

  // Initialize with Tuesday 8 July 2025 selected
  useState(() => {
    setSelectedDate(new Date(2025, 6, 8)); // July 8, 2025
  });

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  if (showHistoricalModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowHistoricalModal(false)} />
        
        <div className="relative bg-[#10051A] border border-white/20 rounded-xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-purple-200">
              Historical Exchange Rates
            </h2>
            <Button
              onClick={() => setShowHistoricalModal(false)}
              variant="outline"
              size="sm"
              className="border-white/20 text-purple-200 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-white/20">
            <div className="flex flex-wrap items-center gap-4">
              {/* Currency Pair Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-purple-200">Pair:</label>
                <div className="flex gap-1">
                  {availablePairs.map((pair) => (
                    <button
                      key={pair}
                      onClick={() => setSelectedPair(pair)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                        selectedPair === pair
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-purple-200 hover:bg-white/20'
                      }`}
                    >
                      {pair.slice(0, 3)}/{pair.slice(3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-purple-200">Timeframe:</label>
                <div className="flex gap-1">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                        selectedTimeframe === tf
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-purple-200 hover:bg-white/20'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Button */}
              <div className="flex items-center gap-2 ml-4">
                <Button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-purple-200 hover:bg-white/10"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Date/Time Search
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/20 text-red-300 hover:bg-red-500/10"
                >
                  Reset View
                </Button>
              </div>
            </div>

            {/* Date/Time Picker */}
            {showDatePicker && (
              <div className="mt-4 p-4 bg-white/5 border border-white/20 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Calendar */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-200 mb-3">Select Date</h4>
                    
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-3">
                      <Button
                        onClick={() => navigateMonth('prev')}
                        variant="ghost"
                        size="sm"
                        className="text-purple-200 hover:bg-white/10"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-purple-200 font-medium">
                        {currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                      </span>
                      <Button
                        onClick={() => navigateMonth('next')}
                        variant="ghost"
                        size="sm"
                        className="text-purple-200 hover:bg-white/10"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {/* Day headers */}
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center text-purple-300 font-medium">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar days */}
                      {generateCalendarDays().map((day, index) => (
                        <div key={index} className="relative">
                          {day ? (
                            <button
                              onClick={() => handleDateSelect(day)}
                              className={`w-full p-2 text-center rounded transition-colors ${
                                selectedDate && 
                                selectedDate.getDate() === day && 
                                selectedDate.getMonth() === currentMonth.getMonth() &&
                                selectedDate.getFullYear() === currentMonth.getFullYear()
                                  ? 'bg-purple-600 text-white'
                                  : 'text-purple-200 hover:bg-white/10'
                              }`}
                            >
                              {day}
                            </button>
                          ) : (
                            <div className="p-2"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Input and Search */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-200 mb-3">Time & Search</h4>
                    
                    {selectedDate && (
                      <div className="mb-3 p-2 bg-purple-600/10 rounded border border-purple-600/20">
                        <div className="text-xs text-purple-300">Selected Date:</div>
                        <div className="text-sm text-purple-200 font-medium">
                          {formatDateDisplay(selectedDate)}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-purple-300 mb-1">
                          Time (e.g., 13:00, 1:00 PM, 1pm)
                        </label>
                        <input
                          type="text"
                          value={timeInput}
                          onChange={(e) => setTimeInput(e.target.value)}
                          placeholder="13:00"
                          className="w-full p-2 bg-white/10 border border-white/20 rounded text-purple-200 placeholder-purple-400"
                        />
                      </div>

                      <Button
                        disabled={!selectedDate || !timeInput}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                      >
                        <Search className="h-4 w-4 mr-1" />
                        Find Rate
                      </Button>

                      {/* Display found rate */}
                      <div className="mt-3 p-3 bg-green-600/10 border border-green-600/20 rounded">
                        <div className="text-xs text-green-300 mb-1">Rate Found:</div>
                        <div className="text-lg font-bold text-green-400">1.3190</div>
                        <Button
                          size="sm"
                          className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          Use This Rate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-4 p-3 bg-purple-600/10 rounded-lg border border-purple-600/20">
              <p className="text-sm text-purple-300">
                <strong>How to use:</strong> Use the Date/Time Search for specific rates, or hover over the chart to see historical rates and click on any point to select that rate for your calculation.
              </p>
            </div>
          </div>

          {/* Chart Container */}
          <div className="p-6 flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="bg-[#10051A] border border-white/20 rounded-lg" style={{ width: 800, height: 400 }}>
                {/* Chart pair label */}
                <div className="absolute top-4 left-4 text-purple-300 font-semibold text-lg">
                  {selectedPair}
                </div>
                
                {/* Simplified chart visualization */}
                <svg width="800" height="400" className="rounded-lg">
                  <defs>
                    <linearGradient id="priceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  {[1, 2, 3, 4, 5].map(i => (
                    <line key={i} x1="60" y1={60 + (i * 60)} x2="740" y2={60 + (i * 60)} stroke="#ffffff20" strokeWidth="1" />
                  ))}
                  
                  {/* Price labels */}
                  <text x="50" y="80" fill="#C7B3FF80" fontSize="12" textAnchor="end">1.3548</text>
                  <text x="50" y="140" fill="#C7B3FF80" fontSize="12" textAnchor="end">1.3489</text>
                  <text x="50" y="200" fill="#C7B3FF80" fontSize="12" textAnchor="end">1.3429</text>
                  <text x="50" y="260" fill="#C7B3FF80" fontSize="12" textAnchor="end">1.3370</text>
                  <text x="50" y="320" fill="#C7B3FF80" fontSize="12" textAnchor="end">1.3311</text>
                  
                  {/* Price line */}
                  <path 
                    d="M60,120 L150,100 L240,130 L330,110 L420,90 L510,160 L600,140 L690,120 L740,100" 
                    stroke="url(#priceGradient)" 
                    strokeWidth="2" 
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/20 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="text-sm text-purple-300">
                Showing 96 data points for {selectedPair.slice(0, 3)}/{selectedPair.slice(3)} ({selectedTimeframe})
              </div>
              <Button
                onClick={() => setShowHistoricalModal(false)}
                variant="outline"
                className="border-white/20 text-purple-200 hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl shadow-xl max-w-lg mx-auto" style={{ color: '#C7B3FF' }}>
      <CardHeader className="text-center pb-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Spread Checker
          </CardTitle>
        </div>
        <CardDescription className="text-purple-200/80 text-xs">
          Calculate competitive advantages and client savings in real-time
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Currency Pair */}
        <div className="space-y-1">
          <Label className="text-xs text-purple-200">Currency Pair</Label>
          <div className="bg-white/10 border-white/20 text-purple-100 p-2 rounded-lg text-sm">
            GBP/USD
          </div>
        </div>

        {/* Your Rate, Competitor Rate, Historical Rate Button - Row 1 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Your Rate</Label>
            <div className="bg-white/10 border-white/20 text-purple-100 p-1.5 rounded-lg text-sm">
              1.355
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Competitor</Label>
            <div className="bg-white/10 border-white/20 text-purple-100 p-1.5 rounded-lg text-sm">
              1.354
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-200 opacity-0">Hidden</Label>
            <Button
              onClick={() => setShowHistoricalModal(true)}
              variant="outline"
              size="sm"
              className="border-white/20 text-purple-200 hover:bg-white/10 text-xs h-8 w-full px-1"
            >
              Historical Rate
            </Button>
          </div>
        </div>

        {/* Client Name and Amount - Row 2 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Client Name</Label>
            <div className="bg-white/10 border-white/20 text-purple-100 p-1.5 rounded-lg text-sm">
              ExampleBroker.com
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-200">Amount to Buy</Label>
            <div className="bg-white/10 border-white/20 text-purple-100 p-1.5 rounded-lg text-sm">
              500000
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-purple-400/60 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all duration-200">
          Calculate Savings
        </Button>

        {/* Results Display */}
        <div className="p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-400/30">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-white/5 rounded">
              <p className="text-xs text-purple-300/70">PIPs Advantage</p>
              <p className="text-sm font-mono font-bold text-blue-400">10.0</p>
            </div>
            <div className="text-center p-2 bg-white/5 rounded">
              <p className="text-xs text-purple-300/70">Annual Savings</p>
              <p className="text-sm font-mono font-bold text-green-400">£14,171</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}