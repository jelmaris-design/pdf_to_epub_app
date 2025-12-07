// User tier management
const TIERS = {
    FREE: 'free',
    LIFETIME: 'lifetime',
    PREMIUM: 'premium'
};

const TIER_LIMITS = {
    [TIERS.FREE]: {
        monthlyConversions: 10,
        maxFileSize: 50, // MB
        showAds: true,
        apiConversion: false
    },
    [TIERS.LIFETIME]: {
        monthlyConversions: Infinity,
        maxFileSize: Infinity,
        showAds: false,
        apiConversion: true
    },
    [TIERS.PREMIUM]: {
        monthlyConversions: Infinity,
        maxFileSize: Infinity,
        showAds: false,
        apiConversion: true,
        cloudBackup: true,
        prioritySupport: true
    }
};

const STORAGE_KEYS = {
    TIER: 'user_tier',
    CONVERSIONS: 'conversion_count',
    LAST_RESET: 'last_reset_date'
};

export const getUserTier = () => {
    return localStorage.getItem(STORAGE_KEYS.TIER) || TIERS.FREE;
};

export const setUserTier = (tier) => {
    localStorage.setItem(STORAGE_KEYS.TIER, tier);
};

export const getTierLimits = (tier = null) => {
    const currentTier = tier || getUserTier();
    return TIER_LIMITS[currentTier];
};

export const getConversionCount = () => {
    const count = localStorage.getItem(STORAGE_KEYS.CONVERSIONS);
    return count ? parseInt(count, 10) : 0;
};

export const incrementConversionCount = () => {
    const current = getConversionCount();
    localStorage.setItem(STORAGE_KEYS.CONVERSIONS, (current + 1).toString());
    return current + 1;
};

export const resetConversionCount = () => {
    localStorage.setItem(STORAGE_KEYS.CONVERSIONS, '0');
    localStorage.setItem(STORAGE_KEYS.LAST_RESET, new Date().toISOString());
};

export const checkMonthlyReset = () => {
    const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET);
    if (!lastReset) {
        resetConversionCount();
        return;
    }

    const lastResetDate = new Date(lastReset);
    const now = new Date();
    const daysSinceReset = (now - lastResetDate) / (1000 * 60 * 60 * 24);

    if (daysSinceReset >= 30) {
        resetConversionCount();
    }
};

export const canConvert = () => {
    checkMonthlyReset();
    const tier = getUserTier();
    const limits = getTierLimits(tier);
    const count = getConversionCount();

    return count < limits.monthlyConversions;
};

export const getRemainingConversions = () => {
    const tier = getUserTier();
    const limits = getTierLimits(tier);
    const count = getConversionCount();

    if (limits.monthlyConversions === Infinity) {
        return Infinity;
    }

    return Math.max(0, limits.monthlyConversions - count);
};

export { TIERS };
