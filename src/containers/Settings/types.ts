export interface SettingItemI {
  id: string;
  name: string;
  title: string;
  icon: JSX.Element;
  info: string;
  content?: React.ComponentType;
}
