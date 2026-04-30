import { SpotifyShowcase, type SpotifyTrack } from './Spotify'

const SPOTIFY_PROFILE_NAME = 'KUNJ SHAH'

const CURRENTLY_PLAYING: SpotifyTrack = {
  title: 'Chaniyacholi',
  artist: 'From your Spotify mix',
  url: 'https://open.spotify.com/search/chaniyacholi',
}

const TOP_TRACKS: SpotifyTrack[] = [
  {
    title: 'Chaniyacholi',
    artist: 'From your Spotify mix',
    url: 'https://open.spotify.com/search/chaniyacholi',
  },
  {
    title: 'Love Ni Bhavai',
    artist: 'From your Spotify mix',
    url: 'https://open.spotify.com/search/love%20ni%20bhavai',
  },
  {
    title: 'Ghera Hua',
    artist: 'From your Spotify mix',
    url: 'https://open.spotify.com/search/ghera%20hua',
  },
  {
    title: 'Dekha Tenu',
    artist: 'Mohammad Faiz, Jaani',
    url: 'https://open.spotify.com/track/34Fh4HXZmnuBdtgejWUZg2',
  },
  {
    title: 'Pardfesiya',
    artist: 'From your Spotify mix',
    url: 'https://open.spotify.com/search/pardfesiya',
  },
  {
    title: 'Raat Lamhe',
    artist: 'From your Spotify mix',
    url: 'https://open.spotify.com/search/raat%20lamhe',
  },
]

const SPOTIFY_PLAYLISTS = [
  {
    title: 'Love Likes',
    url: 'https://open.spotify.com/playlist/2LCGIxbk4uSfrXKPh1eckf',
  },
  {
    title: 'Party',
    url: 'https://open.spotify.com/playlist/1H2OBSl1Jbi9NcLFNYtX2v',
  },
  {
    title: 'Focus Flow',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS',
  },
  {
    title: 'Chill Vibes',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
  },
  {
    title: 'Gujarati Hits',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
  },
  {
    title: 'Desi Pop',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX4E3UdUs7fUx',
  },
  {
    title: 'Bollywood Warmup',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7cYQQ',
  },
  {
    title: 'Late Night',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX4wta20PHgwo',
  },
]

const SPOTIFY_GENRES = [
  'Desi Pop',
  'Bollywood',
  'Gujarati',
  'Indie',
  'Lo-Fi',
  'Romance',
]

const SPOTIFY_STATS = {
  listeningHours: '42h',
  topArtist: 'Arijit Singh',
  topGenre: 'Bollywood',
}

export function Music() {
  return (
    <SpotifyShowcase
      profileName={SPOTIFY_PROFILE_NAME}
      currentlyPlaying={CURRENTLY_PLAYING}
      topTracks={TOP_TRACKS}
      playlists={SPOTIFY_PLAYLISTS}
      genres={SPOTIFY_GENRES}
      stats={SPOTIFY_STATS}
    />
  )
}