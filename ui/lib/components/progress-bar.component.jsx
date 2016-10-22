import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';

import '../styles/progress-bar.component.css';

@pureRender
export default class ProgressBar extends Component {
	render () {
		const state = this.props.state.async;

		return (
			<div className="progress">
				<div className={'progress-bar' + (state.isPending ? '' : ' done')} />
			</div>
		);
	}
};
