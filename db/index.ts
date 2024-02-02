import { ToastAndroid } from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import { ExtGroupObject, ISqDatabase, IntGroupObject } from "../types";
import SQlite, { ResultSet } from 'react-native-sqlite-storage';

class SqDatabase implements ISqDatabase {
    private db: SQlite.SQLiteDatabase | undefined;
    constructor() {
        // SQlite.deleteDatabase({name: 'MainDb'});
        this.init();
    }
    async init(): Promise<SQlite.SQLiteDatabase | undefined> {
        try {
            await SQlite.enablePromise(true);
            this.db = await SQlite.openDatabase({ name: 'MainDb', location: 'default' });
            return this.db;
        } catch (error) {
            throw error;
        }
    }
    async createDatabase(): Promise<void> {
        try {
            if (!this.db) {
                throw new Error('Db has not been initialized');
            }
            const query = `CREATE TABLE IF NOT EXISTS Groups (ID INTEGER PRIMARY KEY AUTOINCREMENT, group_title TEXT NOT NULL UNIQUE, contacts TEXT);`;
            const table = await this.db?.executeSql(query);
            if (!table) {
                throw new Error('Failed to initialize storage');
            }
        } catch (error) {
            throw error;
        }
    }
    async createNewGroup({ group_title, contacts }: IntGroupObject): Promise<ExtGroupObject | undefined> {
        try {
            if (!this.db) {
                throw new Error('Db has not been initialized');
            }
            const createGroup: [SQlite.ResultSet] = await this.db?.executeSql(`INSERT INTO Groups (group_title, contacts) VALUES ('${group_title}', '${contacts}')`);
            if (!createGroup) throw new Error('Failed to create group.');
            const group: [SQlite.ResultSet] = await this.db?.executeSql(`SELECT * FROM Groups WHERE ID = ${createGroup[0].insertId}`);
            if (!group) throw new Error('Failed to find created group.');
            const returnObject = { id: group[0].rows.item(0).ID, group_title: group[0].rows.item(0).group_title, contacts: JSON.parse(group[0].rows.item(0).contacts) };
            return returnObject;
        } catch (error) {
            console.log('creation error', error);
            throw error;
        }
    }
    async getAllGroups(): Promise<ExtGroupObject[] | undefined> {
        try {
            if (!this.db) {
                throw new Error('Db has not been initialized');
            }
            const groups: [SQlite.ResultSet] = await this.db?.executeSql(`SELECT * FROM Groups`);
            if (groups[0].rows.length <= 0) return;
            const retrievedGroups = [];
            for (let i = 0; i <= groups[0].rows.length; i++) {
                const rawItem = groups[0].rows.item(i);
               if(rawItem && rawItem.ID !== undefined) {
                const fixedItem = {
                    id: rawItem.ID,
                    group_title: rawItem.group_title,
                    contacts: JSON.parse(rawItem.contacts)
                };
                retrievedGroups.push(fixedItem);
               }
            }
            return retrievedGroups;

        } catch (error) {
            throw error;
        }
    }
}

const DATABASE = new SqDatabase();

export default DATABASE;