import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import * as Colors from '../../Colors'
import * as Font from '../../Font'
import {getDate} from '../../Utilities'

const Calendar = (props) => {
    const {month, day} = getDate();
    
    const Container = View;
    const Body = View;
    const Header = View;

    return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Text style={styles.headerText}>{month.toUpperCase()}</Text>
            </Header>
            <Body style={styles.body}>
                <Text style={styles.bodyText}>{day}</Text>
            </Body>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        flex:1,
        backgroundColor:Colors.WHITE,
        borderRadius:5,
        borderWidth:0.25
    },
    header: {
        flex:0.3,
        backgroundColor:Colors.SUCCESS,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center',
        borderTopRightRadius:5,
        borderTopLeftRadius:5
    },
    body: {
        flex:0.7
    },
    headerText:{
        fontSize:Font.BASE*26,
        color:Colors.FOREGROUND,
        fontWeight:'bold'
    },
    bodyText:{
        fontSize:Font.BASE * 70,
        fontWeight:'bold',
        color:Colors.TEXT,
        textAlign:'center'
    }
})

export default Calendar;