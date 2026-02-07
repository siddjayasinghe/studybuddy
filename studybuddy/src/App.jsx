import { useState, useEffect } from 'react';
import { FaHome,FaBars } from 'react-icons/fa';
import Card from './Card'; 
import AddVideoForm from './AddVideoForm';
import TabDetector from './TabDetector';


const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });
    const [filter, setFilter] = useState('all');
    const defaultVideos = [
        {
            videoId: "Qo7N-HbEMxE",
            title: "4 A.M Study With Me"
        },
        {
            videoId: "jfKfPfyJRdk",
            title: "Lofi Hip Hop - Beats to Study/Relax"
        },
        {
            videoId: "RJTcqnGPQME",
            title: "Sunset Pomodoro Lofi"
        },
        {
            videoId:"vCTRNKPJr40",
            title: "Minecraft Music For Studying"
        },
        {
            videoId:"RSxEnxsf3o8",
            title: "3 hour pomodoro rain sounds"
        },
        {
            videoId:"hrHUcvBRTnU",
            title:"Nature Sounds Pomodoro"
        },
        {
            videoId:"mPZkdNFkNps",
            title:"Heavy Rain Sounds"
        },
        {
            videoId:"OkNo_N85em0",
            title:"Minecraft Music + Rain"
        }
    ];

    const [videos, setVideos] = useState(() => {
        const savedVideos = localStorage.getItem('userVideos');
        return savedVideos ? JSON.parse(savedVideos) : defaultVideos;
    });
    const [tabDetection, setTabDetection] = useState(false);
    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.body.className = isDark ? 'dark' : 'light';
    }, [isDark]);

    useEffect(() => {
        localStorage.setItem('userVideos', JSON.stringify(videos));
    }, [videos]);

    const handleAddVideo = (newVideo) => {
        setVideos([...videos, newVideo]);
    };
        return (
        <div>
            <TabDetector isEnabled={tabDetection}/>
            <header className={`shadow-md mb-8 ${
                isDark ? 'bg-fuchsia-700/80' : 'bg-fuchsia-500/80'
            } backdrop-blur-md`}>
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold text-white">Study With Sidd - <i>No More Distractions</i></div>
                    <nav className="hidden md:flex space-x-4 ml-5 mr-5 items-center">
                        <a href="#" className="flex items-center text-white font-bold">
                            <FaHome className="mr-1" /> Home
                        </a>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="text-white hover:text-gray-200 transition-colors ml-2 text-2xl"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={() => setTabDetection(!tabDetection)}
                            className="text-white hover:text-gray-200 transition-colors ml-2 text-xl"
                        >
                            {tabDetection ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </nav>
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="text-white hover:text-gray-200 transition-colors text-2xl"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                            <FaBars size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="md:hidden bg-fuchsia-700/80 backdrop-blur-md shadow-md p-4 space-y-2 ml-2 mr-2">
                        <a href="#" className="flex items-center text-white font-bold">
                            <FaHome className="mr-2" /> Home
                        </a>
                    </nav>
                )}
            </header>

            {/* Add Video Button */}
            <div className="container mx-auto px-4 mb-6 flex justify-center">
                <AddVideoForm onAddVideo={handleAddVideo} />
            </div>
            <div className="container mx-auto px-4 mb-6 flex justify-center gap-3">
            <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md transition-colors ${
                    filter === 'all' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-fuchsia-300 text-white border border-white/20'
                }`}
            >
                All
            </button>
            <button
                onClick={() => setFilter('lofi')}
                className={`px-4 py-2 rounded-md transition-colors ${
                    filter === 'lofi' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-fuchsia-300 text-white border border-white/20'
                }`}
            >
                Lofi
            </button>
            <button
                onClick={() => setFilter('rain')}
                className={`px-4 py-2 rounded-md transition-colors ${
                    filter === 'rain' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-fuchsia-300 text-white border border-white/20'
                }`}
            >
                Rain
            </button>
            <button
                onClick={() => setFilter('pomodoro')}
                className={`px-4 py-2 rounded-md transition-colors ${
                    filter === 'pomodoro' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-fuchsia-300 text-white border border-white/20'
                }`}
            >
                Pomodoro
            </button>
                        <button
                onClick={() => setFilter('nature')}
                className={`px-4 py-2 rounded-md transition-colors ${
                    filter === 'nature' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-fuchsia-300 text-white border border-white/20'
                }`}
            >
                Nature
            </button>
        </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-6">
                    {videos
                        .filter(video => {
                            if (filter === 'all') return true;
                            return video.title.toLowerCase().includes(filter);
                        })
                        .map((video) => (
                            <Card 
                                key={video.videoId}
                                videoId={video.videoId}
                                title={video.title}
                                isDark={isDark}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;