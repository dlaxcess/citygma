import React, {Component} from "react";
import CitygmaAppContainer from "./CitygmaAppContainer";

export default class CitygmaApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            htmlElementClicked : null,
        };
    }

    render() {
        const { htmlElementClicked } = this.state;
        const { withBuddy } = this.props;

        return (
            <CitygmaAppContainer
                withBuddy={withBuddy}
            />
        )
    }
}