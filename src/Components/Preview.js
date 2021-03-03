import { Component } from 'react';
const ReactMarkdown = require('react-markdown')
const gfm = require('remark-gfm')


class Preview extends Component {
  render() { 
    const { text : markdown, pref } = this.props;
    return (
      <div className="preview" ref={pref}>
        <ReactMarkdown plugins={[gfm]} source={markdown} />
      </div>
    );
  }
}
 
export default Preview;