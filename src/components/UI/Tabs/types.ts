interface IconProps {
  title?: string;
  active: boolean;
  onClick: () => void;
}

export type TabItem = {
  id: string;
  title: string;
  icon: (props: IconProps) => React.ReactElement | null;
  content?: JSX.Element;
  isButton?: boolean;
  onClick?: () => void;
};
