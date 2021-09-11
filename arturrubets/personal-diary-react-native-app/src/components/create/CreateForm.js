import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';


import * as Colors from '../../Colors'
import * as Font from '../../Font'
import Button from '../Button'
import FormField from '../FormField'
import DatePicker from '../DatePicker'
import { extractStringDate, toastMessage } from '../../Utilities'


const CreateForm = (props) => {
    const { state, methods } = props;
    const { user } = state
    const { insertDiary, goTo, setDiary } = methods

    const Form = View;
    const TextAreaContainer = View;
    const TextArea = TextInput;
    const Footer = View;
    const [date, setDate] = useState(extractStringDate());
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(user.id)

    const insert = () => {
        const diary = {date, text, userId}

        
        
        const callback = (insertId) => {
            setText('')
            setDate(extractStringDate())

            setDiary({id: insertId, date, text, userId}, () => {
                toastMessage(`Successfully saved diary with id: ${insertId}`)
                goTo('diary')
            })
        }

        insertDiary(diary, callback)
    }

    return (
        <Form style={styles.container}>
            <FormField
                title={'Date'}
                inputComponent={(
                    <DatePicker
                        style={styles.datePicker}
                        value={date}
                        onChangeDate={(value) => setDate(value)}
                    />
                )}
            />

            <TextAreaContainer style={styles.textAreaContainer}>
                <Text style={styles.remarks}>Dear Diary,</Text>
                <TextArea
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={8}
                    placeholder={'Start writing a diary.'}
                    value={text}
                    onChangeText={(value) => setText(value)}
                />
                <Text style={styles.remarks}>
                    Love, {'\n'}{user.firstName}
                </Text>
            </TextAreaContainer>
            <Footer style={styles.footer}>
                <Button title={'Save'} icon={'save'}
                    onPress={() => insert()}
                    style={{
                        backgroundColor: Colors.SUCCESS,
                        color: Colors.FOREGROUND,
                        borderRadius: 5,
                        fontWeight: 'bold'
                    }} />

                <Button title={'Clear'} icon={'minus'}
                    onPress={() => setText('')}
                    style={{
                        backgroundColor: Colors.DANGER,
                        color: Colors.FOREGROUND,
                        borderRadius: 5,
                        fontWeight: 'bold',
                        marginRight: 10
                    }} />
            </Footer>
        </Form>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DEFAULT,
        flexDirection: 'column',
        padding: 15,
        borderRadius: 5,
        borderWidth: 0.25
    },
    datePicker: {
        borderWidth: 0.25,
        borderRadius: 5,
        fontSize: Font.SMALL,
        padding: 10
    },
    remarks: {
        marginLeft: 10,
        fontSize: Font.SMALL,
        color: Colors.TEXT
    },
    textArea: {
        borderWidth: 0.25,
        padding: 10,
        fontSize: Font.SMALL,
        textAlignVertical: 'top',
        borderRadius: 5,
        marginVertical: 10,
        height:240
    },
    footer:{
        paddingVertical:10,
        flexDirection:'row-reverse'
    }
})


export default CreateForm