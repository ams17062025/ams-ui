import { Component } from "react";

class AmsInput extends Component {
    render() {
        return (
            <div className="ams-input-cmp" style={{ marginBottom: "10px" }}>
                <div className="input-label" style={{width: this.props.width, textAlign: "right"}}>
                    <span>{this.props.label} {this.props.required === true &&(
                        <span className="ams-required">*</span>
                    )} </span>
                </div>
                <div>
                    <input
                        type="text"
                        id={this.props.id}
                        name={this.props.name}
                        description={this.props.description}
                        onChange={this.props.onChange}
                    />
                    <span className="ams-required-error">{this.props.error}</span>
                    </div>
                
                
            </div>
        );
    }
}

export default AmsInput;
