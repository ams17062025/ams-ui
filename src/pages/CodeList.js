import { Component } from "react";
import AmsGrid from "../components/AmsGrid";
import * as ApiUtil from "../utils/ApiUtil";
import AmsButton from "../components/AmsButton";
import AmsInput from "../components/AmsInput";
class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [{key:"name", value:"Name"}, {key: "description", value: "Description"}],
            codeListData: [],
            showAddForm: false,
            name: "",
            description: ""
        }
        this.addCall = this.addCall.bind(this);
        this.saveAction = this.saveAction.bind(this);
        this.getCodeListData = this.getCodeListData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
    }
    handleInputChange(event, type) {
        let val = event.target.value;
        if(type === "name") {
            this.setState({ name: val });
        } else if(type === "desc") {
            this.setState({ description: val });
        }
    }
    cancelAction() {
        this.setState({showAddForm: false});
    }
    addCall(event) {
        this.setState({showAddForm: true});
    }
    saveAction(event) {
        let request = {
            "codeListBean": {
                name: this.state.name,
                description: this.state.description
            }
        }
        let res = ApiUtil.postCall("http://localhost:9011/codelist/add", request);
        res.then(data => {
            if(data.status === "SUCCESS") {
                this.getCodeListData();
                this.setState({showAddForm: false});
            }
        });
        
    }
    componentDidMount() {
        this.getCodeListData();
    }   
    getCodeListData()  {
        let res = ApiUtil.getCall("http://localhost:9011/codelist/list");
        res.then(data => {
            console.log(data.codeListBeanList);
            let dataList = [];
            data.codeListBeanList.map((obj) => {
                dataList.push({name: ""+obj.name+"", description: ""+obj.description+""});
            })
            this.setState({codeListData: dataList}); 
        });
    }
    render() {
        return(
            <div>                
                <table style={{width: "99%"}}>
                    <tr>
                        <td>
                            <AmsButton 
                                id="add-button" 
                                label="Add" 
                                callBack={event => this.addCall(event)}
                                type="active"
                            />
                        </td>
                        <td>
                            <AmsButton 
                                id="delete-button" 
                                label="Delete" 
                                callBack={event => this.addCall(event)}
                                type="inactive"
                            />
                        </td>    
                    </tr>
                </table>
                {this.state.showAddForm === true && (
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <AmsInput
                                        id="Name"
                                        name="nameInput"
                                        description="Description"
                                        label="Name"
                                        value={this.state.nameInput}
                                        onChange={event=>this.handleInputChange(event, "name")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <AmsInput
                                        id="decription"
                                        name="descriptionInput"
                                        description="Description"
                                        label="Description"
                                        value={this.state.descriptionIput}
                                        onChange={event=>this.handleInputChange(event, "desc")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <AmsButton 
                                        id="add-button" 
                                        label="Save" 
                                        callBack={event => this.saveAction(event)}
                                        type="active"
                                        style={{float: "left", marginRight: "3px"}}
                                    />
                                    <AmsButton 
                                        id="cancel-button" 
                                        label="Cancel" 
                                        callBack={event => this.cancelAction(event)}
                                        type="inactive"
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                )}
                {this.state.showAddForm === false && (
                    <AmsGrid 
                        headers={this.state.headers}
                        title="List of CodeList Names"
                        data={this.state.codeListData}
                    />
                )}
            </div>
        )
    }
}
export default CodeList;