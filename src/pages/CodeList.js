import React, { Component } from "react";
import AmsGrid from "../components/AmsGrid";
import * as ApiUtil from "../utils/ApiUtil";
import AmsButton from "../components/AmsButton";
import AmsInput from "../components/AmsInput";
import * as EndPoits from "../utils/EndPoints";
import * as Utils from "../utils/Utils";

class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                {key:"name", value:"Name", link: true}, 
                {key: "description", value: "Description"}],
            codeListData: [],
            showAddForm: false,
            name: "",
            description: "",
            showCodeListCodes: false,
            showCodeList: true,
            codeHeaders: [
                {key:"code", value:"Code"}, 
                {key: "codeValue", value: "Code Value"},
                {key: "codeDescription", value: "Code Description"}],
            codeListCodeData: [],
             code: "",
             codeValue: "",
             codeDescription: "",             
             codeListNameError: "",
             showCodelistCodeAddForm: false,
             codeListCodeError: ""

        }
        this.addCall = this.addCall.bind(this);
        this.saveAction = this.saveAction.bind(this);
        this.getCodeListData = this.getCodeListData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.nameClick = this.nameClick.bind(this);
        this.amsGridRef = React.createRef();
        this.saveCodeListAction = this.saveCodeListAction.bind(this);
    }
    nameClick(event, codeListId) {
        let res = ApiUtil.getCall(EndPoits.CODE_LIST_FIND+"/"+codeListId);
        res.then(data => {
            sessionStorage.setItem("codelistId", codeListId);
            this.setState({codeListCodeData: data.codeListBean.codeListCodeBeans, showCodeListCodes: true, showAddForm: false, showCodeList: false}); 
        });

    }
    handleInputChange(event, type) {
        let val = event.target.value;
        if(type === "name") {
            this.setState({ name: val });
        } else if(type === "desc") {
            this.setState({ description: val });
        }else if(type == "code"){
            this.setState({ code: val})
        } else if (type === "codevalue") {
            this.setState({ codeValue: val });
       } else if (type === "codedesc") {
            this.setState({ codeDescription: val });
       }
        
        
    }
     cancelAction() {
        if(this.state.showCodelistCodeAddForm === true) {
            this.setState({codeListCodeError: "", code: "",showCodelistCodeAddForm: false,  showCodeList: true, showAddForm: false, showCodeListCodes: false});
        } else {
            this.setState({name: "",codeListNameError: "",showAddForm: false,  showCodeList: true, showCodeListCodes: false, showCodelistCodeAddForm: false});
        }
    }
    addCall(event) {
        if(this.state.showCodeListCodes === true) {
            this.setState({showCodelistCodeAddForm: true,  showCodeList: false,showAddForm: false, showCodeListCodes: false});
        } else {
            this.setState({showAddForm: true,  showCodeList: false, showCodeListCodes: false, showCodelistCodeAddForm: false});
        }
        
    }
    deleteAction() {
        if(this.amsGridRef !== undefined && this.amsGridRef.current !== undefined) {
            if(this.amsGridRef.current.state.selectedItmes.length === 0) {
                Utils.processErronMessage('Please select a item to delete.');
            } else if(this.amsGridRef.current.state.selectedItmes.length > 1) {
                Utils.processErronMessage('Please select a single item to delete.');
            } else {
                if(window.confirm('Do you want to delete the codelist ?')) {
                    var codeListId = this.amsGridRef.current.state.selectedItmes[0];
                    if(this.state.showCodeListCodes === true) {
                        let res = ApiUtil.deleteCall(EndPoits.CODE_LIST_CODE_DELETE+"/"+codeListId, {});
                        res.then(data => {
                            if(data.status === "SUCCESS") {
                                Utils.processSuccessMessage('Codelistcode deleted successfully.');
                                this.getCodeListData();
                                this.setState({showCodeList: true});
                                this.amsGridRef.current.state.selectedItmes = [];
                            }
                        });
                    } else {
                        let res = ApiUtil.deleteCall(EndPoits.CODE_LIST_DELETE+"/"+codeListId, {});
                        res.then(data => {
                            if(data.status === "SUCCESS") {
                                Utils.processSuccessMessage('Codelist deleted successfully.');
                                this.getCodeListData();
                                this.setState({showCodeList: true});
                                this.amsGridRef.current.state.selectedItmes = [];
                            }
                        });
                    }
                    
                }
            }
        }
    }

    saveAction(event) {
        if(this.state.name === undefined || this.state.name === '') {
            this.setState({codeListNameError: "Name should not be empty."});
            return;
        }
        let request = {
            "codeListBean": {
                name: this.state.name,
                description: this.state.description
            }
        }
        let res = ApiUtil.postCall(EndPoits.CODE_LIST_ADD, request);
        res.then(data => {
            if(data.status === "SUCCESS") {                
                this.getCodeListData();
                this.setState({showCodeList: true, showAddForm: false, codeListNameError: "", name: ""});
                Utils.processSuccessMessage("Codelist added succssfully.")
            } else {   
                Utils.processErronMessage(data.error.errorMessage)
            }
        });
        
    }
    saveCodeListAction(){
        if(this.state.code === undefined || this.state.code === '') {
            this.setState({codeListCodeError: "Code should not be empty."});
            return;
        }
        let codelistId = parseInt(sessionStorage.getItem("codelistId"))
        let request = {
            "codeListBean": {
                "recordId": codelistId,
                "codeListCodeBeans": [{
                    code: this.state.code,
                    codeValue: this.state.codeValue,
                    codeDescription: this.state.codeDescription
                }]
            }
        }
        let res = ApiUtil.postCall(EndPoits.CODE_LIST_CODE_ADD, request);
        res.then(data => {
            if(data.status === "SUCCESS") {                
                this.getCodeListData();
                this.setState({showCodelistCodeAddForm: false});
                Utils.processSuccessMessage("Codelist code added succssfully.");
                sessionStorage.removeItem("codelistId");
                this.nameClick(null, codelistId);
            } else if(data.error !== undefined && data.error.errorMessage !== undefined) {
                 Utils.processErronMessage(data.error.errorMessage);
            }
        });
    }
    componentDidMount() {
        this.getCodeListData();
    }   
    getCodeListData()  {
        let res = ApiUtil.getCall(EndPoits.CODE_LIST_ALL);
        res.then(data => {
            let dataList = [];
            data.codeListBeanList.map((obj) => {
                dataList.push({recordId: ""+obj.recordId+"", name: ""+obj.name+"", description: ""+obj.description+""});
            })
            this.setState({codeListData: dataList}); 
        });
    }
    render() {
        return(
            <div>   
                {this.state.showAddForm === false && (             
                <table style={{width: "99%"}}>
                    <tr>
                        <td width={"3%"}>
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
                                callBack={event => this.deleteAction(event)}
                                type="inactive"
                            />
                        </td>    
                    </tr>
                </table>)}
                {this.state.showAddForm === true && (
                    <div>
                        <table width={"99%"}>
                            <tr>
                                <td className="grid-title">Add CodeList Form</td>
                            </tr>
                            <tr>
                                <td>
                                    <AmsInput
                                        id="Name"
                                        name="nameInput"
                                        label="Name"
                                        value={this.state.nameInput}
                                        error={this.state.codeListNameError}
                                        onChange={event=>this.handleInputChange(event, "name")}
                                        required={true}
                                        width="10%"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <AmsInput
                                        id="decription"
                                        name="descriptionInput"
                                        label="Description"
                                        description=""
                                        value={this.state.descriptionIput}
                                        onChange={event=>this.handleInputChange(event, "desc")}
                                        width="10%"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: "10%"}}>
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
                {this.state.showCodeList === true && (
                    <AmsGrid 
                        id = "codelist-grid"
                        keyValue="recordId"
                        headers={this.state.headers}
                        title="List of CodeList Names"
                        data={this.state.codeListData}
                        linkFn = {this.nameClick}
                        ref={this.amsGridRef}
                    />
                )}
                {this.state.showCodeListCodes === true && (
                    <div>
                        <AmsGrid 
                            id = "codelistcode-grid"
                            keyValue="recordId"
                            headers={this.state.codeHeaders}
                            title="List of CodeList Codes"
                            data={this.state.codeListCodeData}
                            ref={this.amsGridRef}
                        />
                        <AmsButton 
                            id="back-button" 
                            label="Back" 
                            callBack={event => this.setState({showCodeListCodes: false, showCodeList: true})}
                            type="inactive"
                        />
                    </div>
                )}
                {this.state.showCodelistCodeAddForm === true && (
                    <div>
                        <table width={"99%"}>
                            <tr>
                                <td className="grid-title">Add CodeList Codes Form</td>
                            </tr>
                            <tr>
                                <td>
                                    <AmsInput
                                        id="code-id"
                                        name="code"
                                        label="code"
                                        value={this.state.code}
                                        error={this.state.codeListCodeError}
                                        onChange={event=>this.handleInputChange(event, "code")}
                                        required={true}
                                        width="10%"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <AmsInput
                                        id="code-value-id"
                                        name="code-value-id"
                                        label="Code Value"
                                        description=""
                                        value={this.state.descriptionIput}
                                        onChange={event=>this.handleInputChange(event, "codevalue")}
                                        width="10%"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <AmsInput
                                        id="code-desc-id"
                                        name="code-desc-id"
                                        label="Description"
                                        description=""
                                        value={this.state.descriptionIput}
                                        onChange={event=>this.handleInputChange(event, "codedesc")}
                                        width="10%"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: "10%"}}>
                                    <AmsButton 
                                        id="add-button" 
                                        label="Save" 
                                        callBack={event => this.saveCodeListAction(event)}
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
            </div>
        )
    }
}
export default CodeList;