import React, { Component } from 'react';
import '../../css/dgrid.css'

export default class DGrid extends Component {
  render() {
    return (
      <div>
        <div className="grid">
          <div className="item">
            <div className="item-content">
    
              This can be anything.

              </div>
          </div>

          <div className="item">
            <div className="item-content">
 
              <div className="my-custom-content">
                Yippee!
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}