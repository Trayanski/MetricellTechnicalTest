import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './actions/store';
import Employees from './components/Employees';
import {Container} from '@material-ui/core'
import { ToastProvider } from 'react-toast-notifications'

export default class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <ToastProvider autoDismiss={true}>
          <Container maxWidth="lg">
            <Employees />
          </Container>
        </ToastProvider>
      </Provider>
    );
  }
}
