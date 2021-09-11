import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import  {Foundation} from '@expo/vector-icons'
import * as Colors from '../../Colors'
import * as Font from '../../Font'

const ProfilePicture = (props)=> {
    const {gender} = props;
    const Container = View;

    return(
        <Container style={styles.container}>
            <Foundation 
                name={(gender == 'Male') ? 'torso' : 'torso-female'} 
                size={Font.BASE * 100}
                color={Colors.WHITE}
            />
        </Container>
    )
}



const styles = StyleSheet.create({
    container:{
        borderWidth:0.25,
        backgroundColor: Colors.DEFAULT,
        paddingHorizontal: 35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 5
    }
})

export default ProfilePicture;