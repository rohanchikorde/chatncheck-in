
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  className?: string;
}

export default function RefreshButton({ onRefresh, className }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      // Add a small delay to make the animation visible
      setTimeout(() => {
        setIsRefreshing(false);
      }, 600);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:bg-primary/10", 
        isRefreshing && "shadow-[0_0_8px_rgba(79,70,229,0.6)]",
        className
      )}
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw 
        className={cn(
          "h-5 w-5 transition-transform duration-500",
          isRefreshing && "animate-spin"
        )} 
      />
      <span className="sr-only">Refresh</span>
      
      {/* Ripple effect */}
      {isRefreshing && (
        <span 
          className="absolute inset-0 rounded-full bg-primary/20 scale-0 animate-ripple"
          style={{ 
            animationDuration: '0.8s',
            animationIterationCount: 1
          }}
        />
      )}
    </Button>
  );
}
