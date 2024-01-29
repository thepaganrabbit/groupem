import React from 'react';
import { useColorScheme, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TopBar from '../StatusBar/StatusBar';
import { HasChildren } from '../../types';

const Base = ({ children }: HasChildren): React.JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
        <SafeAreaView style={backgroundStyle}>
            <TopBar />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );

};

export default Base;
