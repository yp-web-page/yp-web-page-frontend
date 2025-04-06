export const SOCIAL_NETWORKS = {
  FACEBOOK: 'https://www.facebook.com/yancapublicidad1/?locale=es_LA',
  INSTAGRAM: 'https://www.instagram.com/yancapublicidad/?hl=es',
  LINKEDIN: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEw4u4hsIF5ngAAAZYByRMIZSjLuq29UGxfdyhsHD1IhlyDIuCpcy4lhF7QTMRuQF0cDmPJK0X3x1VVJH9zysUPQmAt-Qpjdea0J2Rm2xLAq73F5bXJiSfeKxtYbKxBOJWGU1M=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fyan-carlos-castro-b21a8b74'
} as const;

export type SocialNetwork = keyof typeof SOCIAL_NETWORKS;