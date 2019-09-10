import React from 'react';
import ReactDom from 'react-dom';
import CitygmaApp from "./Citygma/CitygmaApp";
import '../css/styles.scss';

const shouldShowBuddy = true;

ReactDom.render(
    <CitygmaApp withBuddy={shouldShowBuddy} />,
    document.getElementById('citygma_container')
);