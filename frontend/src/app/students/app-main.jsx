require("babel-core/register");
require("babel-polyfill");

const React = require('react');

const StudentList = require('./components/student-list.jsx');
const StudentProfile = require('./components/student-profile.jsx');
const AddStudent = require('./components/add-student.jsx');

class AppMain extends React.Component {

    constructor(props){
        super(props);

        this.openStudentProfile = this.openStudentProfile.bind(this);
        this.closeStudentProfile = this.closeStudentProfile.bind(this);
        this.closeAddStudentView = this.closeAddStudentView.bind(this);
        this.getStudentList = this.getStudentList.bind(this);

        this.state = {
            isLoading: true,
            studentProfileIsOpen: false,
            addStudentViewIsOpen: false,

            // functions:
            openStudentProfile: this.openStudentProfile,
            closeAddStudentView: this.closeAddStudentView,
            getStudentList: this.getStudentList,
            closeStudentProfile: this.closeStudentProfile
        };
    }

    openStudentProfile(student) {
        this.setState({
            studentProfileIsOpen: true,
            selectedStudent: student
        });
    }

    closeStudentProfile() {
        this.setState({
            studentProfileIsOpen: false,
            selectedStudent: null
        });
    }

    closeAddStudentView() { this.setState({ addStudentViewIsOpen: false });  }

    async componentDidMount() {
        this.setState({isLoading: true});
        await this.getStudentList();
    }

    getStudentList() {
        fetch('http://localhost:8080/getstudentlist')
            .then(response => response.json())
            .then(response => this.setState({
                studentList: response,
                isLoading: false
            }))
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.isLoading)
            return ( <h1>Loading...</h1> );
        else {
            return (
                <>
                    <div id="main">
                    <h1>Student list</h1>
                    <button onClick={() => this.setState({addStudentViewIsOpen: true})}>Add</button>

                    <StudentList studentList={this.state.studentList}
                                 openStudentProfile={this.state.openStudentProfile}/>

                    {this.state.studentProfileIsOpen ?
                        <StudentProfile student={this.state.selectedStudent}
                                        closeStudentProfile={this.state.closeStudentProfile}/>
                    : null}

                    {this.state.addStudentViewIsOpen ?
                        <AddStudent closeAddStudentView={this.state.closeAddStudentView} />
                        : null}
                    </div>
                </>
            );
        }
    }
}
module.exports = AppMain;

