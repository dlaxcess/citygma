import React, {Component, Fragment} from "react";
import {PositionTable} from "./geoloc/PositionTable";


export default class CitygmaGameInterface extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };


    }

    componentDidMount() {

    }


    render() {

        return (
            <Fragment>
                <div id="GameInterfaceGenContainer">
                    <PositionTable/>
                </div>
            </Fragment>
        );
    }
}