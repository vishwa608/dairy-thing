import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';

import * as Colors from '../Colors'
import * as Font from '../Font'
import DiaryItem from './DiaryItem'

const Diaries = (props) => {
    const { state, methods} = props;
    const { diaries } = state

    const Container = View;
    const Body = View;
    const Header = View;

    return (
        <Container style={[styles.container]}>
            <Header style={[styles.header]}>
                <Text style={styles.headerText}>Recent diaries</Text>
            </Header>
            <Body style={[styles.body]}>
                <FlatList
                    data={diaries}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <DiaryItem 
                                item={item}
                                methods={methods}
                            />
                        )
                    }}
                />
            </Body>
        </Container>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: 0.2,
        justifyContent: 'center',
        borderBottomWidth: 0.25
    },
    body: {
        flex: 0.8,
    },
    headerText: {
        fontSize: Font.LARGE,
        color: Colors.TEXT
    },
    bodyText: {

    }
})

export default Diaries;