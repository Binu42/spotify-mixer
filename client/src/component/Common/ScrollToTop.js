import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });  // For Chrome, Firefox, IE and Opera
      document.body.scrollTo({ top: 0, behavior: 'smooth' });  // For Safari
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);