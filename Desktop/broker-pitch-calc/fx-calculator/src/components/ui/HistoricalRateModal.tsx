import React from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
import { HistoricalChart } from './HistoricalChart';
import { type ChartDataPoint, TIMEFRAMES } from '../../constants/mockChartData';

interface HistoricalRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPriceSelect: (price: number) => void;
  chartData: ChartDataPoint[];
  selectedPair: string;
  availablePairs: string[];
  selectedTimeframe: string;
  onPairChange: (pair: string) => void;
  onTimeframeChange: (timeframe: string) => void;
}

export const HistoricalRateModal: React.FC<HistoricalRateModalProps> = ({
  isOpen,
  onClose,
  onPriceSelect,
  chartData,
  selectedPair,
  availablePairs,
  selectedTimeframe,
  onPairChange,
  onTimeframeChange
}) => {
  if (!isOpen) return null;

  const handlePriceSelect = (price: number) => {
    onPriceSelect(price);
    onClose(); // Close modal after selection
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#10051A] border border-white/20 rounded-xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-purple-200">
            Historical Exchange Rates
          </h2>
          <Button
            onClick={onClose}
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
              <label className="text-sm font-medium text-purple-200">
                Pair:
              </label>
              <div className="flex gap-1">
                {availablePairs.map((pair) => (
                  <button
                    key={pair}
                    onClick={() => onPairChange(pair)}
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
              <label className="text-sm font-medium text-purple-200">
                Timeframe:
              </label>
              <div className="flex gap-1">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf.label}
                    onClick={() => onTimeframeChange(tf.label)}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                      selectedTimeframe === tf.label
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 p-3 bg-purple-600/10 rounded-lg border border-purple-600/20">
            <p className="text-sm text-purple-300">
              💡 <strong>How to use:</strong> Hover over the chart to see historical rates, then click on any point to select that rate for your calculation.
            </p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="p-6 flex justify-center">
          <div className="w-full max-w-4xl">
            <HistoricalChart
              data={chartData}
              onPriceSelect={handlePriceSelect}
              selectedPair={selectedPair}
              width={800}
              height={400}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 bg-white/5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-purple-300">
              Showing {chartData.length} data points for {selectedPair.slice(0, 3)}/{selectedPair.slice(3)} ({selectedTimeframe})
            </div>
            <Button
              onClick={onClose}
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
};