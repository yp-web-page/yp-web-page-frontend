export const SOCIAL_NETWORKS = {
  FACEBOOK: 'https://www.facebook.com/yancapublicidad1/?locale=es_LA',
  INSTAGRAM: 'https://www.instagram.com/yancapublicidad/?hl=es',
  WHATSAPP: 'https://wa.me/573041289179',
} as const;

export const CONTACT_INFO = {
  PHONE: '(602) 880 1935',
  PHONE_HREF: 'tel:+6028801935',
  WHATSAPP_NUMBER: '304 128 9179',
  WHATSAPP_HREF: 'https://wa.me/573041289179',
  EMAIL: 'sellosyanca@gmail.com',
  EMAIL_HREF: 'mailto:sellosyanca@gmail.com',
  CITY: 'Cali, Colombia',
  HOURS_SHORT: 'Lun—Vie 9:00—17:30 · Sáb 9:00—14:00',
  HOURS_LONG: 'Lun—Vie 9:00—13:00 · 14:00—17:30 · Sáb 9:00—14:00',
} as const;

export type SocialNetwork = keyof typeof SOCIAL_NETWORKS;
