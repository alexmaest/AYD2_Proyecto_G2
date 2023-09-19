'use client'
import fetchCanPlaySong from '@/lib/fetchCanPlaySong'
import useMusicStore from '@/store/store'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  TbArrowsShuffle,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
  TbVolume,
  TbVolumeOff,
  TbMusicOff
} from 'react-icons/tb'

const repeatStates = ['off', 'all', 'one'] as const
type RepeatState = 'off' | 'all' | 'one'

const calculateTime = (secs: number) => {
  const minutes = Math.floor(secs / 60)
  const seconds = Math.floor(secs % 60)
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${minutes}:${returnedSeconds}`
}

export default function Player () {
  const { data: session } = useSession()
  const playAnimationRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLInputElement | null>(null)
  const volumeSliderRef = useRef<HTMLInputElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [repeatState, setRepeatState] = useState<RepeatState>('off')
  const [shuffle, setShuffle] = useState(false)
  const [mute, setMute] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(100)
  const [muteVolume, setMuteVolume] = useState(0)

  const { currentSong, forward, backward, canPlay, setCanPlay } = useMusicStore()

  const handleRepeat = () => {
    const currentIndex = repeatStates.indexOf(repeatState)
    const nextIndex = (currentIndex + 1) % repeatStates.length
    setRepeatState(repeatStates[nextIndex])
  }

  const handlePlay = async () => {
    if (!canPlay) return

    if (audioRef.current != null) {
      if (isPlaying) audioRef.current.pause()
      else await audioRef.current.play()
    }
    setIsPlaying((prev) => !prev)
  }

  const handleSkipForward = () => {
    forward()
  }

  const handleSkipBackward = () => {
    backward()
  }

  const handleProgress = () => {
    if ((audioRef.current != null) && (progressRef.current != null)) {
      audioRef.current.currentTime = Number(progressRef.current.value)
      setCurrentTime(Number(progressRef.current.value))
    }
  }

  const handleVolumeChange = () => {
    if ((audioRef.current != null) && (volumeSliderRef.current != null)) {
      audioRef.current.volume = Number(volumeSliderRef.current.value) / 100
      setVolume(Number(volumeSliderRef.current.value))
      if (mute) {
        setVolume(Number(volumeSliderRef.current.value))
        audioRef.current.volume = Number(volumeSliderRef.current.value) / 100
        audioRef.current.muted = false
        setMute((prev) => !prev)
      }
    }
  }

  const handleMute = () => {
    if (mute) {
      setVolume(muteVolume)
      if (audioRef.current != null) {
        audioRef.current.volume = muteVolume / 100
        audioRef.current.muted = false
      }
    } else {
      setMuteVolume(volume)
      setVolume(0)
      if (audioRef.current != null) {
        audioRef.current.muted = true
      }
    }
    setMute((prev) => !prev)
  }

  const repeat = useCallback(() => {
    const timeProgress = Math.floor(audioRef.current?.currentTime ?? 0)
    setCurrentTime(timeProgress)
    if (progressRef.current != null) {
      progressRef.current.value = timeProgress.toString()
    }

    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [audioRef, progressRef, setCurrentTime])

  const repeatComponent = () => {
    switch (repeatState) {
      case 'all':
        return (
          <TbRepeat className='h-6 w-6 text-retro-green hover:brightness-125' />
        )
      case 'one':
        return (
          <TbRepeatOnce className='h-6 w-6 text-retro-green hover:brightness-125' />
        )
      default:
        return (
          <TbRepeatOff className='h-6 w-6 text-retro-white opacity-75 hover:opacity-100' />
        )
    }
  }

  useEffect(() => {
    if (audioRef.current != null) {
      if (audioRef.current.readyState > 0) {
        setDuration(Math.floor(audioRef.current.duration))
      }
    }
  }, [audioRef.current?.readyState])

  useEffect(() => {
    playAnimationRef.current = requestAnimationFrame(repeat)
    return () => cancelAnimationFrame(playAnimationRef.current)
  }, [repeat])

  useEffect(() => {
    if ((audioRef.current != null) && (currentSong != null)) {
      audioRef.current.src = currentSong.songUrl
      audioRef.current.load()
      void audioRef.current.play()
      setIsPlaying(true)
    }
  }, [currentSong])

  useEffect(() => {
    const fetchCanPlay = async () => {
      const canPlay = await fetchCanPlaySong(session?.user.id ?? 0)
      if (canPlay?.result === false) {
        alert('You have reached your limit of songs for today')
      }
      setCanPlay(canPlay?.result ?? false)
    }
    if (session != null) {
      void fetchCanPlay()
    }
  }, [session, setCanPlay, currentSong])

  return (
    <footer className='flex h-[72px] w-full flex-row justify-between bg-[#1D1D1D] sticky bottom-0 z-50'>
      <audio
        ref={audioRef}
        src={currentSong?.songUrl ?? undefined}
        preload='metadata'
        loop
      >
        <track kind='captions' />
      </audio>
      <div className='flex w-1/3 flex-row gap-4 p-2'>
        {currentSong?.cover != null
          ? (<img
              src={currentSong?.cover ?? ''}
              alt='Album Cover'
              className='h-14 w-14 cursor-pointer rounded'
             />)
          : (
            <TbMusicOff className='h-14 w-14 text-retro-white opacity-75' />
            )}
        <div className='flex h-full flex-col items-start justify-center'>
          <h3 className='cursor-pointer text-base text-retro-white hover:underline'>
            {currentSong?.name ?? 'Song Name'}
          </h3>
          <p className='cursor-pointer text-xs text-retro-white-300 hover:underline hover:brightness-110'>
            {currentSong?.artist ?? 'Artist'}
          </p>
        </div>
      </div>
      <div className='flex h-full w-1/3 flex-col items-center justify-center'>
        <div className='flex h-8 flex-row items-center justify-center gap-4'>
          <button
            className={`relative flex h-8 w-8 flex-col items-center justify-center ${
              shuffle
                ? 'after:absolute after:mt-6 after:block after:h-1 after:w-1 after:rounded-full after:bg-retro-green after:content-[""] hover:brightness-125'
                : 'opacity-75 hover:opacity-100'
            }`}
            type='button'
            onClick={() => setShuffle((prev) => !prev)}
          >
            <TbArrowsShuffle
              className={`h-6 w-6 ${
                shuffle ? 'text-retro-green' : 'text-retro-white'
              }`}
            />
          </button>
          <button
            onClick={handleSkipBackward}
            type='button'
            className='flex h-8 w-8 items-center justify-center'
          >
            <TbPlayerSkipBackFilled className='h-6 w-6 text-retro-white opacity-75 hover:opacity-100' />
          </button>
          <button
            className='flex h-8 w-8 transform items-center justify-center transition-all duration-300 hover:scale-110'
            type='button'
            onClick={handlePlay}
          >
            {isPlaying
              ? (
                <TbPlayerPauseFilled className='h-8 w-8 text-retro-white' />
                )
              : (
                <TbPlayerPlayFilled className='h-8 w-8 text-retro-white' />
                )}
          </button>
          <button
            onClick={handleSkipForward}
            type='button'
            className='flex h-8 w-8 items-center justify-center'
          >
            <TbPlayerSkipForwardFilled className='h-6 w-6 text-retro-white opacity-75 hover:opacity-100' />
          </button>
          <button
            type='button'
            onClick={handleRepeat}
            className={`relative flex h-8 w-8 flex-col items-center justify-center ${
              repeatState === 'off'
                ? 'opacity-75 hover:opacity-100'
                : 'after:absolute after:mt-6 after:block after:h-1 after:w-1 after:rounded-full after:bg-retro-green after:content-[""]'
            }}}`}
          >
            {repeatComponent()}
          </button>
        </div>
        {/* timeline */}
        <div className='flex w-full flex-row items-center justify-center gap-2'>
          <span className='text-xs text-retro-white opacity-75'>
            {calculateTime(currentTime)}
          </span>
          <input
            className='w-4/5'
            type='range'
            max={duration}
            min={0}
            value={currentTime}
            ref={progressRef}
            onChange={handleProgress}
          />
          <span className='text-xs text-retro-white opacity-75'>
            {calculateTime(duration)}
          </span>
        </div>
      </div>
      <div className='w-1/3'>
        <div className='flex h-full w-full flex-row items-center justify-end gap-4 p-2'>
          <button
            type='button'
            className='flex h-8 w-8 items-center justify-center'
            onClick={handleMute}
          >
            {mute
              ? (
                <TbVolumeOff className='h-6 w-6 text-retro-white opacity-75 hover:opacity-100' />
                )
              : (
                <TbVolume className='h-6 w-6 text-retro-white opacity-75 hover:opacity-100' />
                )}
          </button>
          <input
            className='w-1/4'
            ref={volumeSliderRef}
            type='range'
            max={100}
            min={0}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </footer>
  )
}
