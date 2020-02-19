const React    = require('react');

class Student extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const student = this.props.student;
        return (
            <>
                <tr>
                    <td>ID: <i>{student.id}</i></td>
                    <td>Name: <i>{student.name}</i></td>
                    <td>Group name: <i>{student.group != null ?
                        student.group.name : "Group is absent"
                    }</i></td>
                    <td><button onClick={() => this.props.openStudentProfile(student)}>Open</button></td>
                </tr>
            </>
        );
    }
}
module.exports = Student;