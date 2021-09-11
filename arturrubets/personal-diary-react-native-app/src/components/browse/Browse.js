import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import Button from '../Button'
import * as Colors from '../../Colors'
import * as Font from '../../Font'

const Browse = (props) => {
    const { style, methods, state } = props;
    const Container = View;
    const DatePickerContainer = View;
    const Results = View;
    const Header = View;
    return (
        <Container style={[styles.container, style]}>
            <StatusBar />
            <Header style={styles.header}>
                <View style={styles.searchBox}>
                    <TextInput
                        style={styles.textBox}
                        placeholder={'Search...'}
                    />

                    <Button
                        icon={'search'}
                        style={styles.buttonSearch}

                    />
                </View>
            </Header>
            <DatePickerContainer style={styles.datePickerContainer}>
                <View style={styles.datePickerFrom}>


                </View>

                <View style={styles.datePickerTo}>

                </View>


            </DatePickerContainer>

            <Results style={styles.results}>

            </Results>
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
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.SUCCESS,
        flexDirection: "row",
        alignItems: 'center'
    },
    buttonSearch: {
        height: 50,
        paddingHorizontal: 20
    },
    textBox: {
        backgroundColor: Colors.WHITE,
        height: 50,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flex: 1,
        paddingLeft: 10,
        fontSize: 17
    },
    searchBox: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    results: {
        flex: 0.45,
        padding: 20,
    },
    dateBox: {
        borderWidth: 0.25,
        borderRadius: 5,
        fontSize: Font.SMALL,
        padding: 10,

    },

    datePickerContainer: {
        flex: 0.4,
        padding: 20,
        margin: 20,
        flexDirection: "column",

    },

    datePickerFrom: {
        backgroundColor: "green",

    },
    datePickerTo: {
        backgroundColor: "yellow",
    },

    textDatePicker: {
        fontSize: 20,
        backgroundColor: "red",
        position: "absolute",
        left: "50%",

    }
})
export default Browse;