import React from "react"
import localforage from "localforage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        hasError: false,
        errorMessage: '' 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
        errorMessage: 'Error: ' + error + ' Error Info: ' + errorInfo
    })
  }

  resetPageAndClearLocalStorage() {
    localforage.clear().then(function() {
      // Run this code once the database has been entirely deleted.
      console.log('Database is now empty.');
      location.reload()
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
  }

  render() {

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
            <h3>I'm so sorry! Something bad happened, a bug probably.</h3>
            <p>PLEASE send the following error message to hlotvonen@gmail.com and describe what you where doing when the error happened.</p>
            <hr/>
            <pre>{this.state.errorMessage}</pre>
            <hr/>
            <p>To continue and reset the app, click the following:</p>
            <br/>
            <button onClick={() => this.resetPageAndClearLocalStorage()}>Reset everything</button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary