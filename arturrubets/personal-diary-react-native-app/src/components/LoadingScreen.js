import React from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from '../Font'
import * as Colors from '../Colors'


const LoadingScreen = () => {
    const Logo = View;
    const Container = View;
   const Body = View;

    return (
        <Container style={styles.container}>
            <Body style={styles.body}>
                <Logo>
                    <Text style={{textAlign:"center"}}>
                        <FontAwesome5
                            name={'get-pocket'}
                            size={Font.BASE * 130}
                            color={Colors.SUCCESS}
                        />
                    </Text>
                    <Text style={styles.textLoading}>
                        Loading screen
                    </Text>
                </Logo>
            </Body>
            
            <View style={styles.bottomPadding}>
            
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        flex:1,
        flexDirection: "column"
    },
    body:{
        flex:0.9,
        justifyContent:"center",
        alignItems:"center"
    },
    bottomPadding:{
        flex:0.1 
    },
    textLoading:{
        fontSize: Font.MEDIUM,
        color:Colors.SUCCESS,
        textAlign:'center'
    }
})

export default LoadingScreen;