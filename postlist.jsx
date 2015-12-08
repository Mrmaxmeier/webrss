
const React = require('react')

import {
	List,
	ListDivider,
	ListItem
} from 'material-ui/lib/lists'
import { isRead, setRead } from './storage'
import { Avatar } from 'material-ui'

export const UnreadAvatar = <Avatar backgroundColor='rgba(131, 101, 246, 0.5)' />

class PostListItem extends React.Component {
	render() {
		let post = this.props.post
		let style = this.props.highlighted ? {
			backgroundColor: 'rgba(0,0,0,0.2)',
			fontSize: '14px',
			lineHeight: '10px'
		} : {
			fontSize: '14px',
			lineHeight: '10px'
		}
		let unread = !isRead(this.props.post)
		return <ListItem onTouchTap={() => {this.props.onTouchTap(this.props.index)}}
				value={this.props.index+1} primaryText={post.title} style={style}
				rightAvatar={unread ? UnreadAvatar : null} />
	}
}

export class PostList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedIndex: null
		}
		this.handleSelect = this.handleSelect.bind(this)
	}
	handleSelect(index) {
		setRead(this.props.posts[index])
		this.setState({ selectedIndex: index })
		this.props.onChange(this.props.posts[index])
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
		let d = this.filter(this.props.posts, isRead)
		let unread = d.unfiltered
		let read = d.filtered
		let hasNewContent = unread.length > 0
		return (
			<List subheader="Posts" style={this.props.style}>
				{hasNewContent ? (
					<div>
						{unread.map(data => {
							let post = data.e
							let i = data.i
							return <PostListItem onTouchTap={this.handleSelect} highlighted={i == this.state.selectedIndex}
									post={post} key={i} index={i} />
						})}
						<ListDivider />
					</div>
				) : null}
				<div>
					{read.map(data => {
						let post = data.e
						let i = data.i
						return <PostListItem onTouchTap={this.handleSelect} highlighted={i == this.state.selectedIndex}
								value={i+1} post={post} key={i} index={i} />
					})}
				</div>
			</List>
		)
	}
}
