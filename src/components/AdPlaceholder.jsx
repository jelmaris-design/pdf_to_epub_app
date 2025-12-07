import React, { useState } from 'react';
import { X } from 'lucide-react';

const AdPlaceholder = ({ onRemoveAds, showRemoveOption = true }) => {
    return (
        <div className="w-full bg-gray-100 border-t border-gray-200 p-4 flex flex-col items-center justify-center relative shrink-0">
            <div className="text-xs text-gray-400 absolute top-1 right-2">ADVERTISEMENT</div>
            <div className="w-full max-w-[320px] h-[50px] bg-gray-300 animate-pulse rounded flex items-center justify-center text-gray-500 font-medium">
                Banner Ad (320x50)
            </div>
            {showRemoveOption && (
                <button
                    onClick={onRemoveAds}
                    className="mt-2 text-xs text-secondary hover:text-pink-600 underline"
                >
                    Remove Ads
                </button>
            )}
        </div>
    );
};

export default AdPlaceholder;
