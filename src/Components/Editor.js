import { Component } from "react";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.inputHandler = this.inputHandler.bind(this);
  }

  static getDerivedStateFromProps(props, prevState) {
    return {
      input: props.text
    }
  }

  inputHandler(e) {
    console.log(e.target.value)
    this.setState({input: e.target.value});
    this.props.handler(e.target.value);
  }

  render() {  
    return (
      <textarea className="editor" onChange={this.inputHandler}  value={this.state.input}></textarea>
    );
  }
}
 
export default Editor;