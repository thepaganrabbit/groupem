import { createModel } from "@rematch/core";
import Contacts, { Contact } from 'react-native-contacts';

import { ContactState } from "../types";
import { RootModel } from ".";
import { PERMISSIONS, check } from "react-native-permissions";
import { ToastAndroid } from "react-native";

export const MyContacts = createModel<RootModel>()({
  state: {
      constacts: [],
      contactsAreLoading: false,
  } as unknown as ContactState,
  reducers: {
    setAllContacts: (state: ContactState, payload: Contact[]) => {
        state.contacts = payload;
        return { ...state };
    },
   setContactState: (state: ContactState, payload: boolean) => {
    state.contactsAreLoading = payload;
    return {...state};
   }
  },
  effects: (dispatch) => ({
    getAllContacts: async () => {
        try {
            dispatch.contacts.setContactState(true);
          const permission = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
          if(permission !== 'granted') throw new Error('Permission Issue Found');
            const contacts = await Contacts.getAll();
            dispatch.contacts.setAllContacts(contacts);
            dispatch.contacts.setContactState(false);
        } catch (error) {
            dispatch.contacts.setContactState(false);
            ToastAndroid.showWithGravity(
                (error as Error).message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
        }
    },
  }),
});