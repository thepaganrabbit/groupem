/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './store';
import {request, PERMISSIONS} from 'react-native-permissions';
import DATABASE, {SqDatabase} from './db';

// Request permmisssions for use of native APIS
request(PERMISSIONS.ANDROID.READ_CONTACTS).then(result => {
  console.log(result);
});

// Setup Database Sqlite
const setupDatabase = async () => {
  await DATABASE.createDatabase();
};

const MainApp = () => {
  React.useEffect(() => {
    setupDatabase();
  }, []);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
