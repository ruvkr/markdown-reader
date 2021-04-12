export interface QuickNavItem {
  id: string;
  title: string;
  icon: JSX.Element;
  content?: JSX.Element;
  isButton?: boolean;
  onClick?: () => void;
}
