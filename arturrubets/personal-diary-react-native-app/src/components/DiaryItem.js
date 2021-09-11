import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'
import * as Colors from '../Colors'
import * as Font from '../Font'

import { getDate, truncateText } from '../Utilities'

const DiaryItem = (props) => {
    const { item, methods } = props;
    const {setDiary, goTo} = methods;
    const { month, day } = getDate(new Date(item.date))

    const Container = View;
    const Left = View;
    const Middle = View;
    const Right = View;

    return (
        <TouchableOpacity
            onPress={() => setDiary(item, () => goTo('diary'))}
        >
            <Container style={styles.container}>
                <Left style={styles.left}>
                    <FontAwesome5
                        name='calendar-alt'
                        size={Font.LARGE}
                        color={Colors.SUCCESS}
                    />
                </Left>

                <Middle style={styles.middle}>
                    <Text>{truncateText(item.text, 25)}</Text>
                </Middle>

                <Right style={styles.right}>
                    <Text style={styles.rightText}>
                        {month.substring(0, 3) + '.'}
                        {(day + '').padStart(2, '0')}
                    </Text>
                </Right>
            </Container>
        </TouchableOpacity>
    )


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        borderWidth: 0.25,
        borderRadius: 5,
        paddingVertical: 15,
        marginBottom: 7
    },
    left: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    middle: {
        flex: 0.65,
    },
    right: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightText: {
        fontSize: Font.BASE * 11,
        color: Colors.SUCCESS
    }
})

export default DiaryItem;