const React = require('react');
const ReactDOM = require('react-dom');

class AddStudent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        };
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        await fetch('http://localhost:8080/getgrouplist')
            .then(response => response.json())
            .then(response => this.setState({
                groupList: response,
                isLoading: false
            }))
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.isLoading)
            return ( <><div className="canvas"/><h1>Loading...</h1></> );
        else {
            const body = document.getElementsByTagName('body')[0];
            if (body) {
                return ReactDOM.createPortal(<>
                    <div className="canvas"/>
                    <div id="add-student">
                        <h1>Add student</h1>
                        <button onClick={() => this.props.closeAddStudentView()}>Close</button>

                            <form action="http://localhost:8080/addStudent" method="POST">
                            <table>
                                <tr>
                                    <td><label>Name: </label></td>
                                    <td><input name="name"/></td>
                                </tr>
                                <tr>
                                    <td><label>Birth Date: </label></td>
                                    <td><input type="date" name="birthDate"/></td>
                                </tr>
                                <tr>
                                    <td><label>Address town: </label></td>
                                    <td><input name="address_town"/></td>
                                </tr>
                                <tr>
                                    <td><label>Address street: </label></td>
                                    <td><input name="address_street"/></td>
                                </tr>
                                <tr>
                                    <td><label>Address house: </label></td>
                                    <td><input name="address_house"/></td>
                                </tr>
                                <tr>
                                    <td><label>Group: </label></td>
                                    <td>
                                        <select name="group">
                                            {this.state.groupList.map(group =>
                                                <option>Id: {group.id}; Name: {group.name};</option>)
                                            }
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <input type="submit" value="Add"/>
                        </form>
                    </div>
                </>, body);
            } else {
                return null;
            }
        }
    }
}
module.exports = AddStudent;