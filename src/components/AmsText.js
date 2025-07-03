import { Component } from "react";
import AmsButton from "./AmsButton"; 


class AmsText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectedItem } = this.state;

        if (!selectedItem) {
            return <p>No details found.</p>;
        }

        return (
            <div style={{ padding: "20px" }}>
                <h2>Code Details</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{selectedItem.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Description:</strong></td>
                            <td>{selectedItem.description}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ marginTop: "20px" }}>
                    <AmsButton
                        id="back-button"
                        label="Back"
                        callBack={this.handleBack}
                        type="active"
                    />
                </div>
            </div>
        );
    }
}

export default AmsText;
