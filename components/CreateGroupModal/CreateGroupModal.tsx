import React from 'react';
import ModalBase from '../ModalBase/ModalBase';
import { ActivityIndicator, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, View } from 'react-native';
import { Interactions } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootModelExt } from '../../store/types';
import { Dispatch } from '../../store';
import { Contact } from 'react-native-contacts';

const CreateGroupModal = ({ action, state }: Interactions): React.JSX.Element => {
    const [groupName, setGroupName] = React.useState<string>('');
    const contacts = useSelector(({ contacts }: RootModelExt) => contacts.contacts);
    const [contactsGathered, gatherContacts] = React.useState<Contact[]>([]);
    const [filterableContacts, setFilterableContacts] = React.useState<Contact[]>(contacts);

    const dispatch: Dispatch = useDispatch();
    const isLoading = useSelector(({ contacts }: RootModelExt) => contacts.contactsAreLoading);
    const loadContacts = async () => {
        await dispatch.contacts.getAllContacts();
    };
    const saveGroup = async () => {
        try {
            await dispatch.groups.saveGroup({
                group_title: groupName,
                contacts: JSON.stringify(contactsGathered),
            });
            ToastAndroid.showWithGravity(
                'Group successfully created',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
            action(!state);
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Unable to save your group',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        }
    }
    React.useEffect(() => {
        if (!contacts) {
            loadContacts();
            ToastAndroid.showWithGravity(
                'Retrieving your contacts',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        }
        if(!isLoading) {
            setFilterableContacts(contacts);
        }
    }, [contacts, isLoading])
    return isLoading && filterableContacts ? <ActivityIndicator size="large" color="#00ff00" /> : (
        <ModalBase
            state={state}
            action={action}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontSize: 25 }}>Create A New Group</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setGroupName(text);
                        }}
                        value={groupName}
                    />
                    <ScrollView style={styles.scrollView}>
                        {filterableContacts && filterableContacts.map((contact: Contact) => (
                            <TouchableHighlight
                                 key={contact.recordID}
                                activeOpacity={0.6}
                                underlayColor="#dDDDDDD"
                                onPress={() => {
                                    const filteredContacts = filterableContacts.filter((contactFound: Contact) => contactFound.recordID !== contact.recordID);
                                    setFilterableContacts([...filteredContacts]);
                                    gatherContacts([...contactsGathered, contact])
                                }}>
                                <Text style={styles.bubbleText} >{contact.displayName}</Text>
                            </TouchableHighlight>))}
                    </ScrollView>
                    <Text>Contacts</Text>
                    <ScrollView style={styles.scrollView}>
                        {contactsGathered && contactsGathered.map((contact: Contact) => (
                            <Pressable key={contact.recordID} onLongPress={() => {
                                const filteredList = contactsGathered.filter((allContacts: Contact) => allContacts.recordID !== contact.recordID);
                                setFilterableContacts([...filterableContacts, contact]);
                                gatherContacts([...filteredList]);
                            }}>
                                <Text style={styles.bubbleText} >{contact.displayName}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <View style={styles.sideBySide}>
                        <Button
                            onPress={() => {
                                action(!state);
                            }}
                            title="Cancel"
                            color="#B72000"
                            accessibilityLabel="Save Group"
                        />
                        <View style={{marginLeft: 30}}/>
                        <Button
                            onPress={async () => {
                                if(groupName.length >= 3) await saveGroup();
                                else {
                                    ToastAndroid.showWithGravity(
                                        'Please provide a Name for the group',
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM,
                                    );
                                }
                            }}
                            title="Save"
                            color="#841584"
                            accessibilityLabel="Save Group"
                        />

                    </View>
                </View>
            </View>
        </ModalBase>
    );

};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    sideBySide: {
        flex: 0,
        flexDirection: 'row',
        alignContent: "space-between",
        height: 40,
    },
    bubbleText: {
        padding: 2,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
        marginTop: 2,
        marginBottom: 2,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 3
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default CreateGroupModal;
