import React from 'react';
import ReactDom from 'react-dom';
//import { BrowserRouter } from "react-router-dom";
import { Router } from "react-router";
import { history } from "./auth/helpers/history";
import CitygmaApp from "./Citygma/CitygmaApp";
import '../css/styles.scss';
import logopng from "../images/logo-citygma.png";

ReactDom.render(
    <Router history={history}>
        <CitygmaApp history={history}/>
    </Router>,
    document.getElementById('citygma_container')
);