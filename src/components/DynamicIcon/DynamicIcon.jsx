import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";

export default function DynamicIcon({ iconName, className = "w-6 h-6" }) {
  const IconComponent = FaIcons[iconName] || HiIcons[iconName] || FaIcons.FaGlobe;
  return <IconComponent className={className} />;
}