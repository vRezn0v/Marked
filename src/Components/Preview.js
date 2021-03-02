import { Component } from 'react';
const ReactMarkdown = require('react-markdown')
const gfm = require('remark-gfm')


class Preview extends Component {
  render() { 
    const { text : markdown } = this.props;
    return (
        <ReactMarkdown plugins={[gfm]} source={markdown} className="preview" />
    );
  }
}
 
export default Preview;