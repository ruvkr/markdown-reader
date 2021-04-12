import { Actions, ActionTypes } from '../types';
import { actionAlert } from '../../alert/actions/actionsAlerts';
import { imActions } from '../../image-manager';
import { get as getConfigs, configsActions } from '../../configs';
import { crud } from '.';

export const dispatchAction = async <T extends ActionTypes>(
  type: T,
  info: Actions[T]
) => {
  try {
    switch (type) {
      case 'delete': {
        const files = info as Actions['delete'];
        const { autoConfirmDelete } = getConfigs().fac;

        if (!autoConfirmDelete) {
          const { neverAsk } = await actionAlert.create('delete', { files });
          neverAsk && configsActions.updatefac({ autoConfirmDelete: true });
        }

        await crud.delete(files);
        break;
      }

      case 'manageImages': {
        const files = info as Actions['manageImages'];
        imActions.manage(files);
        break;
      }

      case 'details': {
        const files = info as Actions['details'];
        await actionAlert.create('details', { files });
        break;
      }

      case 'rename': {
        const file = info as Actions['rename'];
        const { newName } = await actionAlert.create('rename', { file });
        console.log(newName);
        break;
      }

      case 'addToCollection': {
        const files = info as Actions['addToCollection'];
        const allCollections: string[] = [];
        const { collectionNames } = await actionAlert.create(
          'addToCollection',
          { files, allCollections }
        );
        
        console.log(collectionNames);
      }
    }
  } catch (error) {
    if (error !== 'alert_canceled') console.error(error);
  }
};
