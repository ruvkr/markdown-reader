export interface ControlItem {
  id: string;
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}
