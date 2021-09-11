import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';


import * as Colors from '../../Colors'
import * as Font from '../../Font'

import Button from '../Button'
import FormField from '../FormField'
import RadioButton from '../RadioButton'
import DatePicker from '../DatePicker'
import { toastMessage } from '../../Utilities'


const AccountForm = (props) => {
    const { state, methods, setEdit } = props;
    const { user } = state;
    const { updateUser } = methods;
    const [id, setId] = useState(user.id);
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [gender, setGender] = useState(user.gender)
    const [birthDate, setBirthDate] = useState(user.birthDate)
    const [email, setEmail] = useState(user.email)
    const Form = View;
    const Footer = View;

    const update = () => {
        const user = {
            id,
            firstName,
            lastName,
            gender,
            birthDate,
            email
        }
        console.log(user)
        updateUser(
            
                user
            ,
            (rowsAffected) => {
                toastMessage(`Successfully updated ${rowsAffected} user`)
                setEdit(false)
            })
    }

    return (
        <Form style={styles.container}>
            <Text style={styles.heading}>Please enter your details</Text>
            <FormField
                title={'First Name'}
                style={{ fontWeight: 'bold' }}
                inputComponent={(
                    <TextInput
                        value={firstName}
                        style={styles.textBox}
                        onChangeText={(value) => { setFirstName(value) }}
                    />
                )} />

            <FormField
                title={'Last Name'}
                style={{ fontWeight: 'bold' }}
                inputComponent={(
                    <TextInput
                        value={lastName}
                        style={styles.textBox}
                        onChangeText={(value) => { setLastName(value) }}
                    />
                )} />

            <FormField
                title={'Gender'}
                style={{ fontWeight: 'bold' }}
                inputComponent={(
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton selected={gender == 'Male'} title={'Male'}
                            onPress={() => setGender('Male',)}
                            ringProperties={{ shade: Colors.SUCCESS }}
                        />
                        <RadioButton selected={gender == 'Female'} title={'Female'}
                            onPress={() => setGender('Female')}
                            ringProperties={{ shade: Colors.SUCCESS }}
                        />
                    </View>
                )} />

            <FormField
                title={'BirthDate'}
                style={{ fontWeight: 'bold' }}
                inputComponent={(
                    <DatePicker
                        style={styles.textBox}
                        value={birthDate}
                        onChangeDate={(value) => setBirthDate(value)}
                    />
                )} />

            <FormField
                title={'Email'}
                style={{ fontWeight: 'bold' }}
                inputComponent={(
                    <TextInput
                        style={styles.textBox}
                        value={email}
                        onChangeText={(value) => { setEmail(value) }}
                    />
                )} />

            <Footer style={styles.footer}>
                <Button title={'Update'} icon={'save'}
                    onPress={() => update()}
                    style={{
                        backgroundColor: Colors.SUCCESS,
                        color: Colors.FOREGROUND,
                        borderRadius: 5,
                        fontWeight: 'bold'
                    }} />

                <Button title={'Cancel'} icon={'minus'}
                    onPress={() => setEdit(false)}
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
        borderWidth: 0.25,
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        padding: 15,
        borderRadius: 5
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: Font.LARGE,
        marginBottom: 15
    },
    textBox: {
        borderWidth: 0.25,
        borderRadius: 5,
        fontSize: Font.SMALL,
        padding: 10
    },
    footer: {
        flexDirection: 'row-reverse',
        paddingVertical: 10
    }
})


export default AccountForm