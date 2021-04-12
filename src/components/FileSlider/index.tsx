import styled from 'styled-components';
import moment from 'moment';
import { selectionActions } from '../../store/ui';
import { Markdown } from '../../store/files';
import { readActions } from '../../store/read';
import { Button, Scroll, Label, FileIcon, scrollClasses as sc } from '../UI';
import { FileView } from '../FileView';
import { ChevronForward } from '../../assets/icons/essentials';
import styles from './styles.module.scss';

interface Props {
  title: string;
  files?: Markdown[] | null;
  info?: 'created' | 'lastOpened';
  more?: string;
  onMoreClick?: () => void;
}

export const FileSlider: React.FC<Props> = ({ title, more, files, onMoreClick, info }) => {
  const _files = files?.map(file => (
    <FileView
      key={file._id}
      name={file.name}
      info={info && moment(file[info]).fromNow()}
      image={MDLogo}
      progress={file.progress}
      onClick={() => readActions.read(file)}
      onContextMenu={() => selectionActions.longpress(file)}
    />
  ));

  return (
    <div className={styles.container}>
      <Label title={title}>{more && <Button icon={<ChevronForward />} name={more} onClick={onMoreClick} />}</Label>
      
      {files && (
        <ScScroll>
          <div className={styles.fileslider}>{_files}</div>
        </ScScroll>
      )}
    </div>
  );
};

const MDLogo = <FileIcon format='md' />;

const ScScroll = styled(Scroll)`
  .${sc.maskleft} {
    transform: translateX(-16px);
  }

  .${sc.maskright} {
    transform: translateX(16px);
  }
`;
