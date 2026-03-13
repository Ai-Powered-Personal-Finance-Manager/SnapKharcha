export interface LinkButtonInterface {
  href: string;
  className?: string;
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
  dir?:string
}
