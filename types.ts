import {Contact} from 'react-native-contacts';
import SQlite, {ResultSet} from 'react-native-sqlite-storage';

export interface HasChildren {
  children: any;
}

export interface ExtGroupObject {
  id?: number;
  group_title: string;
  contacts: Contact[];
}

export interface IntGroupObject {
  id?: number;
  group_title: string;
  contacts: string;
}

export interface Interactions {
  state: boolean | any;
  action: (e?: any) => void;
}

export interface ISqDatabase {
  init: () => Promise<SQlite.SQLiteDatabase | undefined>;
  createDatabase: () => Promise<void>;
  createNewGroup: (
    props: IntGroupObject,
  ) => Promise<ExtGroupObject | undefined>;
  getAllGroups: () => Promise<ExtGroupObject[] | undefined>;
}

// Props
export interface ModalProps extends HasChildren, Interactions {}
