import React, {Component, Children, cloneElement} from 'react';
import {connect} from 'react-redux';
import {omit} from 'lodash';
import pureRender from 'pure-render-decorator';

@connect(
	({async}) => ({async}),
	null,
	(state, dispatchers, ownProps) => ({...ownProps, state, dispatchers})
)
@pureRender
export default class TodoContainer extends Component {
	render () {
		const props = omit(this.props, 'children');
		return (
			<div>
				{Children.map(this.props.children, child => cloneElement(child, props))}
			</div>
		);
	}
};
