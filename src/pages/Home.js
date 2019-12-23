import React, { Component } from 'react';
import '../assets/home.less'

export default class Count extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                text: 'This is Home Page!!!'
            })
        }, 2000)
    }

    render() {
        let { text } = this.state
        return (
            <div className="home">
                <h2>homepage</h2>
                <h1 className="h-txt">{text}</h1>
            </div>
        )
    }
}