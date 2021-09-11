import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableWithoutFeedback
} from 'react-native';


import * as Colors from '../Colors'
import * as Font from '../Font'


const RadioButton = (props) => {
    let { title, style, ringProperties, selected, onPress } = props;
    title = title || 'Radio Button'
    style = style || {};
    ringProperties = ringProperties || {}

    let { fontSize, fontWeight, color, padding } = style
    fontSize = fontSize || Font.SMALL
    fontWeight = fontWeight || 'normal'
    color = color || Colors.TEXT;
    padding = padding || 5;


    let { size, shade, borderWidth } = ringProperties
    size = size || 24
    shade = shade || Colors.PRIMARY;
    borderWidth = borderWidth || 2


    const Container = View;
    const Ring = View;
    const Shade = View;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Container style={[styles.container, {padding}]}>
                <Ring style={[styles.ring, { height: size, width: size, borderRadius: size / 2, borderWidth, borderColor: shade, marginRight:padding }]}>
                    {
                        (selected)
                            ? <Shade style={{
                                height: size / 2, 
                                width: size / 2, 
                                borderRadius: (size / 2) / 2,
                                backgroundColor: shade
                            }}>

                            </Shade>
                            : <View></View>
                    }
                </Ring>
                <Text style={{fontSize, fontWeight, }}>{title}</Text>
            </Container>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ring: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default RadioButton