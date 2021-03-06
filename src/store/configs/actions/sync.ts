import { merge, cloneDeep } from 'lodash';
import { get, set, ConfigsStore } from '../useConfigsStore';
import { infodb } from '../../../database';
import { errorActions } from '../../error';

// id of doc in db
const dbid = 'configs';

export const initialSync = async () => {
  try {
    // get doc from db
    const dbConfigs = await infodb.get<ConfigsStore>(dbid);

    // values in store
    const storeConfigs = get();

    // update store values with db values
    const updated = cloneDeep(merge(storeConfigs, dbConfigs));

    // update in store
    set(updated);
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Configs database error',
      message: 'Error fetching data from configs database',
    });
  }
};

export const syncConfigs = async (configs: ConfigsStore) => {
  try {
    // update changes to db
    await infodb.save<ConfigsStore>(dbid, configs);
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Configs database error',
      message: 'Error syncing configs database',
    });
  }
};
