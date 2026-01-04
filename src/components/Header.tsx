import { Shield, Scan } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-card border-b border-border/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-effect">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <Scan className="w-3 h-3 text-primary absolute -bottom-0.5 -right-0.5" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Trust-Scout</h1>
              <p className="text-xs text-muted-foreground">Fake Account Detection</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-mono">
              v1.0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
