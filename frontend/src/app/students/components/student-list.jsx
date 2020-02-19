const React = require('react');

const Student = require('./student.jsx');

class StudentList extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const studentList = this.props.studentList;
        return ( <>
            <table border="1">
                {studentList.map( stud =>
                    <Student student={stud}
                             openStudentProfile={this.props.openStudentProfile} />
                )}
            </table>
        </>);
    }
}
module.exports = StudentList;