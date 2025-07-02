import React, { Component } from "react";
import AmsGrid from "../components/AmsGrid";
import * as ApiUtil from "../utils/ApiUtil";
import * as EndPoits from "../utils/EndPoints";
import * as Utils from "../utils/Utils";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGrid: true,
            usersGridHeaders: [
                {key:"firstName", value:"First Name"}, 
                {key: "lastName", value: "Last Name"},
                {key: "userName", value: "User Name"},
                {key: "email", value: "Email"},
                {key: "gender", value: "Gender"}],
            usersData: []
        }
        this.amsGridRef = React.createRef();
        this.loadGrid = this.loadGrid.bind(this);
    }
    loadGrid() {
        let res = ApiUtil.getCall(EndPoits.USER_LIST_ALL);
        res.then(data => {
            this.setState({usersData: data.userList, showGrid: true}); 
        });
    }
    componentDidMount() {
        this.loadGrid();
    }
    render() {
        return(
            <div>
                {this.state.showGrid === true &&(
                    <div>
                         <AmsGrid 
                            id = "users-grid"
                            keyValue="recordId"
                            headers={this.state.usersGridHeaders}
                            title="List of Users"
                            data={this.state.usersData}
                            ref={this.amsGridRef}
                            pagination={true}
                        />
                    </div>
                )}
            </div>
        )
    }
}
export default Users;