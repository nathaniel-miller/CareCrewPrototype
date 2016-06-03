import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';


import { reduxForm, addArrayValue } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { submitTasks } from '../actions/index';
import { fetchShiftData } from '../actions/index';
import { fetchNotifications } from '../actions/index';
import { fetchProgressNotes } from '../actions/index';
import { incrDecrShiftSubmitRequestCount } from '../actions/index';
import { addProgressNoteToGlobalState } from '../actions/index';
import PureInput from './PureInput';
import PureTextarea from './PureTextarea';

export const fields = [
  'tasks[].id',
  'tasks[].description',
  'tasks[].date_scheduled',
  'tasks[].owner',
  'tasks[].completed',
  'progress_note.id',
  'progress_note.note_body',
  'progress_note.updateDate',
  'progress_note.owner',
  'progress_note.photo',
  'progress_note.video',
  'notifications[].id',
  'notifications[].description',
  'notifications[].date_created',
  'notifications[].owner'
]


class ShiftTaskListAndNotifications extends Component {
  constructor(props) {
    super(props);

    // this.renderTasks = this.renderTasks.bind(this);

  }

  // React calls this automatically
  //   whenever this component is about to render for the first time
  componentWillMount() {
    console.log("inside componentWillMount()");
    this.props.fetchShiftData();
    this.props.fetchNotifications();
    this.props.fetchProgressNotes();
  }

  // ===============================================================
  //
  //   onAddProgressNote
  //
  // ===============================================================
  onAddProgressNote(event) {

    console.log("inside onAddProgressNote()");

    event.preventDefault()  // prevent form submission

    var text = this.props.fields.progress_note.note_body.value;

    var date = new Date();

    var progressNote =
      {
         id: null,
         note_body: text,
         updatedDate: date,
         owner: 'Phyliss',
         photo: null,
         video: null
      };

    this.props.addProgressNoteToGlobalState(progressNote);
    this.props.clearAddProgressNotesField();

  }

  // ===============================================================
  //
  //   onTaskButtonClick
  //
  // ===============================================================
  onTaskButtonClick(event) {
     event.preventDefault()  // prevent form submission
     alert("Task details coming soon... ");

  }

  // ===============================================================
  //
  //   onVitalSignsClick
  //
  // ===============================================================
  onVitalSignsClick(event) {
     event.preventDefault()  // prevent form submission
     alert("Vital Signs coming soon... ");

  }

  // ===============================================================
  //
  //   onAddVideoClick
  //
  // ===============================================================
  onAddVideoClick(event) {
     event.preventDefault()  // prevent form submission
     alert("Video upload coming soon... ");

  }

  // ===============================================================
  //
  //   onAddPhotoClick
  //
  // ===============================================================
  onAddPhotoClick(event) {
     event.preventDefault()  // prevent form submission
     alert("Photo upload coming soon... ");

  }

  // ===============================================================
  //
  //   onSubmit
  //
  // ===============================================================
   onSubmit(props) {
    console.log('inside onSubmit()');
    console.log('props');
    console.log(props);

    console.log('this.props');
    console.log(this.props);

    var self = this;

    // iterate thru array
    this.props.fields.tasks.forEach(function(task) {
      if (task.completed.dirty === true) {
        var tempTask = {};

        tempTask._id = task.id.value;
        tempTask.status = task.completed.value ? 'completed' : 'new';

        console.log('self.props.shiftSubmitRequestCount');
        console.log(self.props.shiftSubmitRequestCount);

        self.props.incrDecrShiftSubmitRequestCount(1);

        self.props.submitTasks(tempTask)
          .then((data) => {
            console.log('submitTasks() has finished');
            console.log('data');
            console.log(data);
            self.props.incrDecrShiftSubmitRequestCount(-1);

            // if all tasks are updated, take focus off Submit button somehow
            // ... display update complete message
          });


      }
    });

    // this.props.submitNotications();

   }


  // ===============================================================
  //
  //   renderNotifications
  //
  // ===============================================================

  renderNotifications(notifications) {
    console.log("inside renderNotifications()");

    console.log("this.props.shiftSubmitRequestCount");
    console.log(this.props.shiftSubmitRequestCount);

    if (notifications.length === 0) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    //  defaultValue={this.props.books.shift.all.notifications[index].description} />
    //               {notification.date_created} {notification.owner}

    // var temp = notifications.map(function(notification, index) {
    //   return (
    //     <div key={index}>
    //       <label>
    //         <input
    //            className="shift-notification"
    //            disabled
    //            type="text"
    //            {...notification.description}
    //            defaultValue={'This is the first description'}
    //            />
    //          May 25, 2016  Linda
    //       </label>
    //     </div>
    //   );
    // });

    var temp = notifications.map(function(notification, index) {
      return (
           <div key={index}>
            <div>
              <label>Notice  <PureInput type="text" placeholder="description" className="notification-class" field={notification.description} /> {notification.date_created.value} {notification.owner.value}
              </label>
            </div>
          </div>
      );
    });

    // var temp = notifications.map(function(notification, index) {
    //    console.log("inside temp = notiications.map()");
    //    console.log('notification');
    //    console.log(notification);
    //    console.log('index');
    //    console.log(index);
    //    return (
    //         <div key={index + 1}>
    //         <div>
    //           <label>Id {index + 1}</label>
    //           <div>
    //             <PureInput type="text" placeholder="id" field={notification.id} />
    //           </div>
    //         </div>
    //         <div>
    //           <label>Description</label>
    //           <div>
    //             <PureInput type="text" placeholder="description" field={notification.description} />
    //           </div>
    //         </div>
    //         <div>
    //           <label>Date Created</label>
    //           <div>
    //             <PureInput type="text" placeholder="date created" field={notification.date_created} />
    //           </div>
    //         </div>
    //         <div>
    //           <label>Owner</label>
    //           <div>
    //             <PureInput type="text" placeholder="owner" field={notification.owner} />
    //           </div>
    //         </div>
    //        </div>
    //    );
    // });

    return temp;

  }


