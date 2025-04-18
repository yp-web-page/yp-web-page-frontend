import { ComponentType, JSX, SVGProps } from "react";
import { SVG_PATHS } from "../../constants/svgPaths"; 
import { error, profile } from "console";

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

const SuccessfulSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    ...rest
  } = props;

  return (
      <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
        <path fillRule="evenodd" d={SVG_PATHS.SUCCESSFUL} clipRule="evenodd" />
    </svg>
  );
};

const ErrorSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    ...rest
  } = props;

  return (
      <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
        <path fillRule="evenodd" d={SVG_PATHS.ERROR} clipRule="evenodd" />
    </svg>
  );
};

const WarningSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    ...rest
  } = props;

  return (
      <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
        <path fillRule="evenodd" d={SVG_PATHS.WARNING} clipRule="evenodd" />
    </svg>
  );
};

const InfoSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    ...rest
  } = props;

  return (
      <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
        <path fillRule="evenodd" d={SVG_PATHS.INFO} clipRule="evenodd" />
    </svg>
  );
};

const FacebookSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    ...rest
  } = props;

  return (
      <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
        <path d={SVG_PATHS.FACEBOOK} />
    </svg>
  );
};

const InstagramSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    ...rest
  } = props;

  return (
      <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
        <path d={SVG_PATHS.INSTAGRAM} />
    </svg>
  );
};

const LinkedinSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    ...rest
  } = props;

  return (
      <svg className={className} fill={fill} viewBox={viewBox} {...rest}>
        <path d={SVG_PATHS.LINKEDIN} />
    </svg>
  );
};

const ProfileSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    stroke = "currentColor",
    ...rest
  } = props;

  return (
    <svg className={className} fill={fill} stroke={stroke} viewBox={viewBox} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.PROFILE} />
    </svg>
  );
};

const ToggleSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    stroke = "currentColor",
    ...rest
  } = props;

  return (
    <svg className={className} fill={fill} stroke={stroke} viewBox={viewBox} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.TOGGLE} />
    </svg>
  );
};


const CloseSvgIcon: SVGIconComponent = (props) => {
  const {
    className = "",
    fill = "currentColor",
    viewBox = "0 0 24 24",
    color,
    stroke = "currentColor",
    ...rest
  } = props;

  return (
    <svg className={className} fill={fill} stroke={stroke} viewBox={viewBox} {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.CLOSE} />
    </svg>
  );
};

const iconSvgMap: Record<string, SVGIconComponent> = {
    user: UserSvgIcon,
    plus: PlusSvgIcon,
    eyeoff: EyeOffSvgIcon,
    eye: EyeSvgIcon,
    successful: SuccessfulSvgIcon,
    error: ErrorSvgIcon,
    warning: WarningSvgIcon,
    info: InfoSvgIcon,
    facebook: FacebookSvgIcon,
    instagram: InstagramSvgIcon,
    linkedin: LinkedinSvgIcon,
    profile: ProfileSvgIcon,
    toggle: ToggleSvgIcon,
    close: CloseSvgIcon,
}

export default iconSvgMap;