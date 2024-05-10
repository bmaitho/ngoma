import React from 'react';
import './Home.css'; 
import Header from '../components/Header';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <div className='home'>
      <Header />
      <NavBar />
      <h2>Home</h2>
      <h3>Welcome to the symphony of your digital world! Tune into your favorite beats, discover new rhythms, and let the melody of our music app accompany every step of your journey. Let the harmony of sound elevate your mood and transport you to new musical horizons. Dive in, explore, and let the music play!</h3>
    </div>
  );
}
