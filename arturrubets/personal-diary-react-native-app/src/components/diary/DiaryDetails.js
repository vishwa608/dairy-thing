import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { WebView } from 'react-native-webview';

import * as Colors from '../../Colors'
import * as Font from '../../Font'
import { toastMessage } from '../../Utilities';

import Button from '../Button'

const DiaryDetails = (props) => {
    const { state, methods } = props;
    const {editDiary, deleteDiary, goBack} = methods
    const { user, diary } = state;
    const { text, date } = diary;
    const Container = View;

    const _delete = () => {
        const callback = (rowsAffected) =>{
            toastMessage(`Successfully deleted ${rowsAffected} diary`)
            goBack()
        }

        deleteDiary(diary.id, callback)
    }

    return (
        <Container style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title={'Delete'}
                    onPress={()=>_delete(true)}
                    icon={'trash'}
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.DANGER,
                        marginRight: 5
                    }}
                />

                <Button
                    title={'Edit'}
                    onPress={()=>editDiary(true)}
                    icon={'pen'}
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.SUCCESS,
                        marginRight: 5
                    }}
                />
            </View>

            <View style={styles.letterContainer}>
                <Text style={styles.label}>Date: {date}</Text>
                <Text>Dear Diary,</Text>
                <View style={{ height: 240, marginBottom: 10 }}>
                    <WebView
                        source={{
                            html: `
                            <html>
                                <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1">
                                    <style>
                                        p{
                                            font-size: 19px;
                                            text-indent: 25px;
                                            text-align: justify;
                                        }
                                    </style>
                                </head>
                                <body>
                                    <p>${text}</p>
                                </body>
                            </html>
                        `
                        }}
                    />
                </View>
                <Text>Love, {'\n' + user.firstName}</Text>
            </View>
        </Container>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        fontSize: Font.SMALL,
        color: Colors.FOREGROUND,
        borderRadius: 5,
        fontWeight:'bold'
    },
    buttonContainer: {
        flexDirection: 'row-reverse'
    },
    label:{
        fontSize: Font.SMALL,
        marginBottom:10
    },
    letterContainer:{
        backgroundColor:Colors.WHITE,
        padding:15,
        marginTop:20,
        borderRadius:5,
        borderWidth:0.25
    }
})

export default DiaryDetails;