import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.closeAction = this.closeAction.bind(this);
    }
    closeAction() {
        document.getElementById("myPopup").style.display = "none";
    }
    render() {
        return(
            <div class="popup">
                <span class="popuptext" id="myPopup">
                    <span id="messageContent">jskjdjek jeekj</span>
                    <span className='close-message-icon' onClick={event=>this.closeAction()}>X</span>
                </span>
            </div>
        )
    }
}
export default Message;