import React, {Component} from 'react';
import ui from 'redux-ui';
import pureRender from 'pure-render-decorator';

@ui({
	state: {
		isCollapsed: false
	}
})
@pureRender
export default class ErrorMessage extends Component {
	constructor (props) {
		super(props);
		this.previousError = null;
	}

	render () {
		const {lastError} = this.props.state.async;

		if (this.previousError !== lastError) {
			this.props.updateUI('isCollapsed', false);
			this.previousError = lastError;
		}

		if (!lastError || this.props.ui.isCollapsed) {
			return null;
		}

		return (
			<div className="alert alert-danger alert-dismissible">
				<button type="button" onClick={() => this.props.updateUI('isCollapsed', true)} className="close">×</button>
				{lastError.message}
			</div>
		);
	}
};
