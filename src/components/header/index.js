import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        const { title } = this.props;
        return (
            <div>
                {title}
            </div>
        );
    }
}
