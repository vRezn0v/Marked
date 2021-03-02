import { Component } from "react";

/*
Fires: [Edit Name, Save, Export, Import, Theme Toggle, View Toggle]
*/

class Menu extends Component {
  render() { 
    return (
      <div className="header">
        <h1 className="branding">Marked</h1>
        <input type="text" className="setName"/>
        <div className="actions">
          <div className="action">Open</div>
          <div className="action">Save</div>
          <div className="action">Export</div>
          <div className="action">Toggle Theme</div>
          <div className="action">Toggle View</div>
          <div className="action">Close File</div>
        </div>
      </div>
    );
  }
}
 
export default Menu;