import React from 'react';
import {Modal, Dimensions, TouchableOpacity,
StyleSheet, View, Text, FlatList} from 'react-native'

import CreateEventOption from '../config/CreateEventOption';
import * as Font from 'expo-font';

const deviceHeight = Dimensions.get("window").height
export class EventPopup extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            show: false,
            fontsLoaded: false
        }
    }

    async loadFonts() {
        await Font.loadAsync({
            'SignikaNegative-Medium': require('../assets/fonts/SignikaNegative-Medium.ttf'),
        });
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this.loadFonts();
    }

    show = () => {
        this.setState({show: true})
    }
        
    close = () => {
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={styles.renderOutsideTouch}/>
        if (!onTouch) return view

        return (
            <TouchableOpacity onPress={onTouch} style={styles.renderOutsideTouch}>
                {view}
            </TouchableOpacity>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return (
            <View style={styles.renderTitleContainer}>
                <Text style={styles.renderTitle}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return (
            <View>
                <FlatList 
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.contentContainerStyle}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.renderItem}>
                <CreateEventOption text={item.text} val={item.type} setter={item.setter}/>
            </View>
        )
    }

    render () {
        let {show} = this.state
        const {onTouchOutside, title} = this.props

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={styles.shadowEffect}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={styles.popup}>
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    shadowEffect: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    renderOutsideTouch: {
        flex: 1,
        width: '100%'
    },
    popup: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 0.4
    },
    renderTitle: {
        color: '#182E44',
        fontSize: 25,
        fontWeight: '500',
        marginTop: 15,
        marginBottom: 10,
        fontFamily: "SignikaNegative-Medium"
    },
    renderTitleContainer: {
        alignItems: 'center'
    },
    list: {
        marginBottom: 20
    },
    renderItem: {
        height: 70,
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
        padding: 10,
    },
})

export default EventPopup;