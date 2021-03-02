import { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    }
    this.changeHandler = this.changeHandler.bind(this)
  }
  static getDerivedStateFromProps(props, prevState) {
    return {
      name: props.name
    }
  }

  changeHandler(e) {
    this.setState({name: e.target.value});
    this.props.fileNameHandler(e.target.value);
  }

  render() { 
    return (
      <div className="header">
        <h1 className="branding">Marked</h1>
        <input type="text" className="setName" value={this.state.name} onChange={this.changeHandler} />
        <div className="actions">
          {/*<div className="action" ><i className="far fa-folder"></i></div>*/}
          <div className="action" onClick={this.props.saveHandler}><i className="far fa-save"></i></div>
          {/*<div className="action"><i className="far fa-arrow-alt-circle-down"></i></div>
          <div className="action"><i className="fas fa-adjust"></i></div>
          <div className="action"><i className="far fa-eye"></i></div>*/}
          <div className="action" onClick={this.props.closeHandler}><i className="far fa-times-circle"></i></div>
        </div>
      </div>
    );
  }
}
 
export default Menu;