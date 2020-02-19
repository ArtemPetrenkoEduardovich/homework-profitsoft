const React = require('react');
const ReactDOM = require('react-dom');

class UpDateStudent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading:      true,
            id:              this.props.student.id,
            groupId:         this.props.student.group.id,
            name:            this.props.student.name,
            address_town:   this.props.student.address.town,
            address_street: this.props.student.address.street,
            address_house:  this.props.student.address.house,
            birthDate: this.props.student.birthDate ?
                        this.props.student.birthDate.year + "-" +
                        this.props.student.birthDate.monthValue + "-" +
                        this.props.student.birthDate.dayOfMonth
                        : ""
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
                const birthDate = this.state.birthDate;
                return ReactDOM.createPortal(<>
                    <div className="canvas"/>
                    <div id="add-student">
                        <h1>Update student</h1>
                        <button onClick={() => this.props.closeUpDateView()}>Close</button>

                        <form action="http://localhost:8080/updateStudent" method="POST">
                            <table>
                                <tr>
                                    <td><label>Id: </label></td>
                                    <td><input name="id" value={this.state.id}/></td>
                                </tr>
                                <tr>
                                    <td><label>Name: </label></td>
                                    <td><input name="name"
                                               value={this.state.name}
                                               onChange={(e) => this.setState({name: e.target.value})}/></td>
                                </tr>
                                <tr>
                                    <td><label>Birth Date: </label></td>
                                    <td><input type="date"
                                               name="birthDate"
                                               value={birthDate}
                                               onChange={(e) => this.setState({birthDate: e.target.value})}/></td>
                                </tr>
                                <tr>
                                    <td><label>Address town: </label></td>
                                    <td><input name="address_town"
                                               value={this.state.address_town}
                                               onChange={(e) => this.setState({address_town: e.target.value})}/></td>
                                </tr>
                                <tr>
                                    <td><label>Address street: </label></td>
                                    <td><input name="address_street"
                                               value={this.state.address_street}
                                               onChange={(e) => this.setState({address_street: e.target.value})}/></td>
                                </tr>
                                <tr>
                                    <td><label>Address house: </label></td>
                                    <td><input name="address_house"
                                               value={this.state.address_house}
                                               onChange={(e) => this.setState({address_house: e.target.value})}/></td>
                                </tr>
                                <tr>
                                    <td><label>Group: </label></td>
                                    <td>
                                        <select name="group">
                                            {this.state.groupList.map(group => (
                                                this.state.groupId === group.id ?
                                                <option selected>
                                                    Id: {group.id}; Name: {group.name};
                                                </option>
                                                    :
                                                <option>
                                                    Id: {group.id}; Name: {group.name};
                                                </option>
                                                ))}
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <input type="submit" value="Update"/>
                        </form>
                    </div>
                </>, body);
            } else {
                return null;
            }
        }
    }
}
module.exports = UpDateStudent;