import {connect} from 'react-redux';

function mapStateToProps (state) {
	return {state};
}

function mapDispatchToProps (dispatch) {
	return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps);