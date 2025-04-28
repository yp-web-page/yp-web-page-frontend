import iconSvgMap from "./iconMap";

interface IconProps {
    name: keyof typeof iconSvgMap;
    className?: string;
    fill?: string;
    viewBox?: string;
    size?: number;
    stroke?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = "", viewBox = "0 0 24 24", fill = "currentColor", ...rest}) => {
    const IconComponent = iconSvgMap[name];
  
    if (!IconComponent) return null;
  
    return (
      <IconComponent
        className={className}
        viewBox={viewBox}
        fill={fill}
        width={rest.size}
        height={rest.size}
        {...rest}
      />
    );
  };
  
  export default Icon;