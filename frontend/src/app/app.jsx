require('../less/main.less');

const React    = require('react');
const ReactDOM = require('react-dom');

const AppMain = require('./students/app-main.jsx');

const body = document.getElementsByTagName('body')[0];
if (body) {
    ReactDOM.render( <AppMain />, body );
}