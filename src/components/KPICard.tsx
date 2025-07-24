import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const KPICard = ({ title, value, icon, trend, className }: KPICardProps) => {
  return (
    <Card className={cn("bg-card shadow-soft hover:shadow-medium transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-open-sans text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-roboto font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "text-sm font-medium mt-2",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.value}
              </p>
            )}
          </div>
          <div className="ml-4 p-3 bg-secondary rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;