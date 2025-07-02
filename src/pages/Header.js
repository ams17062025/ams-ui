import { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import Message from "../components/Message";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div style={{backgroundColor: "#f9f3f3", marginTop: "10px"}}>                
                <div>
                    <span className="ams-logo">AMS</span>
                </div>
                <div style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px"}}>                    
                    <nav>
                        <table className="menu-cls">
                            <tr>
                                <td><Link to="/">Home</Link></td>
                                <td><Link to="/codelist">CodeList</Link></td>
                                <td><Link to="/users">Users</Link></td>
                            </tr>
                        </table>                       
                    </nav>
                </div>                 
                <Message />
                <Outlet />
            </div>
        )
    }
}
export default Header;