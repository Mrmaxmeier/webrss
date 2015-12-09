'use strict'

const React = require('react')
const _ = require('underscore')
window.underscore = _

import { getFeeds, getPosts, isInited, registerCallback } from './storage.js'
import { FeedList } from './feedlist.js'
import { PostList } from './postlist.js'
import { Paper } from 'material-ui'

export class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedFeed: null,
			selectedPost: null,
			feeds: null,
			posts: null
		}
		registerCallback(() => {
			this.setState({ feeds: getFeeds() })
			if (this.state.selectedFeed)
				this.setState({ posts: getPosts(this.state.selectedFeed) })
		})
	}
	render() {
		if (typeof(window.Storage) !== 'function')
			return <div>LocalStorage isnt supported!</div>
		if (!isInited() || !this.state.feeds)
			return <div>Waiting for LocalStorage</div>
		let getStyle = width => {
			return {width: width+'%', transition: 'width 500ms'}
		}
		let hasPosts = this.state.posts && this.state.posts.length > 0
		return (
			<Paper>
				<div style={{display: 'flex'}}>
					<FeedList feeds={this.state.feeds} ref="feedList" onChange={feed => {
						this.setState({
							selectedFeed: feed,
							selectedPost: null,
							posts: getPosts(feed)
						})
						if (this.refs.postList)
							this.refs.postList.setState({selectedIndex: null})
					}} style={hasPosts ? getStyle(40) : getStyle(100)} />
					{hasPosts ? (
						<PostList posts={this.state.posts} ref="postList" onChange={post => {
							this.setState({ selectedPost: post })
						}} style={getStyle(60)} />
					) : null}
				</div>
			</Paper>
		)
	}
}
