'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

import { App } from './app'
console.log('React.version: ' + React.version)
import { chkInit } from './storage'

chkInit()

ReactDOM.render(
	<App />,
	document.getElementById('container')
)
