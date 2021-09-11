import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Header from '../Header'
import Diaries from '../Diaries'
import Calendar from './Calendar'
import * as Colors from '../../Colors'


const Home = (props) => {
    const { style, methods, state } = props;
    const Container = View;
    const Body = View;

    return (
        <Container style={[styles.container, style]}>
            <StatusBar />
            <View style={styles.header}>
                <Header icon={'get-pocket'} title={'POCKET DIARY'} />
            </View>
            <Body style={styles.body}>
                <View style={styles.calendarContainer}>
                    <Calendar />
                </View>

                <View style={styles.recentsContainer}>
                    <Diaries
                        state={state}
                        methods={methods}
                    />
                </View>
            </Body>
        </Container>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT,
        flexDirection: 'column'
    },
    header: {
        flex: 0.15,
    },
    body: {
        flex: 0.85,
        padding:20
    },
    calendarContainer:{
        flex:0.45
    },
    recentsContainer:{
        flex:0.55
    }
})

export default Home;