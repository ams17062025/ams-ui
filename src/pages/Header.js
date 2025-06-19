import { Component } from "react";
import { Outlet, Link } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div style={{backgroundColor: "#f9f3f3", marginTop: "10px"}}>
                <div style={{float: "left", fontSize: "3em", fontFamily: "fantasy", color: "blueviolet", padding: "0px 10px 0px 10px"}}>AMS</div>
                <div style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px"}}>
                    <nav>
                        <table className="menu-cls">
                            <tr>
                                <td><Link to="/">Home</Link></td>
                                <td><Link to="/codelist">CodeList</Link></td>
                            </tr>
                        </table>
                    </nav>
                </div>
                <Outlet />
            </div>
        )
    }
}
export default Header;