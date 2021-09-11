import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated
} from 'react-native';
import FooterTab from './FooterTab'
import Screens from './Screens'
import LoadingScreen from './LoadingScreen'

const AppScreen = (props) => {
    const { state, methods } = props
    const { goTo } = methods
    const fadeAnimation = useRef(new Animated.Value(1)).current;

    const fadeOut = () => {
        return new Promise((resolve) => {
            Animated.timing(fadeAnimation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => resolve())
        })
    }

    const fadeIn = () => {
        return new Promise((resolve) => {
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start(() => resolve())
        })
    }

    const Container = View;
    const Footer = View;
    return (
        <Container style={styles.container}>
            <LoadingScreen />

            <Animated.View style={[styles.screen, { opacity: fadeAnimation }]}>
                <Screens
                    state={state}
                    methods={methods}
                />
            </Animated.View>
            <Footer style={styles.footer}>
                <FooterTab
                    state={state}
                    goTo={(screen) => {
                        fadeOut().then(() => {
                            goTo(screen, () => fadeIn())
                        })
                    }} />
            </Footer>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#ddd"
    },
    screen: {
        flex: 0.9,
        backgroundColor: "skyblue"
    },
    footer: {
        flex: 0.1,
        backgroundColor: "green"
    }
})

export default AppScreen;