  // ===============================================================
  //
  //   renderTasks
  //
  // ===============================================================
  renderTasks(tasks, onTaskButtonClick) {

    console.log("inside renderTask()");

    if (tasks.length === 0){
      return (
        <div>
          Loading...
        </div>
      );
    }

    //  THIS COMMENTED OUT CODE WAS WORKING

    // var temp = tasks.map((task) => {
    //   console.log("task");
    //   console.log(task);
    //   return (
    //     <div key={task.id}>
    //       <label>
    //         <input  type="checkbox" {...task} /> {task.description} {task.date_scheduled} {task.owner}
    //       </label>
    //     </div>
    //   );
    // });

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var d1s = monthNames[monthIndex] + ' ' + day + ' ' + year;

    var self = this;

    var temp = tasks.map(function(task, index) {
      return (
           <div key={index} className="list-group-item my-list-group-item">
            <div className="task-div">
              <label>
                  <PureInput type="checkbox"  field={task.completed} /> {task.description.value} {(task.completed.value === true) ? '  -  ' + task.owner.value + '  -   ' + d1s : ''}
              </label> <span className="task-button-right"><Button className="badge task-button-right" onClick={onTaskButtonClick}> <i/>details...</Button></span>

            </div>
          </div>
      );
    });

    temp.push(
          <div key={999999} className="list-group-item">
            <div className="task-div">
              <label>
                  <PureInput type="checkbox"  field={tasks[0].completed} /> {'Click button to go to the Symptom Tracker'}
              </label> <span className="task-button-right"><button className="btn-smx task-button-right"> <i/>details...</button></span>

            </div>
          </div>
    );

    return temp;
  }


  // ===============================================================
  //
  //   renderProgressNotes
  //
  // ===============================================================
  renderProgressNotes(progress_notes) {

    console.log("inside renderProgressNotes");

    if (progress_notes.length === 0){
      return (
        <div>
          Loading...
        </div>
      );
    }

    // {id: '1',
    //  note_body: 'Previous progress note from a previous shift. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
    //  updatedDate: 'May 24, 2016 11:00am',
    //  owner: 'Phyliss',
    //  photo: null,
    //  video: null
    // }


    var temp = progress_notes.map(function(progress_note, index) {
      return (
           <div key={index} className="list-group-item">

              <li> {progress_note.note_body}
              </li>

          </div>
      );
    });

   return temp;

  }

