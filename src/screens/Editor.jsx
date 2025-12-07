import React, { useState, useEffect } from 'react';
import { ArrowLeft, Image as ImageIcon, Save } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Editor = ({ file, onBack, onConvert }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    useEffect(() => {
        if (file) {
            // Default title from filename
            setTitle(file.name.replace('.pdf', ''));
        }
    }, [file]);

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConvert = () => {
        onConvert({
            title,
            author,
            coverImage
        });
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex items-center gap-2">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Edit Metadata</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 space-y-6"
            >
                {/* Cover Image Section */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-32 h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                        {coverPreview ? (
                            <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center p-2">
                                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                <span className="text-xs text-gray-400">No Cover</span>
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-white text-xs font-medium">Change</span>
                            <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                        </label>
                    </div>
                    <span className="text-sm text-gray-500">Tap image to change cover</span>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Enter book title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Enter author name"
                        />
                    </div>
                </div>
            </motion.div>

            <div className="mt-auto pt-4">
                <Button onClick={handleConvert} disabled={!title}>
                    <Save className="w-5 h-5" />
                    Start Conversion
                </Button>
            </div>
        </div>
    );
};

export default Editor;
