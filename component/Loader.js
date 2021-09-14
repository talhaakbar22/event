import React from 'react';
import {ActivityIndicator} from 'react-native';
import Center from './Center';


const Routes = (props) => {
  if (props.loading) {
    return (
      <Center>
        <ActivityIndicator size="large"/>
      </Center>
    );
  }
};

export default Routes;
