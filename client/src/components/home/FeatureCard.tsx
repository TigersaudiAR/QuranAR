import { Link } from "wouter";

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

  return (
    <Link href={href}>
      <a className="block group">
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-4 h-full border border-gray-100 flex flex-col">
          <div className={`p-4 ${colors.text} rounded-full ${colors.bg} w-16 h-16 flex items-center justify-center mb-4`}>
            <span className="material-icons text-3xl">{icon}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="mt-auto flex justify-between items-center">
            <span className={`${colors.text} font-semibold`}>{count}</span>
            <span className={`material-icons ${colors.text} transition-transform ${colors.hover}`}>
              arrow_back
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default FeatureCard;
