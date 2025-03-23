
import { useLocation } from "wouter";
import { LucideIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count: string;
  colorScheme: "primary" | "secondary" | "accent";
};

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    hover: "group-hover:translate-x-[-4px]",
  },
  secondary: {
    bg: "bg-green-100",
    text: "text-green-600",
    hover: "group-hover:translate-x-[-4px]",
  },
  accent: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    hover: "group-hover:translate-x-[-4px]",
  },
};

const FeatureCard = ({
  title,
  description,
  icon,
  href,
  count,
  colorScheme,
}: FeatureCardProps) => {
  const colors = colorMap[colorScheme];
  const [, setLocation] = useLocation();
  
  return (
    <div 
      onClick={() => setLocation(href)} 
      className="cursor-pointer h-full"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 h-full border border-gray-100 flex flex-col group">
        <div className={`${colors.bg} rounded-full w-12 h-12 flex items-center justify-center mb-3`}>
          <div className={`${colors.text}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{description}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className={`${colors.text} font-semibold text-sm`}>{count}</span>
          <ArrowLeft className={`${colors.text} transition-transform ${colors.hover} h-4 w-4`} />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
