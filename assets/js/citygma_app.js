import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import CitygmaApp from "./Citygma/CitygmaApp";
import '../css/styles.scss';

const shouldShowBuddy = true;

ReactDom.render(
    <BrowserRouter>
        <CitygmaApp withBuddy={shouldShowBuddy} />
    </BrowserRouter>,
    document.getElementById('citygma_container')
);