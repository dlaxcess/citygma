import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router";
import CitygmaHeader from "../Header/CitygmaHeader";
import CitygmaAppContainer from "./CitygmaAppContainer";
import CitygmaLogin from "./Pages/CitygmaLogin";
import CitygmaAbout from "./Pages/CitygmaAbout";
import CitygmaMentions from "./Pages/CitygmaMentions";

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
        console.log(window.location.pathname);

        return (
            <Fragment>
                <CitygmaHeader/>
                <Switch>
                    <Route exact path="/"><CitygmaAppContainer/></Route>
                    <Route path="/login" component={CitygmaLogin} />
                    <Route path="/about" component={CitygmaAbout} />
                    <Route path="/Mentions" component={CitygmaMentions} />
                </Switch>
            </Fragment>
        )
    }
}