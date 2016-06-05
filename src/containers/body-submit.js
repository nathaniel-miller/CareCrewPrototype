import React, {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { createSymptomInstance } from '../actions/index';

export default class BodySubmit extends Component {
  constructor(props){
    super(props);
    this.state = {submitBodyPart:"none", //used to make first list option the default selected radio button
    submitPainType: "none",  //used to make first list option the default selected active pain option
    submitSeverity: "none", //used to make first list option the default selected radio button
    submitClicked: false
  };}
  componentWillMount() {
    console.log('This would be a good time to call an action creator to fetch posts');

  };
onClickSubmit(){
   this.setState({submitBodyPart: this.props.bodyPart.id})
   this.setState({submitPainType: this.props.activePain.name})
   this.setState({submitSeverity: this.props.activeSeverity.name})
   this.setState({submitClicked: true})
   this.insertTrackData()
   console.log(this.props.patient[0].firstName)
};
insertTrackData(){
  var body = {
          bodyPart: this.props.bodyPart.label,
          measurementUnit: this.props.activePain.label,
          measurement: this.props.activeSeverity.name,
          patientId: this.props.patient[0]._id,
          userIds: this.props.user[0]._id
      };

  request
      .post('http://carecrewhq.herokuapp.com/careCrew/healthMeasures')
      .accept("application/json")
      .set("Content-Type", "application/json")
    //  .send(body)
    .send(JSON.stringify(body,null,"   "))
          .end(function(err, res){
              if (err || !res.ok) {
              alert('Error, submission was not successful');
                  alert(JSON.stringify(body, null, "   "));
              } else {
                  alert('Successful submission ' + JSON.stringify(res.body));
              }
        })
}
onClickReset(){
   this.setState({submitBodyPart: "none"})
   this.setState({submitPainType: "none"})
   this.setState({submitSeverity: "none"})
   this.setState({submitClicked: false})
};
renderPosts() {
  return this.props.posts.map((post) => {
    return (
      <li className="list-group-item" key={post.createdDate}>
        <span className="pull-xi-right">{post.measurement}</span>
        <strong>{post.measurementUnit}</strong>
      </li>);});}

  render() {
    if(!this.props.bodyPart){
      return <div> </div> ;
    }
    if(!this.state.submitClicked){
      return  <button onClick={() => this.onClickSubmit()}> Submit Here </button>
    }

    return <div>
    <h3> {this.state.submitBodyPart}</h3>
        <button onClick={() => this.onClickReset()}> Reset </button>
    </div>

  }
}

function mapStateToProps(state){
  return{
    patient: state.patients.patient,
    bodyPart: state.activeBodyPart,
    activePain: state.activePain,
    activeSeverity: state.activeSeverity,
    posts:  state.posts.all,
    user: state.users.user
    };
}
function mapDispatchToProps(dispatch) {
return bindActionCreators({ createSymptomInstance }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BodySubmit);

//export default reduxForm({form: "PostsNewForm", fields: ['title', 'categories', 'content']
//}, mapStateToProps, mapDispatchToProps)(PostsNew);
