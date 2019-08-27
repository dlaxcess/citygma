import React, {Component} from "react";

export default class CitygmaApp extends Component {
    render() {
        let buddy ='';
        if (this.props.withBuddy) {
            buddy = <b>fears cause hesitations, hesitations makes your worth fears to be true</b>
        }

        return <h2>yo! {buddy}</h2>;
    }
}