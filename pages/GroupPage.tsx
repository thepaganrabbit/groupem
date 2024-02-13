import React from 'react';
import { View, Text, ToastAndroid, ActivityIndicator, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import { Dispatch } from '../store';
import { useDispatch } from 'react-redux';
import { Contact } from 'react-native-contacts';
import { WEBCOLOURS, randomNumberGenerator } from '../Utils';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const GrouPage = ({ route, navigation }: any): React.JSX.Element => {
    const { groupID } = route.params;
    const dispatch: Dispatch = useDispatch();
    let navIfFailed: NodeJS.Timeout;
    const tableData: {heads: any[], rows: any[]} = {
        heads: ['name', 'phone', 'email', 'call', 'text', 'delete'],
        rows: []
    }
    const group = React.useMemo(() => {
        const found_group = dispatch.groups.findGroup(groupID);
        if(!found_group) {
            ToastAndroid.showWithGravity(
                'Unable to find Group',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            navIfFailed = setTimeout(() => {
                navigation.navigate('Group Em');
            }, 15000)
        }
       (found_group.contacts.forEach((fGroup: Contact) => {
            const rowArr: any[] = [
                fGroup.displayName,
                fGroup.phoneNumbers.length > 0 ? fGroup.phoneNumbers.filter((number) => number.label === 'mobile')[0].number : 'No Number Provided',
                fGroup.emailAddresses.length > 0 ? fGroup.emailAddresses.filter((email) => email.label === 'home')[0].email : 'No Email Provided',
                <Pressable><Icon name="phone" size={30} style={{textAlign: 'center'}}/></Pressable>,
                <Pressable><MaterialCommunityIcon style={{textAlign: 'center'}} name="message" size={30} /></Pressable>,
                <Pressable><Icon name="trash" size={30} color={WEBCOLOURS[15]} style={{textAlign: 'center'}} /></Pressable>
            ];
           tableData.rows.push(rowArr);
        }));
        return found_group;
    }, []);
    
    React.useEffect(() => {
        return () => clearTimeout(navIfFailed);
    }, [group]);

    return (
        <View>
            <Text style={styles.title}>{group.group_title}</Text>
            <View style={{marginTop: 15}}>
                <Text style={styles.bolded}>Users in this group:</Text>
                <ScrollView>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableData.heads} style={styles.head}  textStyle={{textAlign: 'center'}} />   
                    <TableWrapper>
                    <Rows data={tableData.rows}  textStyle={{textAlign: 'center'}}/>
                    </TableWrapper>
                </Table>
                <View style={{marginTop: 22, flex: 1, flexDirection: 'column', width: '80%', alignSelf: 'center'}}>
                    <View style={styles.spacer}>
                    <Button title='Close Group' color='#FC6F5E'/>
                    </View>
                    <View style={styles.spacer}>
                    <Button title='Delete Contacts From Phone' color='red'/>
                    </View>
                    <View style={styles.spacer}>
                    <Button title='Archive' color='green'/>
                    </View>
                </View>
                </ScrollView>
            </View>    
        </View>
    );

};

const styles = StyleSheet.create({
   title: {
    fontSize: 50,
    color: 'blue',
    textAlign: 'center'
   },
   spacer: {
    marginTop: 15,
    marginBottom: 15,
   },
   bolded: {
    fontSize: 19,
    padding: 4,
    marginBottom: 10,
    fontWeight: '900',
   },
   head: { height: 40, backgroundColor: '#f1f8ff'},
   box: {
    borderWidth: 1,
    padding: 4,
    textAlign: 'center',
    fontSize: 10
   },
   threeBlock: {
    flex: 1,
    flexDirection: 'row'
   }
  });

export default GrouPage;
