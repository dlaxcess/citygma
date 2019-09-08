import React from 'react';
import ReactDom from 'react-dom';
import CitygmaHeader from "./Header/CitygmaHeader";
import '../css/styles.scss';

ReactDom.render(
    <CitygmaHeader/>,
    document.getElementById('citygma_header')
);