import React, {Component} from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import {connect} from 'react-redux';

import {styles} from './listItem.style';
import {CardSection} from '../common/index';
import {selectLibrary} from '../../actions/index';

class ListItem extends Component {

    componentDidMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription = () => {
        if (this.props.expanded) {
            return (
                <CardSection>
                    <Text style={{flex: 1, paddingLeft: 5}}>{this.props.library.item.description}</Text>
                </CardSection>
            );
        }
    };

    render() {
        const {titleStyle} = styles;
        const {id, title} = this.props.library.item;


        return (
            <TouchableWithoutFeedback onPress={() => this.props.onLibrarySelect(id)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        expanded: state.selectedLibrary === ownProps.library.item.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLibrarySelect: (libraryId) => dispatch(selectLibrary(libraryId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
