import { Models } from '@rematch/core';
import { MyContacts } from './Contacts';


export interface RootModel extends Models<RootModel> {
    contacts: typeof MyContacts;
}

export const models: RootModel = {
    contacts: MyContacts,
};