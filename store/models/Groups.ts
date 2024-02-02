import { createModel } from "@rematch/core";

import { RootModel } from ".";
import { ToastAndroid } from "react-native";
import { GroupState } from "../types";
import { ExtGroupObject, IntGroupObject } from "../../types";
import DATABASE from "../../db";

export const MyGroups = createModel<RootModel>()({
    state: {
        groups: [],
        groupsAreLoading: false,
    } as unknown as GroupState,
    reducers: {
        setAllGroups: (state: GroupState, payload: ExtGroupObject[]) => {
            state.groups = payload;
            return { ...state };
        },
        addGroup: (state: GroupState, payload: ExtGroupObject) => {
            state.groups = [...state.groups, payload];
            return { ...state }
        },
        setGroupState: (state: GroupState, payload: boolean) => {
            console.log('loading state', payload);
            state.groupsAreLoading = payload;
            return { ...state };
        }
    },
    effects: (dispatch) => ({
        getAllgroups: async () => {
            try {
                dispatch.groups.setGroupState(true);
                const groups = await DATABASE.getAllGroups();
                if (!groups) {
                    dispatch.groups.setGroupState(false);
                    return []
                };
                dispatch.groups.setAllGroups(groups as ExtGroupObject[]);
                dispatch.groups.setGroupState(false);
                if (groups.length <= 0) {
                    return [];
                }
            } catch (error) {
                console.log(error);
                dispatch.groups.setGroupState(false);
                ToastAndroid.showWithGravity(
                    (error as Error).message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        },
        saveGroup: async (payload: IntGroupObject) => {
            try {
                dispatch.groups.setGroupState(true);
                const group = await DATABASE.createNewGroup(payload)
                if (!group) throw new Error('Groups failed to be retrieved');
                console.log('goop ', group);
                dispatch.groups.addGroup(group);
                dispatch.groups.setGroupState(false);
            } catch (error) {
                dispatch.groups.setGroupState(false);
                ToastAndroid.showWithGravity(
                    (error as Error).message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        },
    }),
});