import { Component } from "react";

class AmsButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let typeCls = "ams-btn-active";
        if(this.props.type == "inactive") {
            typeCls = "ams-btn-inactive";
        }
        return(
            <div style={this.props.style}>
                <input className={typeCls} type="button" id={this.props.id} value={this.props.label} onClick ={this.props.callBack}/>
            </div>
        )
    }
}
export default AmsButton;