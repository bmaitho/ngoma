import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import './Library.css';
const Library= () => {
   
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlistUrl = 'https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '3509af7823msha08596116c3770ap1b2ab7jsna490778b83c0',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };
            try {
                const response = await fetch(playlistUrl, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Received playlists:', data); // Log the received data
                setItems(data.items || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };
        fetchPlaylists();
    }, []);

    return (
        <div>
            <NavBar/> 
        
            <Header/>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="playlist-container">
                    {items.map((item, index) => (
                        <div key={index} className="playlist-card">
                            <h3>{item.track.name}</h3>
                            <p>Added At: {item.added_at}</p>
                            <p>Added By: {item.added_by.type}</p>                           
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Library;