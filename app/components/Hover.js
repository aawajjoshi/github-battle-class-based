import React from "react";

//render prop that has the hovering logic and expects to receive a children that is a function
//it invokes the function passing it the argument it needs
export default class Hover extends React.Component {
  state = { hovering: false }

  mouseOver = () => this.setState({ hovering: true });

  mouseOut = () => this.setState({ hovering: false });

  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
