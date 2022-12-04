
import React from "react";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { createPdfFromHtml } from "./Logic";


export class PrintPage extends React.Component {
  printContent;
  render() {
    return (
      <>
        <Global />
        <button onClick={this.handleClick}>print</button>
        <div id="print" className="A4">
          <Sheet />
          <div style={{ position: "fixed", top: "200vh" }}>
            <div
              ref={el => {
                this.printContent = el;
              }}
            >
              <Sheet />
            </div>
          </div>
        </div>
      </>
    );
  }

  handleClick = () => {
    createPdfFromHtml(this.printContent);
  };
}

const Sheet = () => {
  return (
    <div className="sheet padding-10mm">
      <div>日本語対応</div>
      <div>japanese ok</div>
    </div>
  );
};
