export interface FileControlItem {
  id: string;
  name: string;
  icon: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}
