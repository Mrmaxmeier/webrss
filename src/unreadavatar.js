import React from 'react'
import { Avatar, FontIcon } from 'material-ui'

export class UnreadAvatar extends React.Component {
	render() {
		let icon = <FontIcon className="material-icons">new_releases</FontIcon>
		return <Avatar backgroundColor='rgba(131, 101, 246, 0.5)' icon={icon} style={this.props.style} />
	}
}
