import { Component } from 'react';
import Menu from './Components/Menu';
import Editor from './Components/Editor';
import Preview from './Components/Preview';
import ls from 'local-storage';

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
      filename: 'untitled',
      theme: "DARK",
      view: "DUAL",
      raw: ""
    }
    this.rawInputHandler = this.rawInputHandler.bind(this)
    this.saveToStore = this.saveToStore.bind(this)
    this.fileNameHandler = this.fileNameHandler.bind(this)
    this.saveToStore = this.saveToStore.bind(this)
    this.closeFileHandler = this.closeFileHandler.bind(this)
    this.titleUpdate = this.titleUpdate.bind(this)
  }

  componentDidMount() {
    var {filename, raw} = ls.get('marked-data')
    this.setState({
      filename: filename,
      raw: raw
    }, this.titleUpdate)
  }

  titleUpdate() {
    document.title = "Marked - " + this.state.filename
  }

  rawInputHandler(input) {
    this.setState({raw: input})
  }

  fileNameHandler(name) {
    this.setState({filename: name}, this.titleUpdate)
  }

  saveToStore() {
    var stateData = {
      filename: this.state.filename,
      raw: this.state.raw
    }
    ls.set('marked-data', stateData)
  }

  closeFileHandler() {
    this.setState({
      filename: 'untitled',
      raw: ""
    }, this.saveToStore)
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
        <Menu className="header" name={this.state.filename} fileNameHandler={this.fileNameHandler} saveHandler={this.saveToStore} closeHandler={this.closeFileHandler} />
        <div className="display">
          <Editor text={this.state.raw} handler={this.rawInputHandler} />
          <Preview text={this.state.raw} />
        </div>
      </div>
    );
  }
}
 
export default Marked;
