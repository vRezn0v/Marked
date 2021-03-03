import { Component } from 'react';
import Menu from './Components/Menu';
import Editor from './Components/Editor';
import Preview from './Components/Preview';
import ls from 'local-storage';
import Status from './Components/Status';

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
      viewClass: "",
      raw: "",
      wc: ""
    }
    this.rawInputHandler = this.rawInputHandler.bind(this)
    this.saveToStore = this.saveToStore.bind(this)
    this.fileNameHandler = this.fileNameHandler.bind(this)
    this.saveToStore = this.saveToStore.bind(this)
    this.closeFileHandler = this.closeFileHandler.bind(this)
    this.titleUpdate = this.titleUpdate.bind(this)
    this.saveShortcutHandler = this.saveShortcutHandler.bind(this)
    this.displayHandler = this.displayHandler.bind(this)
    this.wordCount = this.wordCount.bind(this)
  }

  componentDidMount() {
    var {filename, raw} = ls.get('marked-data') || { filename: "untitled", raw: ""}
    this.setState({
      filename: filename,
      raw: raw
    }, () => {
      this.titleUpdate()
      this.wordCount()
    })
  }

  titleUpdate() {
    document.title = "Marked - " + this.state.filename
  }

  rawInputHandler(input) {
    this.setState({raw: input}, this.wordCount)
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


  displayHandler() {
    var displays = {
      'DUAL': '',
      'EDITOR': 'editoronly',
      'PREVIEW': 'previewonly'
    }
    if (this.state.view==='DUAL')
      this.setState({view: 'EDITOR', viewClass: displays.EDITOR})
    else if (this.state.view==='EDITOR')
      this.setState({view: 'PREVIEW', viewClass: displays.PREVIEW})
    else
      this.setState({view: 'DUAL', viewClass: displays.DUAL})
  }

  setProperty(property, value) {
    switch (property) {
      case 'theme':
        this.setState({theme: value})
        break
      case 'view':
        this.setState({view: value})
        break
      case 'viewClass':
        this.setState({viewClass: value})
        break
      default:
        break
    }
  }

  saveShortcutHandler(e) {
    if (!(e.key === 's' && e.ctrlKey) && !(e.key === 'DC3')) return true;
    e.preventDefault()
    console.log("Intercepted")
    this.saveToStore()
    //send toast
  }

  wordCount() {
    var md = this.state.raw;
    md = md.split('');
    md = md.filter(e => e!=='#'&&e!=='*'&&e!=='-'&&e!=='_'&&e!=='|').join('')
    md = md.split('\n');
    var out = [];
    md.forEach(e => {
      e.split(" ").filter(e => e !== '').forEach(e => 
        out.push(e))
    })
    
    this.setState({wc: out.length});
  }

  render() {  
    return (
      <div className="marked" onKeyDown={this.saveShortcutHandler}>
        <Menu className="header" name={this.state.filename} fileNameHandler={this.fileNameHandler} saveHandler={this.saveToStore} closeHandler={this.closeFileHandler} displayHandler={this.displayHandler} />
        <div className={`display ${this.state.viewClass}`}>
          <Editor text={this.state.raw} handler={this.rawInputHandler} />
          <Preview text={this.state.raw} />
        </div>
        <Status wc={this.state.wc} displaymode={this.state.view} theme={this.state.theme} className="footer" />
      </div>
    );
  }
}
 
export default Marked;
