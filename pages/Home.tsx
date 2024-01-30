import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
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
        dispatch.contacts.getAllContacts();
    };
    React.useEffect(() => {
        if(contacts.length <= 0) {
            loadContacts();
        }
    }, [])
    return isLoading ?  <ActivityIndicator size="large" color="#00ff00" /> : (
        <Base>
            <View>
                {contacts.map((contact: Contact) => <Text key={contact.recordID}>{contact.displayName}</Text>)}
            </View>
        </Base>
    );

};

export default HomePage;
