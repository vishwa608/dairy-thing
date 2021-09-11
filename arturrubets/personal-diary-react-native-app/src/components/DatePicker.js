import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker'

import * as Colors from '../Colors'
import * as Font from '../Font'


class DatePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open() {
        this.setState({ show: true })
    }

    close() {
        this.setState({ show: false })
    }

    extractStringDate(date){
        date = new Date(date)
        const [year, month, day] = [
            date.getFullYear(),
            ((date.getMonth() + 1) + '').padStart(2, '0'),
            (date.getDate() + '').padStart(2, '0')
        ]
        return [year, month, day].join('-')
    }

    render() {
        let { style, value, onChangeDate } = this.props;
        style = style || {}
        let { fontSize, fontWeight, color } = style || {}
        fontSize = fontSize || Font.SMALL
        fontWeight = fontWeight || 'normal'
        color = color || Colors.TEXT
        return (
            <View>
                <TouchableOpacity onPress={this.open}>
                    <View style={style}>
                        <Text style={{ fontSize, fontWeight, color }}>
                            {value}
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.state.show && (
                    <DateTimePicker
                        testID="datePicker"
                        value={new Date(value)}
                        mode={'date'}
                        onChange={(event, selectedDate) => {
                            this.close()
                            if(selectedDate == undefined) return

                            const date = this.extractStringDate(selectedDate)
                            onChangeDate(date)
                        }}
                    />
                )}
            </View>
        )
    }
}


export default DatePicker;