import React, { Component } from "react";

const LoaderHOC = WrappedComponent => {
  return class LoaderHOC extends Component {
    isLoading = props => {
      return (props.data && props.data.length < 1)
        ? true
        : false;
    };
    
    render() {
      // console.log(this.props);
      return this.isLoading(this.props) ? (
        <div style={{paddingLeft: '40%'}}><img alt="Loading..." src="https://freepreloaders.com/wp-content/uploads/2019/05/index.rotate-pie-preloader-gif.svg"/></div>
      ) : (
        <WrappedComponent {...this.props}/>
      );
    }
  };
};

export default LoaderHOC;