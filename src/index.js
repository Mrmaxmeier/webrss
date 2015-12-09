'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

console.log('React.version: ' + React.version)

import { App } from './app.js'
import { chkInit } from './storage.js'

chkInit()

ReactDOM.render(
	<App />,
	document.getElementById('container')
)
