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
]

const SPOTIFY_PLAYLISTS = [
  {
    title: 'Love likes',
    url: 'https://open.spotify.com/playlist/2LCGIxbk4uSfrXKPh1eckf',
  },
  {
    title: 'Party',
    url: 'https://open.spotify.com/playlist/1H2OBSl1Jbi9NcLFNYtX2v',
  },
]

export function ResearcherLive() {
  return (
    <SpotifyShowcase
      profileName={SPOTIFY_PROFILE_NAME}
      currentlyPlaying={CURRENTLY_PLAYING}
      topTracks={TOP_TRACKS}
      playlists={SPOTIFY_PLAYLISTS}
    />
  )
}
