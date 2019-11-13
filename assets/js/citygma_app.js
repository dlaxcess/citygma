import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import CitygmaApp from "./Citygma/CitygmaApp";
import '../css/styles.scss';
import logopng from "../images/logo-citygma.png";

ReactDom.render(
    <BrowserRouter>
        <CitygmaApp/>
    </BrowserRouter>,
    document.getElementById('citygma_container')
);