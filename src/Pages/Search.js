import React, { useState } from "react";
import NavBar from '../components/NavBar';
import Header from '../components/Header';

// Function for the SearchPage
const SearchPage = () => {
    // State to manage the search query
    const [query, setQuery] = useState('');
    // State to store the search results from API
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null); // Track currently selected for playing

    // Function to handle the search operation
    const handleSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        // Make a GET request to the API using fetch
        fetch(`https://spotify23.p.rapidapi.com/search?q=${encodeURIComponent(query)}&type=track&limit=100`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '3509af7823msha08596116c3770ap1b2ab7jsna490778b83c0',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com',
                'useQueryString': true
            }
        })
        .then(response => {
            // Check if the response status is ok
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON data from the response
            return response.json();
        })
        .then(data => {
            // Update the state with the search results
            console.log('API Response:', data);
            setSearchResults(data.tracks.items || []);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch operation
            console.error('Error searching:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    // Function to handle playing and pausing tracks when clicked
    const handlePlayTrack = (previewUrl) => {
        if (currentTrack === previewUrl) {
            // If the same track is clicked again, pause it
            setCurrentTrack(null);
        } else {
            // Otherwise, play the track
            setCurrentTrack(previewUrl);
        }
    };

    return (
        <div>
            <NavBar/> 
            {/* Heading for the search page */}
            <Header/>
            <h3 style={{ marginBottom: '60px', textAlign: 'center' }}>Search Page</h3>
            {/* Form to enter the search query */}
            <div className="form">
                <form onSubmit={handleSearch} style={{ marginBottom: '10px'}}>
                    <input 
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search for artists, albums, tracks"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            {loading && <p>Loading...</p>}
            {/* Display search results */}
            <div className="music-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 1fr))', gridAutoRows: 'minmax(10px, auto)', gap: '30px' }}>
                {/* Iterate over the search results and render each result */}
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <div key={index} style={{ backgroundColor: '#f9f9f9', padding: '9px', borderRadius: '3px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
                            {/* Render each search result */}
                            <img src={result.data.albumOfTrack.coverArt.sources[0].url} alt="Album Cover" style={{ width: '100%', height: 'auto' }} />
                            <p style={{ margin: '5px 0' }}>Name: {result.data.name}</p>
                            <p style={{ margin: '5px 0' }}>Artist: {result.data.artists.items[0].profile.name}</p>
                            <p style={{ margin: '5px 0' }}>Album: {result.data.albumOfTrack.name}</p>
                            {/* Add click event to play the track */}
                            <button onClick={() => handlePlayTrack(result.data.preview_url)}>Play</button>
                        </div>
                    )) 
                ) : (
                    <p>No results found.</p>
                )}
            </div>
            {/* Render audio player for the currently selected track */}
            {currentTrack && (
                <audio controls autoPlay>
                    <source src={currentTrack} type="audio/mpeg" />
                </audio>
            )}
        </div>
    );
};

export default SearchPage;
