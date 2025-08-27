import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';

// Import our custom hooks and components
import { Navbar } from './ui/Navbar';
import { HeroSection } from './ui/HeroSection';
import ProblemSolutionSection from "./ui/ProblemSolutionSection";
import { FeaturesGrid } from './ui/FeaturesGrid';
import PricingSection from "./ui/PricingSection";
import { Footer } from './ui/Footer';
import { MockCalculator } from './ui/MockCalculator';
import { HistoricalChart } from './ui/HistoricalChart';
import { AuthContext } from '../App';
import { MOCK_CHART_DATA, filterDataByTimeframe } from '../constants/mockChartData';

export default function LandingPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  // Handle all the callback functions
  const handleSignUp = (): void => {
    // For now, redirect to login - in real app this would be signup page
    navigate('/login');
  };

  const handleLogin = (): void => {
    navigate('/login');
  };

  const handleLogout = (): void => {
    authContext?.logout();
  };

  const handleGetStarted = (): void => {
    navigate('/login');
  };

  const handleContactSales = (): void => {
    alert('Contact sales functionality - would redirect to sales form');
  };

  // Mock chart data for the historical rates demo
  const mockChartData = filterDataByTimeframe(MOCK_CHART_DATA['GBPUSD'] || [], 30); // 1M timeframe
  
  const handleMockPriceSelect = (price: number): void => {
    // Just log for demo purposes - in real app this would do something
    console.log('Selected price:', price);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#10051A', color: '#C7B3FF' }}>
      
      {/* Navigation */}
      <Navbar 
        isSignedIn={authContext?.isAuthenticated || false}
        onSignIn={handleLogin}
        onSignOut={handleLogout}
      />

      {/* Hero Section */}
      <HeroSection onSignUp={handleSignUp} />

      {/* Problem & Solution Section */}
      <ProblemSolutionSection />

      {/* Features Section */}
      <FeaturesGrid />

      {/* Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Spread Checker Calculator
          </h2>
          <p className="text-xl text-purple-200/80 mb-12">
            Here's an example of our intuitive FX calculator in action.
          </p>
          
          <div className="mb-8">
            <MockCalculator />
          </div>
          
          <Button 
            onClick={handleSignUp}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-purple-400/60 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all duration-200"
          >
            <Play className="mr-2 h-5 w-5" />
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Historical Rates Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Historical Rates
          </h2>
          <p className="text-xl text-purple-200/80 mb-12">
            Access historical exchange rate data to compare with clients historical buys.
          </p>
          
          <div className="mb-8">
            {/* Mock Historical Rates Modal */}
            <div className="bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl max-w-4xl mx-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <h3 className="text-2xl font-bold text-purple-200">Historical Exchange Rates</h3>
                <X className="h-6 w-6 text-purple-200" />
              </div>
              
              {/* Controls */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* Currency Pairs */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-purple-200">Pair:</span>
                    <div className="flex gap-1">
                      <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-medium">
                        GBP/USD
                      </button>
                      <button className="px-3 py-1 bg-white/10 text-purple-200 rounded text-sm font-medium">
                        GBP/EUR
                      </button>
                      <button className="px-3 py-1 bg-white/10 text-purple-200 rounded text-sm font-medium">
                        EUR/USD
                      </button>
                    </div>
                  </div>
                  
                  {/* Timeframe */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-purple-200">Timeframe:</span>
                    <div className="flex gap-1">
                      <button className="px-3 py-1 bg-white/10 text-purple-200 rounded text-sm font-medium">
                        1D
                      </button>
                      <button className="px-3 py-1 bg-white/10 text-purple-200 rounded text-sm font-medium">
                        5D
                      </button>
                      <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-medium">
                        1M
                      </button>
                      <button className="px-3 py-1 bg-white/10 text-purple-200 rounded text-sm font-medium">
                        3M
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="p-3 bg-purple-600/10 rounded-lg border border-purple-600/20">
                  <p className="text-sm text-purple-300">
                    💡 <strong>How to use:</strong> Hover over the chart to see historical rates, then click on any point to select that rate for your calculation.
                  </p>
                </div>
              </div>
              
              {/* Chart Area */}
              <div className="p-6">
                <HistoricalChart
                  data={mockChartData}
                  onPriceSelect={handleMockPriceSelect}
                  selectedPair="GBPUSD"
                  width={800}
                  height={320}
                />
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/20 flex items-center justify-between">
                <div className="text-sm text-purple-300">
                  Showing {mockChartData.length} data points for GBP/USD (1M)
                </div>
                <Button
                  variant="outline"
                  className="border-white/20 text-purple-200 hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection 
        onGetStarted={handleGetStarted}
        onContactSales={handleContactSales}
      />

      {/* Footer */}
      <Footer onLogin={handleLogin} />
    </div>
  );
}