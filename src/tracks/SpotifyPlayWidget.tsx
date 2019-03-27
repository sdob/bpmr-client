import React from 'react';
import { Track } from "./types";

interface Props {
  track: Track;
}

export default function SpotifyPlayWidget({ track }: Props) {
  console.info(track.id);

  const src = `https://open.spotify.com/embed/track/${track.id}`;
  console.info(`https://open.spotify.com/track/1ImLoXBgOXdAxqQtVEM5A5`);
  console.info(src);
  return (
    <iframe
      src={src}
      width="300"
      height="80"
      frameBorder="0"
      allow="encrypted-media"
    />
  );
}