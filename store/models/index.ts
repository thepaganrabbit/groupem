import { Models } from '@rematch/core';
import { MyContacts } from './Contacts';
import { MyGroups } from './Groups';


export interface RootModel extends Models<RootModel> {
    contacts: typeof MyContacts;
    groups: typeof MyGroups;
}

export const models: RootModel = {
    contacts: MyContacts,
    groups: MyGroups,
};