  // ===============================================================
  //
  //   render
  //
  // ===============================================================
  render() {

    // state === {
    //  form: {
    //    ShiftTaskListAndNotificationsForm: {
    //      tasks: [
    //        { id: 1,
    //          description: 'a description',
    //          date_scheduled: 05-26-2016,
    //          owner: 'Linda',
    //          complete: false
    //        }
    //      ],
    //      notifications: [
    //        { id: 1,
    //          description: 'b description',
    //          date_created: 05-26-2016,
    //          owner:  'Linda'
    //        }
    //      ]
    //    }
    //  }
    // }

   const {
      addValue,
      fields: { tasks, notifications, progress_notes },
      handleSubmit,
      resetForm,
      submittingCount,
      ...rest
    } = this.props

   console.log("inside render()");

   console.log('this.props.shiftSubmitRequestCount');
   console.log(this.props.shiftSubmitRequestCount);

   // this code causess Warnings

   if (this.props.fields.notifications.length === 0 &&
       this.props.notifications &&
       this.props.notifications.length > 0) {
     for (let childIndex = 0; childIndex < this.props.notifications.length; childIndex++) {
          // addValue('ShiftTaskListAndNotificationsForm', 'notifications')

          notifications.addField(this.props.notifications[childIndex]);
          // notifications.addField({     // pushes child field with initial values onto the end of the array
          //     id: `${childIndex}`,
          //     description: 'This is a description',
          //     date_created: 'May 25, 2016',
          //     owner: 'Linda'
          //   });
      }
   }

   if (this.props.fields.tasks.length === 0 &&
       this.props.books &&
       this.props.books.tasks &&
       this.props.books.tasks.length > 0) {
     for (let childIndex = 0; childIndex < this.props.books.tasks.length; childIndex++) {
          // addValue('ShiftTaskListAndNotificationsForm', 'tasks')

          tasks.addField(this.props.books.tasks[childIndex]);
          // tasks.addField({     // pushes child field with initial values onto the end of the array
          //     id: `${childIndex}`,
          //     description: 'This is a task description',
          //     date_scheduled: 'May 25, 2016',
          //     owner: 'Linda',
          //     completed: false
          //   });
      }
   }

    return (
      <form className="form-class" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <h3>Shift Task List section</h3>
        {this.renderTasks(this.props.fields.tasks ? this.props.fields.tasks : [], this.onTaskButtonClick)}

        <div className="vital-signs-div">
          <div className="vital-signs-label">Vital Signs and other measurements</div>
            <ButtonToolbar>
              <ButtonGroup>
                <Button onClick={this.onVitalSignsClick.bind(this)} >
                  heart rate
                </Button>
                <Button onClick={this.onVitalSignsClick.bind(this)} >
                  blood pressure
                </Button>
                <Button onClick={this.onVitalSignsClick.bind(this)} >
                  glucose
                </Button>
                <Button onClick={this.onVitalSignsClick.bind(this)} >
                  weight
                </Button>
                <Button onClick={this.onVitalSignsClick.bind(this)} >
                  other vital signs
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
        </div>

        <h3>Progress Notes section</h3>
          <ul className="progress-notes-list">
             {this.renderProgressNotes(this.props.progress_notes)}
          </ul>
           <div className="progress_note_outer_div">

             <div className="progress_note_inner_div">

                 <ButtonToolbar>
                  <ButtonGroup>
                    <Button onClick={this.onAddPhotoClick.bind(this)}>Add Photo</Button>
                    <Button onClick={this.onAddVideoClick.bind(this)}>Add Video</Button>
                  </ButtonGroup>
                </ButtonToolbar>

                <PureTextarea className="add-progress-note-body" defaultValue="Enter progress note here." field={this.props.fields.progress_note.note_body} />

                 <ButtonToolbar>
                  <ButtonGroup>
                    <Button onClick={this.onAddProgressNote.bind(this)}>+</Button>
                  </ButtonGroup>
                </ButtonToolbar>

            </div>
          </div>



        { /* this.renderNotifications(this.props.fields.notifications ? this.props.fields.notifications : [])  */}

        <button type="submit" className="btn btn-primary" disabled={ this.props.shiftSubmitRequestCount }>
            {this.props.shiftSubmitRequestCount ? <i/> : ''} Submit
        </button>
        <button type="button" onClick={resetForm} className="btn">
            Clear Values
        </button>
        { this.props.shiftSubmitRequestCount ? null: <div>Tasks updated successfully</div> }
      </form>
    );
  }
}

ShiftTaskListAndNotifications.propTypes = {
  ...PropTypes,
  addValue: PropTypes.func.isRequired,
  router: PropTypes.object,
  submitting: PropTypes.bool.isRequired
}

// static propTypes = {
//   ...propTypes,
//   // other props you might be using
// }


// Whenever fetchShiftData is called, the result should be passed
// to all of the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addValue: addArrayValue,
                              fetchShiftData: fetchShiftData,
                              fetchNotifications: fetchNotifications,
                              fetchProgressNotes: fetchProgressNotes,
                              submitTasks: submitTasks,
                              incrDecrShiftSubmitRequestCount: incrDecrShiftSubmitRequestCount,
                              addProgressNoteToGlobalState: addProgressNoteToGlobalState
                            }, dispatch);
}


function mapStateToProps(state) {

  // should match the state in the reducer_shift.js

  // Whatever is returned will show up as props
  // inside of ShiftTaskListAndNotifications

  console.log("inside mapStateToProps");

  // tried this as given in examples.  It did not work !!
  // initialValues: state.shift.shift // will pull state into form's initialValues
  var stateToProps = {};

  if (state.notifications.shift.notifications) {
    stateToProps.notifications = state.notifications.shift.notifications;
  }

  if (state.shift.shift) {
    stateToProps.books = state.shift.shift;
  }

  if (state.progressnotes.progress_notes ) {
    stateToProps.progress_notes = state.progressnotes.progress_notes;
  }

  if (state.shiftrequest.shiftSubmitRequestCount >= 0) {
    stateToProps.shiftSubmitRequestCount = state.shiftrequest.shiftSubmitRequestCount;
  }

  return stateToProps;

  // if (state.notifications && state.shift.shift && state.progress.notes) {
  //   //  returning one array  notifications[]
  //   return {
  //     notifications: state.notifications.shift.notifications,
  //     books: state.shift.shift
  //     progress_notes: state.progress_notes
  //   };
  // } else if (state.notifications) {
  //   return {
  //     notifications: state.notifications.shift.notifications,t
  //   };
  // } else {
  //   //  two arrays  notifications[] and shift[]
  //   return {
  //     books: state.shift.shift // will pull state into form's initialValues
  //   };
  // }

}

export default reduxForm({
  form: "ShiftTaskListAndNotificationsForm",
  fields: fields
}, mapStateToProps, mapDispatchToProps)(ShiftTaskListAndNotifications);