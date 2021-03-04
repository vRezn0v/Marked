import { createRef , Component } from 'react';
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
      view: "",
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
    this.exportFileAs = this.exportFileAs.bind(this)
    this.themeChange = this.themeChange.bind(this)


    this.previewRef = createRef()
    this.mdRef = createRef()
    this.htmlRef = createRef()
  }

  componentDidMount() {
    var {filename, raw, theme, view, viewClass} = ls.get('marked-data') || { filename: "untitled", raw: ""}
    this.setState({
      filename: filename,
      raw: raw,
      theme: theme,
      view: view,
      viewClass: viewClass
    }, () => {
      this.titleUpdate()
      this.wordCount()
      this.exportFileAs()
      if (this.state.theme===undefined) this.setState({theme: 'DARK'})
      if (this.state.view===undefined) this.setState({view: 'DUAL', viewClass: ''})
      this.setTheme()
    })
  }

  titleUpdate() {
    document.title = "Marked - " + this.state.filename
  }

  rawInputHandler(input) {
    this.setState({raw: input}, () => {
      this.wordCount()
      this.exportFileAs()
    })
  }

  fileNameHandler(name) {
    this.setState({filename: name}, () => {
      this.titleUpdate()
      this.exportFileAs()
    })
  }

  saveToStore() {
    var stateData = {
      filename: this.state.filename,
      raw: this.state.raw,
      view: this.state.view,
      viewClass: this.state.viewClass,
      theme: this.state.theme
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

  themeChange() {
    if (this.state.theme==='DARK')
      this.setState({theme: 'LIGHT'}, this.setTheme)
    else
      this.setState({theme: 'DARK'}, this.setTheme)
  }

  setTheme() {
    var target = document.getElementById('root')
    target.classList.remove(target.classList[0])
    target.classList.add(this.state.theme)
    console.log(target.classList)
  }

  saveShortcutHandler(e) {
    if (!(e.key === 's' && e.ctrlKey) && !(e.key === 'DC3')) return true;
    e.preventDefault()
    this.saveToStore()
    //send toast
  }

  exportFileAs() {
    if (this.state.wc!==0) {
      var dataUri
      var data
      data = this.state.raw
      dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
      this.mdRef.current.href = dataUri
      this.mdRef.current.download = this.state.filename + ".md"
      data = this.previewRef.current.innerHTML
      dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
      this.htmlRef.current.href = dataUri
      this.htmlRef.current.download = this.state.filename + ".html"
    } else {
      this.mdRef.current.href = "#"
      this.htmlRef.current.href = "#"
    }
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
        <Menu className="header" name={this.state.filename} fileNameHandler={this.fileNameHandler} saveHandler={this.saveToStore} closeHandler={this.closeFileHandler} displayHandler={this.displayHandler} themeChange={this.themeChange} refs={[this.mdRef, this.htmlRef]}/>
        <div className={`display ${this.state.viewClass}`}>
          <Editor text={this.state.raw} handler={this.rawInputHandler} />
          <Preview pref={this.previewRef} text={this.state.raw} />
        </div>
        <Status wc={this.state.wc} displaymode={this.state.view} theme={this.state.theme} className="footer" />
      </div>
    );
  }
}
 
export default Marked;
