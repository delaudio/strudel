import AcademicCapIcon from '@heroicons/react/20/solid/AcademicCapIcon';
import ArrowPathIcon from '@heroicons/react/20/solid/ArrowPathIcon';
import LinkIcon from '@heroicons/react/20/solid/LinkIcon';
import PlayCircleIcon from '@heroicons/react/20/solid/PlayCircleIcon';
import SparklesIcon from '@heroicons/react/20/solid/SparklesIcon';
import StopCircleIcon from '@heroicons/react/20/solid/StopCircleIcon';
import { cx } from '@strudel.cycles/react';
import React, { useContext } from 'react';
import { useSettings, setIsZen } from '../settings.mjs';
// import { ReplContext } from './Repl';
import './Repl.css';

export function Header({ context }) {
  const {
    embedded,
    started,
    pending,
    isDirty,
    lastShared,
    activeCode,
    handleTogglePlay,
    handleUpdate,
    handleShuffle,
    handleShare,
  } = context;
  const isEmbedded = embedded || window.location !== window.parent.location;
  const { isZen } = useSettings();

  return (
    <header
      id="header"
      className={cx(
        'flex-none text-black  z-[100] text-lg select-none',
        !isZen && !isEmbedded && 'bg-lineHighlight',
        isZen ? 'h-12 w-8 fixed top-0 left-0' : 'sticky top-0 w-full py-1 justify-start',
        isEmbedded ? 'flex' : 'md:flex',
      )}
    >
      <div className="px-0 flex space-x-2 md:pt-0 select-none pl-[16px]">
        <h1
          onClick={() => {
            if (isEmbedded) window.open(window.location.href.replace('embed', ''));
          }}
          className={cx(
            isEmbedded ? 'text-l cursor-pointer' : 'text-xl',
            'text-foreground font-bold flex space-x-2 items-center',
          )}
        >
          <div
            className={cx('mt-[1px]', started && 'animate-spin', 'cursor-pointer')}
            onClick={() => {
              if (!isEmbedded) {
                setIsZen(!isZen);
              }
            }}
          />
        </h1>
      </div>
      {!isZen && (
        <div className="flex max-w-full overflow-auto text-foreground">
          <button
            onClick={handleTogglePlay}
            title={started ? 'stop' : 'play'}
            className={cx(!isEmbedded ? 'p-2' : 'px-2', 'hover:opacity-50', !started && 'animate-pulse')}
          >
            {!pending ? (
              <span className={cx('flex items-center space-x-1', isEmbedded ? '' : 'w-16')}>
                {!isEmbedded && <span>{started ? 'stop' : 'play'}</span>}
              </span>
            ) : (
              <>loading...</>
            )}
          </button>
          <button
            onClick={handleUpdate}
            title="update"
            className={cx(
              'flex items-center space-x-1',
              !isEmbedded ? 'p-2' : 'px-2',
              !isDirty || !activeCode ? 'opacity-50' : 'hover:opacity-50',
            )}
          >
            {!isEmbedded && <span>update</span>}
          </button>
        </div>
      )}
    </header>
  );
}
