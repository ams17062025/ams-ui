import { Component } from "react";

class AmsInput extends Component {
    render() {
        return (
            <div style={{ marginBottom: "10px" }}>
                <label
                    For={this.props.id}
                    style={{ marginRight: "10px", width: "100px" }}
                >
                    {this.props.label}:
                </label>
                <input
                    type="text"
                    id={this.props.id}
                    name={this.props.name}
                    description={this.props.description}
                    onChange={this.props.onChange}
                    required
                />
            </div>
        );
    }
}

export default AmsInput;
