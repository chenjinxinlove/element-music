import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Layout extends Component {
  render() {
    return (
      <div>
        <div style={{
          height: 'calc(100vh - 100px)',
          overflow: 'hidden',
          overflowY: 'auto',
          background: `rgba(255,255,255,.8)`
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}