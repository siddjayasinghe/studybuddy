import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const AddVideoForm = ({ onAddVideo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');

  const extractVideoId = (url) => {
    // Handles youtube.com/watch?v=ID and youtu.be/ID
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    
    if (videoId && title) {
      onAddVideo({ videoId, title });
      setVideoUrl('');
      setTitle('');
      setIsOpen(false);
    } else {
      alert('Please enter a valid YouTube URL and title');
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-white bg-purple-600/80 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-md hover:bg-purple-700/80 transition-colors"
      >
        <FaPlus /> Add Video
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add New Video</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">YouTube URL</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Lofi Study Music"
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-purple-600/80 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-md hover:bg-purple-700/80 transition-colors"
              >
                Add Video
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVideoForm;