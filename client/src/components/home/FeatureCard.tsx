
import { useLocation } from "wouter";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  href: string;
  count: string;
  colorScheme: "primary" | "secondary" | "accent";
};

const colorMap = {
  primary: {
    bg: "bg-primary-light",
    text: "text-primary-custom",
    hover: "group-hover:translate-x-[-4px]",
  },
  secondary: {
    bg: "bg-secondary-light",
    text: "text-secondary-custom",
    hover: "group-hover:translate-x-[-4px]",
  },
  accent: {
    bg: "bg-accent-light",
    text: "text-accent-custom",
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
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-3 h-full border border-gray-100 flex flex-col group">
        <div className={`p-3 ${colors.text} rounded-full ${colors.bg} w-12 h-12 flex items-center justify-center mb-2`}>
          <span className="material-icons text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{description}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className={`${colors.text} font-semibold text-sm`}>{count}</span>
          <span className={`material-icons ${colors.text} transition-transform ${colors.hover} text-sm`}>
            arrow_back
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
