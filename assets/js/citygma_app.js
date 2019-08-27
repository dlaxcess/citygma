import React from 'react';
import ReactDom from 'react-dom';
import '../css/styles.scss';

const el = React.createElement('h2', null, 'yo');

ReactDom.render(el, document.getElementById('enygma'));
/*'use strict';

import $ from 'jquery';
import CitygmaApp from './components/CitygmaApp';
import '../css/styles.scss';

$(document).ready(function () {
    var $enigmaDiv = $('body');

    var citygmaApp = new CitygmaApp($enigmaDiv);
});*/