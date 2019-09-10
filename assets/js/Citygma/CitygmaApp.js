import React, {Component, Fragment} from "react";
import CitygmaHeader from "../Header/CitygmaHeader";
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
            <Fragment>
                <CitygmaHeader/>
                <CitygmaAppContainer
                    withBuddy={withBuddy}
                />
            </Fragment>
        )
    }
}