import React, {Component} from "react";
import CitygmaHeaderContainer from "./CitygmaHeaderContainer";
import { authenticationService } from '../auth/services/authenticationService';
import {history} from "../auth/helpers/history";

export default class CitygmaHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            burgerClicked : false,
        };

        this.burgerIconClick = this.burgerIconClick.bind(this);
    }

    burgerIconClick(burgerClicked) {
        burgerClicked === false ? this.setState({ burgerClicked : true }) : this.setState({ burgerClicked : false });
    }

    render() {
        const { burgerClicked } = this.state;
        const { currentUser, onLogoutClick } = this.props;

        return (
            <CitygmaHeaderContainer
                burgerClicked={burgerClicked}
                onBurgerClick={this.burgerIconClick}
                currentUser={currentUser}
                onLogoutClick={onLogoutClick}
            />
        );
    }
}