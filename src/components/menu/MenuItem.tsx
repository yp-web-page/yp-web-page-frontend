import Button from "../Button";
import Icon from "../icon/Icon";

interface MenuItemProps {
  icon: string;
  text: string;
  onClick: () => void;
  textClass?: string;
  iconClass?: string;
};

const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    text,
    onClick,
    textClass = 'text-gray-700',
    iconClass = 'text-gray-500',
  }) => (
    <Button
      type="button"
      onClick={onClick}
      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors duration-200 ${textClass}`}
    >
      <Icon
        name={icon}
        className={`w-5 h-5 ${iconClass}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      />
      {text}
    </Button>
  );

  export default MenuItem;