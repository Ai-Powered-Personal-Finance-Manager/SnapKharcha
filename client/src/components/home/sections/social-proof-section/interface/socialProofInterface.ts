export interface statsInterface {
  value: string;
  label: string;
  color: string;
  bg: string;
  border: string;
}

export interface statsDataInterface {
  stats: statsInterface[];
}

export interface testimonialsInterface {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

export interface testimonialsDataInterface {
  testimonials: testimonialsInterface[];
}
