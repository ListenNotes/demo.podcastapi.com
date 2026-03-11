import React, {useState} from 'react';
import axios from 'axios';
import poweredByImage from './assets/powered_by_listennotes.png';

const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_ROOT_URL || '';
const RESULTS_PER_PAGE = 10;
const SKELETON_CARD_COUNT = 3;

function buildSearchUrl({query, sortByDate, type, offset}) {
  const params = new URLSearchParams({
    q: query,
    sort_by_date: sortByDate,
    type,
  });
  if (offset !== undefined && offset !== null) {
    params.set('offset', `${offset}`);
  }
  return `${BACKEND_ROOT_URL}/api/search/?${params.toString()}`;
}

function getErrorMessage(error) {
  const status = error?.response?.status;
  switch (status) {
    case 401:
      return 'Wrong API key. Get a valid API key from Listen Notes pricing.';
    case 429:
      return 'You have reached your monthly quota limit.';
    default:
      return 'Unable to fetch results right now. Please try again.';
  }
}

function formatDuration(seconds) {
  if (!seconds || Number.isNaN(seconds)) {
    return null;
  }
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

function CardMedia({thumbnail, title}) {
  if (thumbnail) {
    return <img className="result-thumbnail" alt={title} src={thumbnail}/>;
  }
  return (
    <div className="result-thumbnail-placeholder" aria-hidden="true">
      {title ? title.charAt(0).toUpperCase() : 'P'}
    </div>
  );
}

function EpisodeCard({data}) {
  const itunesUrl = `https://itunes.apple.com/us/podcast/id${data.itunes_id}`;
  const audioLength = formatDuration(data.audio_length);
  return (
    <article className="result-card">
      <a
        className="result-title"
        href={data.listennotes_url}
        target="_blank"
        rel="noopener noreferrer"
        dangerouslySetInnerHTML={{__html: data.title_highlighted}}
      />
      <div className="result-creator-row">
        <CardMedia thumbnail={data.thumbnail} title={data.title_original || data.title_highlighted}/>
        <div className="result-creator-copy">
          <p className="result-subtitle" dangerouslySetInnerHTML={{__html: data.podcast_title_highlighted}}/>
          <p className="result-meta">
            <span>By </span>
            <span dangerouslySetInnerHTML={{__html: data.podcast.publisher_highlighted}}/>
          </p>
          {audioLength && <p className="result-meta">Length: {audioLength}</p>}
        </div>
      </div>
      <p className="result-description" dangerouslySetInnerHTML={{__html: data.description_highlighted}}/>
      <audio className="result-audio" controls>
        <source src={data.audio} type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
      <div className="result-links">
        <a href={data.audio}>Audio</a>
        <a href={itunesUrl} target="_blank" rel="noopener noreferrer">iTunes</a>
      </div>
    </article>
  );
}

function PodcastCard({data}) {
  const itunesUrl = `https://itunes.apple.com/us/podcast/id${data.itunes_id}`;
  return (
    <article className="result-card">
      <a
        className="result-title"
        href={data.listennotes_url}
        target="_blank"
        rel="noopener noreferrer"
        dangerouslySetInnerHTML={{__html: data.title_highlighted}}
      />
      <div className="result-creator-row">
        <CardMedia thumbnail={data.thumbnail} title={data.title_original || data.title_highlighted}/>
        <div className="result-creator-copy">
          <p className="result-meta">
            <span>By </span>
            <span dangerouslySetInnerHTML={{__html: data.publisher_highlighted}}/>
          </p>
        </div>
      </div>
      <p className="result-description" dangerouslySetInnerHTML={{__html: data.description_highlighted}}/>
      <div className="result-links">
        <a href={itunesUrl} target="_blank" rel="noopener noreferrer">iTunes</a>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <article className="result-card skeleton-card" aria-hidden="true">
      <div className="skeleton-line skeleton-title"/>
      <div className="skeleton-creator">
        <div className="skeleton-avatar"/>
        <div className="skeleton-stack">
          <div className="skeleton-line"/>
          <div className="skeleton-line skeleton-line-short"/>
        </div>
      </div>
      <div className="skeleton-line"/>
      <div className="skeleton-line"/>
      <div className="skeleton-line skeleton-line-short"/>
      <div className="skeleton-audio"/>
    </article>
  );
}

function App() {
  const [search, setSearch] = useState('star wars');
  const [data, setData] = useState({});
  const [sortByDate, setSortByDate] = useState('0');
  const [searchType, setSearchType] = useState('episode');
  const [resultType, setResultType] = useState('episode');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = async (offset = null) => {
    const requestUrl = buildSearchUrl({
      query: search,
      sortByDate,
      type: searchType,
      offset,
    });

    setIsLoading(true);
    setErrorMessage(null);
    setHasSearched(true);

    try {
      const response = await axios.get(requestUrl);
      setData(response.data);
      setResultType(searchType);
    } catch (error) {
      setData({});
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    runSearch();
  };

  const handlePage = () => {
    if (data?.next_offset === undefined) {
      return;
    }
    runSearch(data.next_offset);
  };

  const hasResults = Boolean(data?.results?.length);
  const total = Number(data?.total || 0);
  const nextOffset = Number(data?.next_offset || 0);
  const hasNextPage = hasResults && nextOffset > 0 && nextOffset < total;
  const nextPageNumber = Math.max(1, Math.floor(nextOffset / RESULTS_PER_PAGE) + 1);
  const totalPages = Math.max(1, Math.ceil(total / RESULTS_PER_PAGE));

  let resultElements = null;
  if (!isLoading && hasResults) {
    resultElements = data.results.map(item => {
      if (resultType === 'episode') {
        return <EpisodeCard key={item.id} data={item}/>;
      }
      return <PodcastCard key={item.id} data={item}/>;
    });
  }

  return (
    <div className="app-shell">
      <main className="app-main">
        <header className="hero">
          <p className="hero-kicker">
            <a href="https://www.listennotes.com/api/" target="_blank"><b>Listen Notes</b></a> x <a href="https://pages.cloudflare.com/" target="_blank"><b>Cloudflare Pages</b></a>
          </p>
          <h1 className="hero-title">Podcast Search API Demo</h1>
          <p className="hero-subtitle">
            Search millions of podcasts and hundreds of millions of episodes.
          </p>
        </header>

        <div className="hero-cta-row">
          <a
            className="hero-cta hero-cta-primary"
            href="https://www.listennotes.com/api/pricing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get API key for free
          </a>
          <a
            className="hero-cta hero-cta-secondary"
            href="https://www.listennotes.com/api/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Docs
          </a>
        </div>

        {data?.from_mock_server && (
          <div className="notice-banner">
            Results are from the <a href="https://www.listennotes.help/article/48-how-to-test-the-podcast-api-without-an-api-key" target="_blank" rel="noopener noreferrer">API mock server</a>. To fetch real data, <a href="https://www.listennotes.com/api/pricing/">get an API key</a> and set
            {' '}
            <code>LISTEN_API_KEY</code>.
          </div>
        )}

        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-row">
            <input
              className="search-input"
              onChange={event => setSearch(event.target.value)}
              type="text"
              placeholder="Try: this american life"
              value={search}
              disabled={isLoading}
            />
            <button className="search-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="controls-row">
            <div className="type-toggle">
              <label className="type-option" htmlFor="episodeButton">
                <input
                  type="radio"
                  value="episode"
                  id="episodeButton"
                  name="type"
                  checked={searchType === 'episode'}
                  onChange={event => setSearchType(event.target.value)}
                />
                <span>Episodes</span>
              </label>
              <label className="type-option" htmlFor="podcastButton">
                <input
                  type="radio"
                  value="podcast"
                  id="podcastButton"
                  name="type"
                  checked={searchType === 'podcast'}
                  onChange={event => setSearchType(event.target.value)}
                />
                <span>Podcasts</span>
              </label>
            </div>

            <label className="sort-control" htmlFor="sortByDate">
              Sort by
              <select
                id="sortByDate"
                className="sort-select"
                value={sortByDate}
                onChange={event => setSortByDate(event.target.value)}
              >
                <option value="0">Relevance</option>
                <option value="1">Date</option>
              </select>
            </label>
          </div>
        </form>

        {errorMessage && <p className="error-banner">An error occurred: {errorMessage}</p>}

        <section className="results-list">
          {isLoading && Array.from({length: SKELETON_CARD_COUNT}, (_, index) => <SkeletonCard key={index}/>)}
          {resultElements}
          {!isLoading && hasSearched && !errorMessage && !hasResults && (
            <div className="empty-state">
              No results found. Try a broader phrase or switch between episodes and podcasts.
            </div>
          )}
        </section>

        {hasNextPage && !isLoading && (
          <div className="pagination-wrap">
            <button className="next-button" type="button" onClick={handlePage}>
              Next page ({nextPageNumber} of {totalPages})
            </button>
          </div>
        )}

        <footer className="app-footer">
          <a href="https://github.com/ListenNotes/demo.podcastapi.com" className="source-link">
            Source code on GitHub
          </a>
          <a href="https://www.listennotes.com/api/" target="_blank" rel="noopener noreferrer">
            <img alt="Powered by Listen Notes" src={poweredByImage}/>
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
