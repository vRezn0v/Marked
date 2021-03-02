import { Component } from 'react';
import Menu from './Components/Menu';
import Editor from './Components/Editor';
import Preview from './Components/Preview';

/* Features
Input
Output
Themer
Clipboard Service
Import/Export/Persist
*/

/**
 * State
 * themestate
 * filename .md
 * input
 * viewstate
 */

 /**
  * Handlers
  * Theme
  * TextChange -> Render
  * Load from store > didmount
  * Save to store > with updateState
  * Export
  * Close(reset) Handler
  * Filename Change Handler
  */

class Marked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: 'Welcome',
      theme: "DARK",
      view: "DUAL",
      raw: ""
    }
    this.rawInputHandler = this.rawInputHandler.bind(this);
  }

  componentDidMount() {
    // load and init render
  }

  rawInputHandler(input) {
    // set raw text to state and init render
    this.setState({raw: input});
  }

  setProperty(property, value) {
    switch (property) {
      case 'theme':
        this.setState({theme: value})
        break
      case 'view':
        this.setState({view: value})
        break
      default:
        break
    }
  }

  render() { 
    return (
      <div className="marked">
        <Menu />
        <Editor text={this.state.raw} handler={this.rawInputHandler} />
        <Preview text={this.state.raw} />
      </div>
    );
  }
}
 
export default Marked;
