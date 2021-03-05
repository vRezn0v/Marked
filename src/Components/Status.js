import { Component } from 'react';

class Status extends Component {
  render() {
    var {wc, displaymode, theme} = this.props
    return (
      <div className="footer">
        <div><span>{wc} words</span> | <span>View: {displaymode} </span> | <span>Theme: {theme}</span></div>
      </div>
    );
  }
}
 
export default Status;