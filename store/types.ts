import { Contact } from "react-native-contacts";

export interface ContactState {
    contacts: Contact[];
    contactsAreLoading: boolean;
}

export interface RootModelExt {
   contacts: ContactState;
  }