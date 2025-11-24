
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  iconColor: string;
};

const FeatureCard = ({
  title,
  description,
  icon,
  path,
  color,
  iconColor,
}: FeatureCardProps) => {
  const [, setLocation] = useLocation();
  
  return (
    <div 
      onClick={() => setLocation(path)} 
      className="cursor-pointer h-full"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 h-full border border-gray-100 flex flex-col group">
        <div className={`${color} rounded-full w-12 h-12 flex items-center justify-center mb-3`}>
          <div className={`${iconColor}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{description}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className={`${iconColor} font-semibold text-sm`}>فتح</span>
          <ArrowLeft className={`${iconColor} transition-transform group-hover:translate-x-[-4px] h-4 w-4`} />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
