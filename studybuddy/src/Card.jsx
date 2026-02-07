import { useState } from 'react';
const Card = ({ videoId, title, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
  <div className="shadow-md w-full max-w-sm p-4 bg-sky-700/30 backdrop-blur-lg border border-white/20 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
    <div className="aspect-video mb-4">
      <img 
        src={thumbnail || `https://i.ytimg.com/vi/${videoId}/hq720.jpg`}
        className="w-full h-full object-cover shadow-md rounded-lg"
        alt={title}
      />
    </div>
    <div className="mb-4">
      <h2 className="font-bold text-white text-center">{title}</h2>
    </div>
    <div className="flex justify-center">
      <button
        onClick={() => setIsPlaying(true)}
        className="text-white bg-purple-600/70 backdrop-blur-sm border border-white/30 px-6 py-2 rounded-md hover:bg-purple-700/80 transition-colors"
      >
        Play
      </button>
    </div>
  </div>

  {/* Modal Overlay */}
  {isPlaying && (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={() => setIsPlaying(false)}
    >
      <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setIsPlaying(false)}
          className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
        >
          ✕
        </button>
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )}
</>
  );
};
export default Card;

