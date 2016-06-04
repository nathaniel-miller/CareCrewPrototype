import React, {Component} from 'react';

import {connect} from 'react-redux';
const nameBarContainer = {'paddingTop': '10px', 'paddingBottom': '10px', 'marginBottom': '10px', 'backgroundColor': '#80CDC4', 'color': '#FFFFFF'}

export default class PageNameBar extends Component {
  render() {
    return <div style={nameBarContainer}><h3> Page Name </h3></div>
  }
}
function mapStateToProps(state){
  return{
    user: state.users.user,
    };
}
export default connect(mapStateToProps)(PageNameBar);
