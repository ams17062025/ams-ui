import { Component } from "react";

class AmsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItmes: [],
            pageSize: 10
        }
        this.onSelectAll = this.onSelectAll.bind(this);
        this.onSelectItem = this.onSelectItem.bind(this);
    }
    onSelectAll(event) {
        var checked = event.target.checked;
        if(checked === true) {
            this.props.data && this.props.data.map((dataObj) => {
                var keyValue = dataObj[""+this.props.keyValue+""];
                var checkboxEl = document.getElementById("checkbox-"+keyValue);
                if(checkboxEl !== undefined) {
                    checkboxEl.checked = true;
                }
                this.state.selectedItmes.push(dataObj[""+this.props.keyValue+""]);
            });
        } else if(checked === false) {
            this.props.data && this.props.data.map((dataObj) => {
                var keyValue = dataObj[""+this.props.keyValue+""];
                var checkboxEl = document.getElementById("checkbox-"+keyValue);
                if(checkboxEl !== undefined) {
                    checkboxEl.checked = false;
                }
            });
            this.setState({selectedItmes: []});
        }
    }
    onSelectItem(event) {
        var checked = event.target.checked;
        if(checked === true) {
            var keyValue = event.target.id.split("-")[1];
            if(this.state.selectedItmes.indexOf(keyValue) < 0) {
                this.state.selectedItmes.push(keyValue);
            }
        } else if(checked === false) {
            var keyValue = event.target.id.split("-")[1];
            if(this.state.selectedItmes.indexOf(keyValue) >= 0) {
                const newList = [];
                this.state.selectedItmes.map((id) => {
                    if(keyValue !== id) {
                        newList.push(id);
                    }
                });
                this.setState({selectedItmes: newList});
            }
        }
    }
    render() {
        const linkDisabled = "linkDisabled";
        const linkEnabled = "linkEnabled";
        let pageSize = this.state.pageSize;
        if(this.props.pageSize !== undefined) {
            pageSize = this.props.pageSize;
        }
        return(
            <div id={this.props.id}>
                <table className="grid-table">
                    <thead>
                        <th className="grid-title" colSpan={this.props.headers.length+1}>{this.props.title}</th>
                    </thead>
                    <tbody>
                        <tr className="grid-headers">
                            <td style={{width: "4px"}} id="td-checkbox-all">
                                <input 
                                    id={"checkbox-all"}
                                    type="checkbox"
                                    onClick={event=>this.onSelectAll(event)}
                                />
                            </td>
                            {this.props.headers && this.props.headers.map((obj) => 
                            <td>
                            {obj.value}
                            </td>
                        )}
                        </tr>
                        {this.props.data && this.props.data.map((dataObj) => 
                            <tr className="grid-data">
                                <td style={{width: "4px"}} id={"td-checkbox-"+dataObj[""+this.props.keyValue+""]}>
                                    <input 
                                        id={"checkbox-"+dataObj[""+this.props.keyValue+""]}
                                        type="checkbox"
                                        onClick={event=>this.onSelectItem(event)}
                                    />
                                </td>
                                {this.props.headers && this.props.headers.map((obj) => 
                                    <td 
                                        className={obj.link !== undefined && obj.link === true ? linkEnabled : linkDisabled}
                                        id={obj.key+"-"+dataObj[""+this.props.keyValue+""]}
                                    >
                                    {
                                        obj.link !== undefined && obj.link === true && (<span onClick={event=>this.props.linkFn(event, dataObj[""+this.props.keyValue+""])}>{dataObj[""+obj.key+""]}</span>)
                                    }
                                    {
                                        obj.link === undefined && (<span>{dataObj[""+obj.key+""]}</span> )                                      
                                    }
                                    </td>
                                )}
                            </tr>
                        )}
                        {this.props.pagination !== undefined && this.props.pagination === true && (
                            <tr>
                                <td className="pagination-td" colSpan={this.props.headers.length+1}>
                                    <span className="left">Page Size: <input style={{width: "25px"}} type="text" value={pageSize} onChange={event=>this.setState({pageSize: event.target.value})} />
                                    </span> 
                                    <span className="right">
                                        <span className="jump-page">First</span> 
                                        <span className="change-page">Prev</span> 
                                        <span className="change-page">Next</span>
                                        <span className="jump-page">Last</span>
                                    </span>
                                </td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}
export default AmsGrid;