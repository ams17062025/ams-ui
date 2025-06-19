import { Component } from "react";

class AmsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
                <table className="grid-table">
                    <thead>
                        <th className="grid-title" colSpan={this.props.headers.length}>{this.props.title}</th>
                    </thead>
                    <tbody>
                        <tr className="grid-headers">
                            {this.props.headers && this.props.headers.map((obj) => 
                            <td>
                            {obj.value}
                            </td>
                        )}
                        </tr>
                        {this.props.data && this.props.data.map((dataObj) => 
                            <tr className="grid-data">
                                {this.props.headers && this.props.headers.map((obj) => 
                                    <td>
                                    {dataObj[""+obj.key+""]}
                                    </td>
                                )}
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}
export default AmsGrid;