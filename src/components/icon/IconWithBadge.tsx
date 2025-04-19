import React from "react";
import Icon from "./Icon";

interface IconWithBadgeProps {
  icon: string;
  badgeIcon?: string;
  iconSize?: number;
  badgeSize?: number;
  iconFill?: string;
  badgeFill?: string;
  viewBox?: string;

  // Customizable class names
  containerClassName?: string;
  iconClassName?: string;
  badgeWrapperClassName?: string;
  badgeContainerClassName?: string;
  badgeIconClassName?: string;
}

const IconWithBadge: React.FC<IconWithBadgeProps> = ({
  icon,
  badgeIcon,
  iconSize = 80,
  badgeSize = 24,
  iconFill = "white",
  badgeFill = "#4263EB",

  containerClassName = "relative flex items-center justify-center",
  iconClassName = "",
  badgeWrapperClassName = "absolute -right-1 -bottom-1",
  badgeContainerClassName = "bg-white rounded-full p-1.5 shadow-lg",
  badgeIconClassName = "",
}) => {
  return (
    <div className={containerClassName}>
      <Icon name={icon} size={iconSize} fill={iconFill} className={iconClassName} />
      {badgeIcon && (
        <div className={badgeWrapperClassName}>
            <div className={badgeContainerClassName}>
                <Icon
                    name={badgeIcon}
                    size={badgeSize}
                    fill={badgeFill}
                    className={badgeIconClassName}
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default IconWithBadge;