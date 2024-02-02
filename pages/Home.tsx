import React from 'react';
import { ActivityIndicator, Button, ScrollView, Text, ToastAndroid, View } from 'react-native';
import Base from '../components/Base/Base';
import { Dispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { RootModelExt } from '../store/types';
import CreateGroupModal from '../components/CreateGroupModal/CreateGroupModal';
import { ExtGroupObject } from '../types';

const HomePage = () => {
    const dispatch: Dispatch = useDispatch();
    const groups = useSelector(({ groups }: RootModelExt) => groups.groups);
    const isLoading = useSelector(({ groups }: RootModelExt) => groups.groupsAreLoading);
    const loadGroups = async () => {
        await dispatch.groups.getAllgroups();
    };
    const [modalState, setOpenModal] = React.useState<boolean>(false);
    const [initCheck, setInitCheck] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!initCheck) {
            loadGroups();
            ToastAndroid.showWithGravity(
                'Retrieving your Groups',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
            setInitCheck(true);
        }
    }, [groups, isLoading])
    return isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : (
        <Base>
            <View>
                <Button
                    onPress={() => setOpenModal(!modalState)}
                    title="Create Group"
                    color="#841584"
                    accessibilityLabel="Create a new group"
                />
            </View>
            <CreateGroupModal action={setOpenModal} state={modalState}  />
            <ScrollView>
                {groups && groups.map((group: ExtGroupObject) => <Text key={group.id}>{group.group_title}</Text>)}
            </ScrollView>
        </Base>
    );

};

export default HomePage;
