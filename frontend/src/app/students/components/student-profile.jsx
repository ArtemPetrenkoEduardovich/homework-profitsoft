require("babel-core/register");
require("babel-polyfill");

const React    = require('react');
const ReactDOM = require('react-dom');

const UpDateStudent = require('./update-student.jsx');


class StudentProfile extends React.Component {

    constructor(props){
        super(props);

        this.closeUpDateView = this.closeUpDateView.bind(this);

        this.state = {
            dialogIsOpen: false,
            upDateViewIsOpen: false,

            // functions:
            closeUpDateView: this.closeUpDateView
        }
    }

    closeUpDateView() { this.setState({ upDateViewIsOpen: false }); }

    deleteStudent() {
        const data = new FormData();
        data.append('id', this.props.student.id);
        fetch('http://localhost:8080/deleteStudent', {
            method: 'POST',
            body: data
        })
            .then(window.location.replace("/"))
            .catch(err => console.error(err));
    }

    render() {
        const body = document.getElementsByTagName('body')[0];
        if (body) {
            let student = this.props.student;

            if (this.props.student.birthDate) {
                let month = String(this.props.student.birthDate.monthValue);
                month = month.length === 1 ? "0" + month : month;
                let day = String(this.props.student.birthDate.dayOfMonth);
                day = day.length === 1 ? "0" + day : day;
                student.birthDate.monthValue = month;
                student.birthDate.dayOfMonth = day;
            }
            return ReactDOM.createPortal (<>
            <div className="canvas"/>
                <div id="student-profile">

                <h1>Student profile</h1>

                <button onClick={() => this.props.closeStudentProfile()}>Close</button>

                <table border="1">
                <tr>
                    <td>ID:</td><td>{student.id}</td>
                </tr>
                <tr>
                    <td>Name:</td><td>{student.name}</td>
                </tr>
                <tr>
                    <td>Birth Date:</td>
                    {student.birthDate ?
                    <td>{student.birthDate.year}.{student.birthDate.monthValue}.{student.birthDate.dayOfMonth}</td>
                        : "Birth Date is absent"}
                </tr>
                <tr>
                    <td>Address:</td>
                    {student.address ?
                        <td>{student.address.town}, {student.address.street}, {student.address.house}</td>
                        : "Address is absent"}
                </tr>
                <tr>
                    <td>Group name:</td><td>{student.group != null ?
                        student.group.name : "Group is absent"
                    }</td>
                </tr>
                </table>

                <button onClick={() => this.setState({upDateViewIsOpen: true})}>Update</button>
                <button onClick={() => this.setState({dialogIsOpen: true})}>Delete</button>

                {this.state.upDateViewIsOpen ?
                    <UpDateStudent student={student} closeUpDateView={this.state.closeUpDateView}/>
                    : null}

                {this.state.dialogIsOpen ?
                <>
                <div className="canvas-dialog"/>

                <div id="dialog-window">
                    <p>Are you sure?</p>
                <button onClick={() => this.deleteStudent()}>Yes</button>
                <button onClick={() => this.setState({dialogIsOpen: false})}>No</button>
                </div>
                </>
                : null}

            </div>
            </>, body); } else { return null; }
    }
}
module.exports = StudentProfile;