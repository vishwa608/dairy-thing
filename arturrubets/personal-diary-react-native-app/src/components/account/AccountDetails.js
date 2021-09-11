import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import * as Colors from '../../Colors'
import * as Font from '../../Font'
import DetailField from './DetailField'
import { truncateText } from '../../Utilities'
import ProfilePicture from './ProfilePicture'
import Button from '../Button'

const AccountDetails = (props) => {
    const { state, setEdit } = props;
    const { user } = state;
    const { firstName, lastName, gender, birthDate, email } = user;
    const data = [
        { label: 'First name:', value: truncateText(firstName || 'Udefined', 16), id:1 },
        { label: 'Last name:', value: truncateText(lastName || 'Udefined', 16), id:2  },
        { label: 'Gender:', value: gender , id:3 },
        { label: 'BirthDate:', value: birthDate , id:4 },
        { label: 'Email:', value: truncateText(email || 'Udefined', 16), id:5  }
    ]
    const Container = View;

    return (
        <Container style={styles.container}>
            <View style={styles.editButton}>
                <Button title={'Edit'} icon={'pen'}
                    onPress={() => setEdit(true)}
                    style={{
                        backgroundColor: Colors.SUCCESS,
                        color: Colors.FOREGROUND,
                        borderRadius: 5,
                        fontWeight: 'bold'
                    }} />
            </View>



            <View style={styles.profile}>
                <ProfilePicture gender={gender} />
            </View>


            {
                data.map(item => (
                    <DetailField
                        label={item.label}
                        value={item.value}
                        key={item.id}
                    />
                ))
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 0.25,
        backgroundColor: Colors.WHITE,
        padding: 15,
        borderRadius: 5,
    },
    profile: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    editButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        zIndex: 2,
        
    }
})

export default AccountDetails;