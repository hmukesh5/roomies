import React from 'react';
import {Modal, Dimensions, TouchableOpacity,
StyleSheet, View, Text, FlatList} from 'react-native'

const deviceHeight = Dimensions.get("window").height
export class EventPopup extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({show: true})
    }
        
    close = () => {
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={styles.view2}/>
        if (!onTouch) return view

        return (
            <TouchableOpacity onPress={onTouch} style={styles.view2}>
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
                    ItemSeparatorComponent={this.renderSeparator}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.renderItem}>
                <Text style={styles.renderItemText}>{item.name}</Text>
            </View>
        )
    }

    renderSeparator = () => (
        <View 
            style={styles.renderSeparator}
        />
    )

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
        //backgroundColor: '#000000AA',
        justifyContent: 'flex-end',
    },
    view2: {
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
    },
    renderTitleContainer: {
        alignItems: 'center'
    },
    list: {
        marginBottom: 20
    },
    renderSeparator: {
        opacity: .1,
        backgroundColor: '#182E44',
        height: 1
    },
    renderItem: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },
    renderItemText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#182E44'
    }
})

export default EventPopup;