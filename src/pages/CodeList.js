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
            codeListCodeData: []

        }
        this.addCall = this.addCall.bind(this);
        this.saveAction = this.saveAction.bind(this);
        this.getCodeListData = this.getCodeListData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.nameClick = this.nameClick.bind(this);
        this.amsGridRef = React.createRef();
    }
    nameClick(event, codeListId) {
        let res = ApiUtil.getCall(EndPoits.CODE_LIST_FIND+"/"+codeListId);
        res.then(data => {
            this.setState({codeListCodeData: data.codeListBean.codeListCodeBeans, showCodeListCodes: true, showAddForm: false, showCodeList: false}); 
        });
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
        this.setState({showAddForm: false, showCodeList: true, showCodeListCodes: false});
    }
    addCall(event) {
        this.setState({showAddForm: true, showCodeList: false, showCodeListCodes: false});
    }
    deleteAction() {
        if(this.amsGridRef !== undefined && this.amsGridRef.current !== undefined) {
            if(this.amsGridRef.current.state.selectedItmes.length === 0) {
                Utils.processErronMessage('Please select a item to delete.');
            } else if(this.amsGridRef.current.state.selectedItmes.length > 1) {
                Utils.processErronMessage('Please select a single item to delete.');
            } else {
                var codeListId = this.amsGridRef.current.state.selectedItmes[0];
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
    saveAction(event) {
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
                this.setState({showCodeList: true, showAddForm: false});
                Utils.processSuccessMessage("Codelist added succssfully.")
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
            </div>
        )
    }
}
export default CodeList;