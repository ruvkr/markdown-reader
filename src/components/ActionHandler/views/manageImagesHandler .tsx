import { useState } from 'react';
import styled from 'styled-components';
import { HandlerFunction } from '../types';
import { ControlItem, Checkbox } from '../../UI';
import {
  Checkmark,
  ChevronBack,
  Heart,
} from '../../../assets/icons/essentials';

export const manageImagesHandler: HandlerFunction<'manageImages'> = ({
  action,
  confirm,
  cancel,
}) => {
  let neverAsk = false;

  const controls: ControlItem[] = [
    {
      id: 'confirm-manage-images',
      name: 'Manage',
      icon: <Checkmark />,
      onClick: () => confirm({ id: action.id, neverAsk }),
    },
    {
      id: 'cancel-action',
      name: 'Cancel',
      icon: <ChevronBack />,
      onClick: cancel,
    },
  ];

  const message =
    action.files.length === 1
      ? `File ${action.files[0].name} will be deleted. Confirm delete action?`
      : `${action.files.length} files will be deleted. Confirm delete action?`;

  const Content: React.FC = () => {
    const [neverAskState, setNeverAsk] = useState(false);

    const onChangeHandler = (value: boolean) => {
      setNeverAsk(value);
      neverAsk = value;
    };

    return (
      <ScContainer>
        <ScManageIcon />
        <ScMessage>{message}</ScMessage>
        <Checkbox checked={neverAskState} onChange={onChangeHandler} />
        <ScMessage>Never ask again</ScMessage>
      </ScContainer>
    );
  };

  return {
    title: 'Manage Images',
    controls,
    Content,
  };
};

const ScContainer = styled.div`
  padding: 16px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-items: center;
  grid-column-gap: 8px;
  grid-row-gap: 16px;
`;

const ScManageIcon = styled(Heart)`
  width: 3em;
  height: 3em;
  display: flex;
  color: var(--accent);
  fill: var(--accent);
  stroke: var(--accent);
`;

const ScMessage = styled.div`
  color: var(--secondary);
  justify-self: left;
`;
