import {Contact} from 'react-native-contacts';
import {ExtGroupObject} from '../types';

export interface ContactState {
  contacts: Contact[];
  contactsAreLoading: boolean;
}

export interface GroupState {
  groups: ExtGroupObject[];
  groupsAreLoading: boolean;
}

export interface RootModelExt {
  contacts: ContactState;
  groups: GroupState;
}
