/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './store';
import {request, PERMISSIONS } from 'react-native-permissions';

request(PERMISSIONS.ANDROID.READ_CONTACTS).then((result) => {
    console.log(result);
})

const MainApp = () => {
    return <Provider store={store}><App /></Provider>
}

AppRegistry.registerComponent(appName, () => MainApp);
