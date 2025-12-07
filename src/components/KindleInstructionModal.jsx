import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const KindleInstructionModal = ({ isOpen, onClose, onConfirm, senderEmail = 'jelmaris.studio@gmail.com' }) => {
    const [showSteps, setShowSteps] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#f5e6d3] w-full max-w-md rounded-lg shadow-2xl border-2 border-[#c5a059] overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="bg-[#1a1614] p-4 flex items-center justify-between border-b border-[#c5a059]">
                    <h3 className="text-[#c5a059] font-serif text-xl font-bold flex items-center gap-2">
                        <AlertTriangle size={24} />
                        Action Required
                    </h3>
                    <button onClick={onClose} className="text-[#c5a059] hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <p className="text-[#2b2118] text-lg font-serif leading-relaxed">
                        To receive files, you <span className="font-bold underline decoration-[#c5a059]">must</span> add our email to your Amazon Approved List.
                    </p>

                    <div className="bg-white/50 p-4 rounded border border-[#c5a059]/30 text-center">
                        <p className="text-sm text-[#5c4d3c] mb-1">Add this email:</p>
                        <code className="block bg-[#1a1614] text-[#c5a059] p-2 rounded font-mono text-sm select-all">
                            {senderEmail}
                        </code>
                    </div>

                    {/* Expandable Steps */}
                    <div className="border border-[#c5a059]/30 rounded bg-white/30 overflow-hidden">
                        <button
                            onClick={() => setShowSteps(!showSteps)}
                            className="w-full flex items-center justify-between p-3 text-[#2b2118] font-medium hover:bg-[#c5a059]/10 transition-colors"
                        >
                            <span>How to do this?</span>
                            {showSteps ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {showSteps && (
                            <div className="p-3 text-sm text-[#5c4d3c] space-y-2 bg-white/50 border-t border-[#c5a059]/20">
                                <ol className="list-decimal list-inside space-y-1 ml-1">
                                    <li>Go to <strong>Manage Your Content and Devices</strong> on Amazon.</li>
                                    <li>Click on the <strong>Preferences</strong> tab.</li>
                                    <li>Scroll down to <strong>Personal Document Settings</strong>.</li>
                                    <li>Under <strong>Approved Personal Document E-mail List</strong>, click <strong>Add a new approved e-mail address</strong>.</li>
                                    <li>Enter <code>{senderEmail}</code> and click <strong>Add Address</strong>.</li>
                                </ol>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#e8dcc5] border-t border-[#c5a059]/30 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded border border-[#2b2118]/20 text-[#2b2118] font-medium hover:bg-[#2b2118]/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 rounded bg-[#1a1614] text-[#c5a059] font-bold shadow-md hover:bg-[#2b2118] transition-transform active:scale-95 flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={18} />
                        I Understand, Send
                    </button>
                </div>

            </div>
        </div>
    );
};

export default KindleInstructionModal;
