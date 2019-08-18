import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class AutoComplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  }

  static defaultProps = {
    suggestions: []
  }

  constructor(props) {
    super(props)
    this.state = {
      // what the user has entered
      userInput: "",
      // the active selection's index
      activeSuggestion: 0,
      // the suggestions that match the user's input
      filteredSuggestions: [],
      // whether or not the suggestion list is shown
      showSuggestions: false
    }
  }

  // event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props
    const userInput = e.currentTarget.value

    // filter our suggestions that contain the user's input
    const filteredSuggestions = suggestions.filter( suggestion => (
      suggestion.toLowerCase().indexOf(userInput) > -1
    ))

    // update the user input and filtered suggestions, reset the suggestions and make sure the suggestions are shown
    this.setState({
      userInput,
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true
    })
  }

  // event fired when the user presses a key down
  onKeyDown = e => {
    const { filteredSuggestions, activeSuggestion } = this.state
    
    // user pressed the enter key, update the input and close the suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        userInput: filteredSuggestions[activeSuggestion],
        showSuggestions: false
      })
    }
    // user pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return

      this.setState({
        activeSuggestion: activeSuggestion - 1
      })
    }
    // user pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) return

      this.setState({
        activeSuggestion: activeSuggestion + 1
      })
    }
  }

  // event fired when the user clicks on a suggestion
  onClick = e => {
    // update the user input and reset the rest of the state
    this.setState({
      userInput: e.currentTarget.innerText,
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false
    })
  }

  render() {
    const { 
      onChange,
      onClick,
      onKeyDown,
      state: {
        userInput, 
        showSuggestions, 
        filteredSuggestions,
        activeSuggestion 
      }
    } = this

    let suggestionsListComponent

    if (showSuggestions && userInput) {

      if (filteredSuggestions.length) {

        suggestionsListComponent = 
        <ul className="suggestions">

          {filteredSuggestions.map( (suggestion, index) => {

            let className

            // flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active"
            }

            return (
              <li 
                key={suggestion}
                className={className}
                onClick={onClick}
              >
                {suggestion}
              </li>
            )

          })}

        </ul>

      } else {

        suggestionsListComponent = 
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>

      }

    }
    

    return (
      <Fragment>
        <input
          type="text"
          value={userInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {suggestionsListComponent}
      </Fragment>
    )
  }
}

export default AutoComplete