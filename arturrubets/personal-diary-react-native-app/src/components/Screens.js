import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import Account from './account/Account'
import Create from './create/Create'
import Diary from './diary/Diary'
import Home from './home/Home'
import Browse from './browse/Browse'


const Container = View;

const show = { flex: 1 }
const hide = { flex: 0, height: 0, opacity: 0 }


const Screens = (props) => {
    const { state, methods } = props;
    const { currentScreen, user, diaries } = state

    return (
        <Container style={styles.container}>
            <Home style={(currentScreen == 'home') ? show : hide}
                state={state}
                methods={methods}
            />

            <Create
                style={[
                    (currentScreen == 'create') ? show : hide
                ]}
                state={state}
                methods={methods}
            />

            <Diary
                style={[
                    (currentScreen == 'diary') ? show : hide
                ]}
                state={state}
                methods={methods}
            />

            <Browse style={[
                (currentScreen == 'browse') ? show : hide]}
                state={state}
                methods={methods}    
            />

            <Account
                style={[
                    (currentScreen == 'account') ? show : hide
                ]}
                state={state}
                methods={methods}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})

export default Screens;