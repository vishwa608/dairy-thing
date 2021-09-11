import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';

import * as Colors from '../../Colors'
import * as Font from '../../Font'
import { toastMessage } from '../../Utilities';

import Button from '../Button'

const DiaryForm = (props) => {
    const { state, methods } = props
    const { editDiary, updateDiary, setDiary } = methods
    const { diary, user } = state
    const { date } = diary;
    const [text, setText] = useState(diary.text)
    const Container = View;
    const Body = View;
    const Footer = View;


    const update = () => {
        diary.text = text

        const callback = (rowsAffected) =>{
            diary.edit = false;
            setDiary(diary, () => {
                toastMessage(`Successfully updated ${rowsAffected} diary`)
            })
        }

        updateDiary(diary, callback)
    }

    return (
        <Container style={[styles.container]}>
            <Body style={styles.body}>
                <Text style={styles.label}>Date: {date}</Text>
                <Text style={styles.label}>Dear Diary,</Text>
                <TextInput
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={8}
                    placeholder={'Start editing your diary.'}
                    value={text}
                    onChangeText={(value) => setText(value)}
                />
                <Text>Love, {'\n' + user.firstName}</Text>
            </Body>

            <Footer style={styles.footer}>
                <Button
                    title={'Update'}
                    onPress={() => update()}
                    icon={'save'}
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.DANGER,
                        marginRight: 5
                    }}
                />

                <Button
                    title={'Cancel'}
                    onPress={() => editDiary(false)}
                    icon={'minus'}
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.DANGER,
                        marginRight: 5
                    }}
                />
            </Footer>
        </Container>
    )

}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.25,
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        padding: 15
    },
    body: {
        flexDirection: 'column'
    },
    label: {
        fontSize: Font.SMALL,
        marginVertical: 10
    },
    textArea: {
        borderWidth: 0.25,
        padding: 10,
        fontSize: Font.SMALL,
        textAlignVertical: 'top',
        height: 240
    },
    button: {
        fontSize: Font.SMALL,
        color: Colors.FOREGROUND,
        borderRadius: 5,
        fontWeight:'bold'
    },
    footer: {
        flexDirection: 'row-reverse',
    }
})

export default DiaryForm;