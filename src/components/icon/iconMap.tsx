import { ComponentType, JSX, SVGProps } from "react";
import { SVG_PATHS } from "../../constants/svgPaths"; 

type SVGIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const UserSvgIcon: SVGIconComponent = (props) => {
    const {
      className = "",
      fill = "currentColor",
      viewBox = "0 0 24 24",
      ...rest
    } = props;
  
    return (
      <svg className={className} viewBox={viewBox} fill={fill} {...rest}>
        <path d={SVG_PATHS.USER} />
      </svg>
    );
};

const PlusSvgIcon: SVGIconComponent = (props) => {
    const {
      className = "",
      fill = "currentColor",
      viewBox = "0 0 24 24",
      color,
      ...rest
    } = props;
  
    return (
      <svg className={className} viewBox={viewBox} fill={fill} color={color} {...rest}>
        <path d={SVG_PATHS.PLUS} />
      </svg>
    );
};


const EyeSvgIcon: SVGIconComponent = (props) => {
    const {
      className = "",
      fill = "currentColor",
      viewBox = "0 0 24 24",
      color,
      ...rest
    } = props;
  
    return (
        <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.INTERNALEYE} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.EXTERNALEYE} />
      </svg>
    );
};

const EyeOffSvgIcon: SVGIconComponent = (props) => {
    const {
      className = "",
      fill = "currentColor",
      viewBox = "0 0 24 24",
      color,
      ...rest
    } = props;
  
    return (
        <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.EYEOFF} />
      </svg>
    );
};

const iconSvgMap: Record<string, SVGIconComponent> = {
    user: UserSvgIcon,
    plus: PlusSvgIcon,
    eyeoff: EyeSvgIcon,
    eye: EyeSvgIcon
}

export default iconSvgMap;