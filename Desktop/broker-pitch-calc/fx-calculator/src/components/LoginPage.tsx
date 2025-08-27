import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, LogIn } from 'lucide-react';

// Import our custom hook
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../App';

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = async (): Promise<void> => {
    const result = await auth.login(auth.loginCode);
    
    if (result.success) {
      // Update global auth state
      authContext?.login();
      // Navigate to calculator
      navigate('/calculator');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center" style={{ backgroundColor: '#10051A' }}>
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl shadow-xl" style={{ color: '#C7B3FF' }}>
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="h-8 w-8 text-purple-400" />
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Access Portal
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              Enter your access code to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Login Code Input */}
            <div className="space-y-2">
              <Label htmlFor="login-code" className="text-sm font-medium text-purple-200">
                Access Code
              </Label>
              <Input
                id="login-code"
                type="password"
                value={auth.loginCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => auth.setLoginCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter code"
                className="bg-white/5 border-white/20 text-purple-100 font-mono text-lg focus:border-purple-400 focus:ring-purple-400/20 text-center tracking-widest"
                disabled={auth.isLoading}
              />
              
              {/* Error Message */}
              {auth.error && (
                <div className="text-red-400 text-sm text-center mt-2 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                  {auth.error}
                </div>
              )}
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={auth.isLoading || !auth.loginCode.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {auth.isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </>
              )}
            </Button>

            {/* Demo Code Hint */}
            <div className="text-center">
              <p className="text-xs text-purple-300/50">
                Demo code: 123456
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-purple-300 hover:text-white text-sm"
              >
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}