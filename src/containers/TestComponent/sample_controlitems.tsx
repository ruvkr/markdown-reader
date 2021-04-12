import { v4 as uuid } from 'uuid';
import { ControlItem } from '../../components/UI';
import { Add, ChevronBack, Close } from '../../assets/icons/essentials';

export const sample_controlitems: ControlItem[] = [
  {
    id: uuid(),
    name: 'Back',
    icon: <ChevronBack />,
  },
  {
    id: uuid(),
    name: 'Add',
    icon: <Add />,
  },
  {
    id: uuid(),
    name: 'Close',
    icon: <Close />,
  },
];
