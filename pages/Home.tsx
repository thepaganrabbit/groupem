import React from 'react';
import { ActivityIndicator, Text, ToastAndroid, View } from 'react-native';
import Base from '../components/Base/Base';
import { Dispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { RootModelExt } from '../store/types';
import { Contact } from 'react-native-contacts';

const HomePage = () => {
    const dispatch: Dispatch = useDispatch();
    const contacts = useSelector(({ contacts }: RootModelExt) => contacts.contacts);
    const isLoading = useSelector(({ contacts }: RootModelExt) => contacts.contactsAreLoading);
    const loadContacts = async () => {
        await dispatch.contacts.getAllContacts();
    };
    React.useEffect(() => {
        if(!contacts) {
            loadContacts();
            ToastAndroid.showWithGravity(
                'Retrieving your contacts',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
        }
    }, [contacts])
    return isLoading && contacts ?  <ActivityIndicator size="large" color="#00ff00" /> : (
        <Base>
            <View>
                {contacts && contacts.map((contact: Contact) => <Text key={contact.recordID}>{contact.displayName}</Text>)}
            </View>
        </Base>
    );

};

export default HomePage;
