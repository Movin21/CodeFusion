import React from "react";
import { useState } from 'react';

import './uniqueBatch.css'
import ProgressBar from './ProgressBar';

const UniqueBadge = () => {
  const [imageUrlBronze, setImageUrlBronze] = useState('');
  const [imageUrlSilver, setImageUrlSilver] = useState('');
  const [imageUrlGold, setImageUrlGold] = useState('');
  const [imageUrlCrystal, setImageUrlCrystal] = useState('');
  const [imageUrlChampion, setImageUrlChampion] = useState('');
  const [imageUrlTitan, setImageUrlTitan] = useState('');

  const [error, setError] = useState(null);

  return (
    <div>
     
      <ProgressBar setImageUrlBronze={setImageUrlBronze} setImageUrlSilver={setImageUrlSilver} setImageUrlGold={setImageUrlGold} setImageUrlCrystal={setImageUrlCrystal} setImageUrlChampion={setImageUrlChampion} setImageUrlTitan={setImageUrlTitan} />
      <h1>Badge Generator</h1>
      {imageUrlBronze && (
        <img
          width="100"
          height="100"
          src={imageUrlBronze}
          alt="Bronze Medal"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '20px'
          }}
          onError={(e) => {
            console.error('Image loading error:', (e.currentTarget as HTMLImageElement).src, e);
          }}
        />
      )}
      {imageUrlSilver && (
        <img
          width="100"
          height="100"
          src={imageUrlSilver}
          alt="Silver Medal"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '20px'
          }}
          onError={(e) => {
            console.error('Image loading error:', (e.currentTarget as HTMLImageElement).src, e);
          }}
        />
      )}
      {imageUrlGold && (
        <img
          width="100"
          height="100"
          src={imageUrlGold}
          alt="Gold Medal"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '20px'
          }}
          onError={(e) => {
            console.error('Image loading error:', (e.currentTarget as HTMLImageElement).src, e);
          }}
        />
      )}
      {imageUrlCrystal && (
        <img
          width="100"
          height="100"
          src={imageUrlCrystal}
          alt="Crystal Medal"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '20px'
          }}
          onError={(e) => {
            console.error('Image loading error:', (e.currentTarget as HTMLImageElement).src, e);
          }}
        />
      )}
      {imageUrlChampion && (
        <img
          width="100"
          height="100"
          src={imageUrlChampion}
          alt="Champion Medal"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '20px'
          }}
          onError={(e) => {
            console.error('Image loading error:', (e.currentTarget as HTMLImageElement).src, e);
          }}
        />
      )}
      {imageUrlTitan && (
        <img
          width="100"
          height="100"
          src={imageUrlTitan}
          alt="Titan Medal"
          style={{
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            console.error('Image loading error:', (e.currentTarget as HTMLImageElement).src, e);
          }}
        />
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default UniqueBadge;

