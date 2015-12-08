
const React = require('react')

import {
	List,
	ListDivider,
	ListItem
} from 'material-ui/lib/lists'
import { Avatar } from 'material-ui'
import { UnreadAvatar } from './postlist'
import { anyUnread } from './storage'

class FeedListItem extends React.Component {
	render() {
		let feed = this.props.feed
		let avatar = feed.img ? <Avatar src={feed.img} /> : null
		let style = this.props.highlighted ? {backgroundColor: 'rgba(0,0,0,0.2)'} : {}
		return <ListItem onTouchTap={() => {this.props.onTouchTap(this.props.index)}}
				value={this.props.index+1} primaryText={feed.name} leftAvatar={avatar}
				style={style} secondaryText={feed.url}
				rightAvatar={this.props.newContent ? UnreadAvatar : null} />
	}
}

export class FeedList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedIndex: null
		}
		this.handleSelect = this.handleSelect.bind(this)
	}
	handleSelect(index) {
		this.setState({ selectedIndex: index })
		this.props.onChange(this.props.feeds[index])
	}
	filter(list, func) {
		var f = []
		var uf = []
		list.forEach((e, i) => {
			if (func(e))
				f.push({e, i})
			else
				uf.push({e, i})
		})
		return {filtered: f, unfiltered: uf}
	}
	render() {
		let d = this.filter(this.props.feeds, anyUnread)
		let unread = d.filtered
		let read = d.unfiltered
		let hasNewContent = unread.length > 0
		return (
			<List subheader="Feeds" style={this.props.style}>
				{hasNewContent ? (
					<div>
						{unread.map(data => {
							let feed = data.e
							let i = data.i
							return <FeedListItem onTouchTap={this.handleSelect} highlighted={i == this.state.selectedIndex}
									feed={feed} key={feed.id} index={i} newContent={true} />
						})}
						<ListDivider />
					</div>
				) : null}
				<div>
					{read.map(data => {
						let feed = data.e
						let i = data.i
						return <FeedListItem onTouchTap={this.handleSelect} highlighted={i == this.state.selectedIndex}
								value={i+1} feed={feed} key={feed.id} index={i} />
					})}
				</div>
			</List>
		)
	}
}
