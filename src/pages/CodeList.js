import { Component } from "react";
import AmsGrid from "../components/AmsGrid";
import * as ApiUtil from "../utils/ApiUtil";

class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [{key:"name", value:"Name"}, {key: "description", value: "Description"}],
            codeListData: []
        }
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
                <AmsGrid 
                    headers={this.state.headers}
                    title="List of CodeList Names"
                    data={this.state.codeListData}
                />
            </div>
        )
    }
}
export default CodeList;