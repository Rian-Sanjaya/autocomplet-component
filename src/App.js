import React from 'react';
import Autocomplete from './AutoComplete'
import "./style.css"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>React Autocomplete Demo</h1>
        <Autocomplete 
          suggestions = {[
            "Aku",
            "seorang",
            "kapiten",
            "mempunyai",
            "pedang",
            "panjang",
            "kalau",
            "berjalan",
            "prok prok prok"
          ]}
        />
      </div>
    );
  }
}

export default App;
