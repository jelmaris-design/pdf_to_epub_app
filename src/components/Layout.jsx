import React from 'react';
import { BookOpen, Settings } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';
<main className="flex-1 overflow-y-auto p-4 relative">
    <div className="max-w-md mx-auto h-full">
        {children}
    </div>
</main>

{/* Footer / Ad */ }
{ showAds && <AdPlaceholder onRemoveAds={onRemoveAds} /> }
        </div >
    );
};

export default Layout;
