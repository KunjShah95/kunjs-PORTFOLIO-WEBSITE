import { motion } from 'framer-motion'
import { ExternalLink, Music2, Play, Radio, Headphones, Flame, Clock } from 'lucide-react'

export interface SpotifyTrack {
  title: string
  artist: string
  url: string
  cover?: string
  duration?: string
}

interface SpotifyStats {
  listeningHours: string
  topArtist: string
  topGenre: string
}

interface SpotifyShowcaseProps {
  profileName?: string
  currentlyPlaying: SpotifyTrack
  topTracks: SpotifyTrack[]
  playlists: Array<{
    title: string
    url: string
  }>
  genres?: string[]
  stats?: SpotifyStats
}

function SpotifyTrackCard({ track }: { track: SpotifyTrack }) {
  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 rounded-lg border border-border/70 bg-bg/50 hover:border-primary/40 hover:bg-surfaceHighlight transition-all"
    >
      <div className="w-10 h-10 rounded-md bg-surface border border-border flex items-center justify-center overflow-hidden">
        {track.cover ? (
          <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
        ) : (
          <Music2 className="w-4 h-4 text-muted" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-txt truncate group-hover:text-primary transition-colors">
          {track.title}
        </div>
        <div className="text-xs text-muted truncate">{track.artist}</div>
      </div>
      {track.duration && (
        <span className="text-[11px] text-muted/70 font-medium">{track.duration}</span>
      )}
    </a>
  )
}

export function SpotifyShowcase({
  profileName,
  currentlyPlaying,
  topTracks,
  playlists,
  genres = [],
  stats,
}: SpotifyShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-surface border border-border rounded-xl p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column - Currently Playing, Stats, Playlists */}
        <div className="lg:col-span-4 rounded-xl border border-border bg-bg/60 p-4 sm:p-5 space-y-5">
          {/* Currently Listening */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <Radio className="w-3.5 h-3.5" />
                Currently Listening
              </span>
            </div>

            {profileName && (
              <div className="text-xs text-muted">
                Profile: <span className="text-txt font-semibold">{profileName}</span>
              </div>
            )}

            <SpotifyTrackCard track={currentlyPlaying} />
          </div>

          {/* Listening Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-surfaceHighlight/50 rounded-lg p-3 text-center">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xs font-semibold text-txt">{stats.listeningHours}</div>
                <div className="text-[10px] text-muted">this month</div>
              </div>
              <div className="bg-surfaceHighlight/50 rounded-lg p-3 text-center">
                <Headphones className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xs font-semibold text-txt truncate">{stats.topArtist}</div>
                <div className="text-[10px] text-muted">top artist</div>
              </div>
              <div className="bg-surfaceHighlight/50 rounded-lg p-3 text-center">
                <Flame className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xs font-semibold text-txt truncate">{stats.topGenre}</div>
                <div className="text-[10px] text-muted">top genre</div>
              </div>
            </div>
          )}

          {/* Genre Tags */}
          {genres.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted">Vibe Check</div>
              <div className="flex flex-wrap gap-1.5">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Playlists */}
          {playlists.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted">Playlists</div>
              <div className="flex flex-wrap gap-2">
                {playlists.map((playlist) => (
                  <a
                    key={playlist.url}
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-sm font-semibold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {playlist.title}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Top Tracks */}
        <div className="lg:col-span-8 rounded-xl border border-border bg-bg/60 p-4 sm:p-5 space-y-3">
          <div className="text-sm font-semibold text-txt">Top Tracks I'm Vibing To</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topTracks.map((track) => (
              <SpotifyTrackCard key={`${track.title}-${track.artist}`} track={track} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
