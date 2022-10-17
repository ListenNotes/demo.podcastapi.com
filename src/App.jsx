import React, {Component} from 'react';
import axios from 'axios';
import poweredByImage from './assets/powered_by_listennotes.png';

const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_ROOT_URL || ''
const RESULTS_PER_PAGE = 10

class EpisodeResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.data.title_highlighted,
      podcastTitle: this.props.data.podcast_title_highlighted,
      publisher: this.props.data.podcast.publisher_highlighted,
      thumbnail: this.props.data.thumbnail,
      audio: this.props.data.audio,
      audioLength: this.props.data.audio_length,
      listennotesUrl: this.props.data.listennotes_url,
      itunesId: this.props.data.itunes_id,
      description: this.props.data.description_highlighted
    }
  }

  render() {
    const itunesUrl = `https://itunes.apple.com/us/podcast/id${this.state.itunesId}`
    return (
      <div className="search-result episode">
        <a className="search-result-title" rel="noopener noreferrer" target="_blank" href={this.state.listennotesUrl}
           dangerouslySetInnerHTML={{__html: this.state.title}}>
        </a>
        <div className="search-result-creator">
          <img className="search-result-creator-thumbnail" alt={this.state.title} src={this.state.thumbnail}/>
          <div className="search-result-creator-names">
            <p className="podcast-title" dangerouslySetInnerHTML={{__html: this.state.podcastTitle}}></p>
            <p className="publisher"><span>By </span><span
              dangerouslySetInnerHTML={{__html: this.state.publisher}}></span></p>
          </div>
        </div>
        <p className="search-result-description" dangerouslySetInnerHTML={{__html: this.state.description}}></p>
        <audio controls>
          <source src={this.state.audio} type="audio/mpeg"/>
          Your browser does not support the audio element.
        </audio>
        <div className="search-result-footer">
          <a href={this.state.audio}>Audio</a>
          <a rel="noopener noreferrer" target="_blank" href={itunesUrl}>iTunes</a>
        </div>
      </div>
    )
  }
}

class PodcastResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.data.title_highlighted,
      publisher: this.props.data.publisher_highlighted,
      thumbnail: this.props.data.thumbnail,
      listennotesUrl: this.props.data.listennotes_url,
      itunesId: this.props.data.itunes_id,
      description: this.props.data.description_highlighted
    }
  }

  render() {
    const itunesUrl = `https://itunes.apple.com/us/podcast/id${this.state.itunesId}`
    return (
      <div className="search-result podcast">
        <a className="search-result-title" rel="noopener noreferrer" target="_blank" href={this.state.listennotesUrl}
           dangerouslySetInnerHTML={{__html: this.state.title}}></a>
        <div className="search-result-creator">
          <img className="search-result-creator-thumbnail" alt={this.state.title} src={this.state.thumbnail}/>
          <div className="search-result-creator-names">
            <p className="publisher"><span>By </span><span
              dangerouslySetInnerHTML={{__html: this.state.publisher}}></span></p>
          </div>
        </div>
        <p className="search-result-description" dangerouslySetInnerHTML={{__html: this.state.description}}></p>
        <div className="search-result-footer">
          <a className="bottom-link" rel="noopener noreferrer" target="_blank" href={itunesUrl}>iTunes</a>
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      search: 'star wars',
      data: {},
      offset: 0,
      sortByDate: '0',
      searchType: 'episode',
      resultType: 'episode',
      errorMessage: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSortByChange = this.handleSortByChange.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.search = this.search.bind(this)
  }

  handleTypeChange(e) {
    const newValue = e.target.value
    this.setState(prevState => ({...prevState, searchType: newValue}))
  }

  search(requestUrl) {
    axios.get(requestUrl)
      .then(response => {
        this.setState(prevState => ({
          ...prevState,
          data: response.data,
          resultType: this.state.searchType,
          offset: 0,
          errorMessage: null,
        }))
      })
      .catch(error => {
        let errorMessage = '';
        switch (error.response.status) {
          case 401:
            errorMessage = 'Wrong API Key. Get a valid api key: https://www.listennotes.com/api/pricing/';
            break;
          case 429:
            errorMessage = 'You have reached your monthly quota limit.';
            break;
          default:
            errorMessage = 'Unknown error.';
            break;
        }
        this.setState(() => ({
          data: [],
          offset: 0,
          errorMessage,
        }));
      })
  }

  handlePage() {
    const requestUrl = `${BACKEND_ROOT_URL}/api/search/?q=${this.state.search}&sort_by_date=${this.state.sortByDate}&type=${this.state.searchType}&offset=${this.state.data.next_offset}`
    this.search(requestUrl)
  }

  handleSortByChange(e) {
    const newValue = e.target.value
    this.setState(prevState => ({...prevState, sortByDate: newValue}))
  }

  handleChange(e) {
    const newValue = e.target.value
    this.setState(prevState => ({...prevState, search: newValue}))
  }

  handleSubmit(e) {
    const requestUrl = `${BACKEND_ROOT_URL}/api/search/?q=${this.state.search}&sort_by_date=${this.state.sortByDate}&type=${this.state.searchType}`
    this.search(requestUrl)
    e.preventDefault();
  }

  render() {
    const resultElements = this.state.data.results ? this.state.data.results.map((d) => {
      if (this.state.resultType === 'episode') {
        return <EpisodeResult key={d.id} data={d}/>
      } else if (this.state.resultType === 'podcast') {
        return <PodcastResult key={d.id} data={d}/>
      } else {
        return null
      }
    }) : []
    const nextPageElement = (this.state.data.results && this.state.data.next_offset <= this.state.data.total - this.state.data.total % RESULTS_PER_PAGE) ? (
      <span onClick={() => this.handlePage()}>
        Next page ({this.state.data.next_offset / RESULTS_PER_PAGE + 1} of {(this.state.data.total / RESULTS_PER_PAGE + 1).toFixed()})
      </span>
    ) : null
    const errorOccurredMessage = this.state.errorMessage ? (<p className="text-red-500 font-bold">An error occurred: {this.state.errorMessage}</p>) : null
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Podcast API Demo</h1>
        </header>
        {this.state.data && this.state.data.from_mock_server && <div className="text-red-500 font-bold">
          Note: Results are from <a href="https://www.listennotes.help/article/48-how-to-test-the-podcast-api-without-an-api-key" target="_blank">api mock server</a>. To get real data, you need to <a href="https://www.listennotes.com/api/pricing/" target="_blank">get an API key</a> and set the environment variable LISTEN_API_KEY on <a href="https://developers.cloudflare.com/pages/platform/build-configuration/" target="_blank">Cloudflare Pages dashboard</a>.
        </div>}
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input className="search-form-text" onChange={this.handleChange} type="text" placeholder="This American Life"
                 value={this.state.search}/>
          <button className="search-form-submit" type="submit">
            Search
          </button>
          <div className="search-form-type">
          <span onChange={this.handleTypeChange}>
            <input type="radio" defaultChecked value="episode" id="episodeButton" name="type"/>
            <label htmlFor="episodeButton" className="ml-2">Episodes</label>
            <input type="radio" value="podcast" id="podcastButton" name="type" className="ml-4"/>
            <label htmlFor="podcastButton" className="ml-2">Podcasts</label>
          </span>
            <span>
          <select className="search-form-sort-by" onChange={this.handleSortByChange}>
            <option value="0">Relevance</option>
            <option value="1">Date</option>
          </select>
        </span>
          </div>
        </form>
        <div className="search-results">
          {errorOccurredMessage}
          {resultElements}
        </div>
        <div className="next-page">
          {nextPageElement}
        </div>
        <footer className="w-full flex justify-center items-center">
          <div className="mr-2">
            <a href="https://github.com/ListenNotes/demo.podcastapi.com" className="text-sm font-bold hover:opacity-50">
              Source code @ GitHub
            </a>
          </div>
          <div>
            <a href="https://www.listennotes.com/api/">
              <img alt="Powered by ListenNotes" src={poweredByImage}/>
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
