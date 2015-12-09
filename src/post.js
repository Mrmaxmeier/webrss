
const React = require('react')

import { PostToolbar } from './posttoolbar.js'

export class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			displayMethod: 'cant-even'
		}
	}
	handleMethod(method) {
		this.setState({ displayMethod: method })
	}
	renderPost(method) {
		let post = this.props.post
		let centerStyle = {
			fontSize: '25px',
			textAlign: 'center',
			lineHeight: '80vh'
		}
		switch (method) {
		case 'cant-even':
			return <pre style={centerStyle}>CANT EVEN DISPLAY METHOD</pre>
		case 'iframe':
			return <iframe style={{width: '100%', height: '90%'}} src={post.url}/>
		case 'new-tab':
			return <pre style={centerStyle}><a href={post.url} target="_blank">New Tab</a></pre>
		case 'feed-content':
			return <pre style={centerStyle}>FEED CONTENT</pre>
		default:
			return <pre style={centerStyle}>NO CONTENT</pre>
		}
	}
	render() {
		return (
			<div>
				<PostToolbar fullscreen={this.props.fullscreen} setFullscreen={this.props.setFullscreen}
								post={this.props.post} handleMethod={this.handleMethod.bind(this)}
								displayMethod={this.state.displayMethod} />
				{this.renderPost(this.state.displayMethod)}
			</div>
		)
	}
}
