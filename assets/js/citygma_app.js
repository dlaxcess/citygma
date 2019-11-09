import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import CitygmaApp from "./Citygma/CitygmaApp";
import '../css/styles.scss';
import logopng from "../images/logo-citygma.png";

const shouldShowBuddy = true;

ReactDom.render(
    <BrowserRouter>
        <CitygmaApp withBuddy={shouldShowBuddy} />
    </BrowserRouter>,
    document.getElementById('citygma_container')
);