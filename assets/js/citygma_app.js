import React from 'react';
import ReactDom from 'react-dom';
import CitygmaApp from "./Citygma/CitygmaApp";
import '../css/styles.scss';

const shouldShowBuddy = true;

ReactDom.render(
    <div>
        <CitygmaApp withBuddy={shouldShowBuddy} />
        <CitygmaApp withBuddy={false} />
    </div>,
    document.getElementById('enygma')
);
/*'use strict';

import $ from 'jquery';
import CitygmaApp from './components/CitygmaApp';
import '../css/styles.scss';

$(document).ready(function () {
    var $enigmaDiv = $('body');

    var citygmaApp = new CitygmaApp($enigmaDiv);
});*/