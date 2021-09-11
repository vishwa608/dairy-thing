import React from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'

import * as Colors from '../Colors'
import * as Font from '../Font'




const Button = (props) => {

    let { icon, title, style, onPress } = props;
    let { padding, fontSize, color, fontWeight, backgroundColor } = style || {};

    padding = padding || 10;
    fontSize = fontSize || Font.SMALL;
    fontWeight = fontWeight || 'normal'
    color = color || Colors.TEXT;
    backgroundColor = backgroundColor || Colors.DEFAULT;


    const setContent = (icon, title) => {
        if (icon && title) {
            return (
                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:padding}}>
                        <FontAwesome5 name={icon} size={fontSize} color={color}/>
                    </View>
                    <Text style={{fontSize, color, fontWeight}}>{title}</Text>
                </View>
            )
        }
    
        if (icon) {
            return (
                <FontAwesome5 name={icon} size={fontSize} color={color}/>
            )
        }
    
        if (title) {
            return (
                <Text style={{fontSize, color, fontWeight}}>{title}</Text>
    
            )
        }
    }

    return (

        <TouchableOpacity onPress={onPress}>
            <View style={[{justifyContent:'center', alignItems:"center",  backgroundColor, padding}, style]}>
                {setContent(icon,title)}
            </View>
        </TouchableOpacity>

    )
}

export default Button