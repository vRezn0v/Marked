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
 * rendered text
 * viewstate
 */

 /**
  * Handlers
  * Theme
  * TextChange -> Render
  * Load from store
  * Save to store
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
      raw: '',
      rendered: '' 
    }
  }

  renderToMarkdown() {
    // take raw from state and render
  }
  
  componentDidMount() {
    // load and init render
  }

  rawInputHandler(input) {
    // set raw text to state and init render
  }

  render() { 
    return (
      <div className="marked">
        <Menu />
        <Editor />
        <Preview />
      </div>
    );
  }
}
 
export default Marked;
