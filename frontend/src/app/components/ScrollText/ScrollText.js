import React, { PureComponent } from "react";
import './ScrollText.css'
const ScrollTextDiv = "IMPORTANT:  ";
const ScrollTextBase = "Heavy floods in rajanpur and nearby areas luasda dasdasd dasdasd";

const num = 2;

export default class ScrollText extends PureComponent {
  render() {
    var content = [];
    for (var i = 0; i < num; i++) {
      content.push(
        <p key={2 * i} className="scroll-text">
          {ScrollTextBase}
        </p>
      );
      content.push(
        <p key={2 * i + 1} className="scroll-text-div">
          {ScrollTextDiv}
        </p>
      );
    }
    return <div className="scroll-text-row">{content}</div>;
  }
}
