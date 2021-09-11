import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import * as Colors from '../../Colors'
import * as Font from '../../Font'

import Header from '../Header'
import DiaryDetails from './DiaryDetails';
import DiaryForm from './DiaryForm';

const Diary = (props) => {
    const {style, state, methods} = props
    const {diary} = state;
    const {goBack} = methods;
    const {edit} = diary;
    const Container = View;
    const Body = View;

    return (
        <Container style={[styles.container, style]}>
            <View style={styles.header}>
                <Header
                    icon={'arrow-left'}
                    title={'DIARY'}
                    onPressIcon={()=>goBack()}

                />
            </View>
            <Body style={styles.body}>
                {
                    (edit)
                    ? <DiaryForm state={state} methods={methods}/>
                    : <DiaryDetails state={state} methods={methods}/>
                }
            </Body>
        </Container>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.DEFAULT
    },
    header: {
        flex: 0.15,
    },
    body: {
        flex: 0.85,
        flexDirection: 'column',
        padding: 20
    }
})

export default Diary;