
const React = require('react')

const Toolbar = require('material-ui/lib/toolbar/toolbar')
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group')
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title')
const RaisedButton = require('material-ui/lib/raised-button')

import { isRead, setRead } from './storage'
import { FontIcon, IconButton } from 'material-ui'
import DropDownMenu from 'material-ui/lib/drop-down-menu'

export class PostToolbar extends React.Component {
	fullscreen() {
		this.props.setFullscreen(!this.props.fullscreen)
	}
	markasread() {
		setRead(this.props.post)
	}
	render() {
		let hasLink = this.props.post.url != null
		let displayMethods = [
			{ payload: 'cant-even', text: 'Cant Even', disabled: hasLink },
			{ payload: 'iframe', text: 'iFrame', disabled: !hasLink },
			{ payload: 'feed-content', text: 'Feed-Content', disabled: !hasLink },
			{ payload: 'new-tab', text: 'New Tab', disabled: !hasLink }
		]
		let isFullscreen = this.props.fullscreen
		let read = isRead(this.props.post)
		return (
			<Toolbar>
				{isFullscreen ? (
					<ToolbarGroup key={0} float="left">
						<ToolbarTitle text="Post" />
					</ToolbarGroup>
				) : null}
				<ToolbarGroup key={1} float="right">
					<ToolbarTitle text="Display Method" />
					<FontIcon className="mui-icon-sort" />
					<DropDownMenu menuItems={displayMethods} onChange={(_, i) => {
						this.props.handleMethod(displayMethods[i].payload)
					}} />
					{isFullscreen ? (
						<IconButton iconClassName="material-icons" onTouchTap={this.fullscreen.bind(this)}>fullscreen_exit</IconButton>
					) : (
						<IconButton iconClassName="material-icons" onTouchTap={this.fullscreen.bind(this)}>fullscreen</IconButton>
					)}
					<RaisedButton label={read ? 'Mark as unread' : 'Mark as read'} primary={!read} onTouchTap={this.markasread.bind(this)} />
				</ToolbarGroup>
			</Toolbar>
		)
	}
}
