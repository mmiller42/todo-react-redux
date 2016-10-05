import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Loading extends Component {
	render () {
		return <div className="loading"><span className="glyphicon glyphicon-option-horizontal"></span></div>;
	}
}
