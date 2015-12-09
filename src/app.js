'use strict'

const React = require('react')
const _ = require('underscore')
window.underscore = _

import { getFeeds, getPosts, isInited, registerCallback, registerShowPost } from './storage.js'
import { Paper } from 'material-ui'
import { FeedList } from './feedlist.js'
import { PostList } from './postlist.js'
import { Post } from './post.js'

export class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedFeed: null,
			selectedPost: null,
			feeds: null,
			posts: null,
			fullscreen: false
		}
		registerCallback(() => {
			this.setState({ feeds: getFeeds() })
			if (this.state.selectedFeed)
				this.setState({ posts: getPosts(this.state.selectedFeed) })
		})
		registerShowPost(post => {
			this.setState({
				selectedFeed: post.feed,
				selectedPost: post
			})
		})
	}
	render() {
		if (typeof(window.Storage) !== 'function')
			return <div>LocalStorage isnt supported!</div>
		if (!isInited() || !this.state.feeds)
			return <div>Waiting for LocalStorage</div>
		let hasPosts = this.state.posts && this.state.posts.length > 0
		let postOpen = this.state.selectedPost != null
		let fullscreen = this.state.fullscreen && postOpen
		let getStyle = width => {
			if (fullscreen && width != 100)
				return {width: width+'%', transition: 'all 500ms', opacity: '0'}
			return {width: width+'%', transition: 'width 500ms'}
		}
		let feedlistWidth = fullscreen ? 0 : postOpen ? 25 : hasPosts ? 40 : 100
		let postlistWidth = fullscreen ? 0 : postOpen ? 25 : 60
		return (
			<Paper style={fullscreen ? {margin: '1em', transition: 'all 1500ms'} : {}}>
				<div style={{display: 'flex'}}>
					<FeedList feeds={this.state.feeds} ref="feedList" onChange={feed => {
						this.setState({
							selectedFeed: feed,
							selectedPost: null,
							posts: getPosts(feed)
						})
						if (this.refs.postList)
							this.refs.postList.setState({selectedIndex: null})
					}} style={getStyle(feedlistWidth)} />
					{hasPosts ? (
						<PostList posts={this.state.posts} ref="postList" onChange={post => {
							this.setState({ selectedPost: post })
						}} style={getStyle(postlistWidth)} />
					) : null}
					{postOpen ? (
						<div style={getStyle(100 - (feedlistWidth + postlistWidth))}>
							<Post post={this.state.selectedPost} fullscreen={fullscreen} setFullscreen={fullscreen => this.setState({ fullscreen })} />
						</div>
					) : null}
				</div>
			</Paper>
		)
	}
}
