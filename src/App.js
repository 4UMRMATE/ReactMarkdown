import React from "react";
import "./App.css";
import "./ToolBar.css";

import marked from "marked";

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: placeholder,
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.markupButtons = this.markupButtons.bind(this);
  }

  handleChange(e) {
    this.setState({
      editorText: e.target.value,
      markdown: e.target.value,
    });
  }

  markupButtons(output) {
    return this.setState({
      editorText: `${this.state.editorText}${output}`,
      markdown: `${this.state.editorText}${output}`,
    });
  }

  handleClick(e) {
    let targetBtn = e.target.className;
    if (targetBtn === "fa fa-bold") {
      this.markupButtons(" **Bold**");
    } else if (targetBtn === "fa fa-italic") {
      this.markupButtons(" _Italic_");
    } else if (targetBtn === "fa fa-link") {
      this.markupButtons(" [Link](https://)");
    } else if (targetBtn === "fa fa-quote-left") {
      this.markupButtons("> Quote \n");
    } else if (targetBtn === "fa fa-code") {
      this.markupButtons("```Code```");
    } else if (targetBtn === "fa fa-image") {
      this.markupButtons("![Alt Text](http://)");
    } else if (targetBtn === "fa fa-list-ol") {
      this.markupButtons("1. List Item \n");
    } else if (targetBtn === "fa fa-list") {
      this.markupButtons("- List Item \n");
    }
  }

  render() {
    return (
      <div className="App">
        <div className="textField">
          <ToolBar clickHandler={this.handleClick} />
          <textarea
            id="editor"
            onChange={this.handleChange}
            value={this.state.editorText}
          ></textarea>
        </div>
        <div className="liveView">
          <header className="bar">
            <p>Preview</p>
          </header>
          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ToolBar" onClick={this.props.clickHandler}>
        <div className="main">
          <i title="Bold" className="fa fa-bold"></i>
          <i title="Italic" className="fa fa-italic"></i>
        </div>
        <div className="usefull">
          <i title="HyperLink" className="fa fa-link"></i>
          <i title="" className="fa fa-quote-left"></i>
          <i title="Code" className="fa fa-code"></i>
          <i title="Image" className="fa fa-image"></i>
        </div>
        <div className="lists">
          <i title="Numbered List" className="fa fa-list-ol"></i>
          <i title="Bulleted List" className="fa fa-list"></i>
        </div>
        <i className="expand"></i>
      </div>
    );
  }
}

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
      id="preview"
    />
  );
};

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

export default App;
