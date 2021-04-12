import moment from 'moment';
import { HandlerFunction } from '../types';
import { ControlItem, FileIcon } from '../../UI';
import { ChevronBack } from '../../../assets/icons/essentials';
import styles from './details.module.scss';
import { Markdown } from '../../../store/files';

export const detailsHandler: HandlerFunction<'details'> = ({
  action,
  confirm,
  cancel,
}) => {
  const controls: ControlItem[] = [
    {
      id: 'ok',
      name: 'Okay',
      icon: <ChevronBack />,
      onClick: cancel,
    },
  ];

  const title =
    action.files.length === 1
      ? action.files[0].name
      : `${action.files.length} files`;

  const Content: React.FC = () => {
    if (action.files.length === 1) {
      const file = action.files[0];
      const infos = getInfo(file);

      return (
        <div className={styles.container}>
          <div className={styles.heading}>
            <FileIcon format='md' size={64} className={styles.icon} />
            <div className={styles.name}>{file.name}</div>
          </div>

          <table className={styles.table}>
            <tbody>
              {infos.map(i => (
                <tr key={i.name}>
                  <td className={styles.label}>{i.name}</td>
                  <td className={styles.info}>{i.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <div className={styles.heading}>
            <FileIcon format='md' size={64} className={styles.icon} />
            <div className={styles.name}>{action.files.length} files</div>
          </div>
        </div>
      );
    }
  };

  return { controls, title, Content };
};

const getInfo = (file: Markdown) => {
  return [
    {
      name: 'Created',
      value: moment(file.created).format('DD MMM YYYY hh:mm a'),
    },
    {
      name: 'Last Opened',
      value: file.lastOpened ? moment(file.lastOpened).fromNow() : 'Never',
    },
    {
      name: 'Missing Images',
      value: file.hasMissingImages ? 'Yes' : 'No',
    },
    {
      name: 'Progress',
      value: Math.round((file.progress ?? 0) * 100) + '%',
    },
  ];
};
