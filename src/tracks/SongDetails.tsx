import React, { Fragment } from 'react';
import { Album, Artist } from "./types";

interface Props {
  name: string;
  artists: Artist[];
  album: Album;
}

export default function SongDetails({ album, name, artists }: Props) {
  return (
    <div className="Song">
      <div>
        <img
          className="Song__image"
          height={250}
          src={album.images[0].url}
          width={250}
          alt={``}
        />
      </div>
      <div className="Song__title">
        {name}
      </div>
      <div className="Song__artists">
        {artists.map(a => a.name).join(', ')}
        {' '}
        <span style={{ margin: '0 .125rem', fontWeight: 'bold' }}>·</span>
        {' '}
        {album.name}
      </div>
    </div>
  );
}