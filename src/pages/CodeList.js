import { Component } from "react";
import AmsGrid from "../components/AmsGrid";
import * as ApiUtil from "../utils/ApiUtil";
import AmsButton from "../components/AmsButton";

class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [{key:"name", value:"Name"}, {key: "description", value: "Description"}],
            codeListData: [],
            showAddForm: false
        }
        this.addCall = this.addCall.bind(this)
    }
    addCall(event) {
        this.setState({showAddForm: true});
    }
    componentDidMount() {
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
                    <div>Construct Form here</div>
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