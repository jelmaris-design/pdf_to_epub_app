// User tier management
const TIERS = {
    FREE: 'free',
    LIFETIME: 'lifetime',
    PREMIUM: 'premium'
};

const TIER_LIMITS = {
    [TIERS.FREE]: {
        monthlyConversions: 10,
        maxBonus: 20, // Total max 30
        maxFileSize: 50, // MB
        showAds: true,
        apiConversion: false
    },
    [TIERS.LIFETIME]: {
        monthlyConversions: Infinity,
        maxBonus: 0,
        maxFileSize: Infinity,
        showAds: false,
        apiConversion: true
    },
    [TIERS.PREMIUM]: { // Monthly Subscription
        monthlyConversions: 25,
        maxBonus: 25, // Total max 50
        maxFileSize: Infinity,
        showAds: false, // No banner ads
        apiConversion: true,
        cloudBackup: true,
        prioritySupport: true
    }
};

const STORAGE_KEYS = {
    TIER: 'user_tier',
    CONVERSIONS: 'conversion_count',
    BONUS: 'bonus_conversions',
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

export const getBonusConversions = () => {
    const count = localStorage.getItem(STORAGE_KEYS.BONUS);
    return count ? parseInt(count, 10) : 0;
};

export const addBonusConversion = () => {
    const tier = getUserTier();
    const limits = getTierLimits(tier);
    const currentBonus = getBonusConversions();

    if (currentBonus < limits.maxBonus) {
        localStorage.setItem(STORAGE_KEYS.BONUS, (currentBonus + 1).toString());
        return true;
    }
    return false;
};

export const incrementConversionCount = () => {
    const current = getConversionCount();
    localStorage.setItem(STORAGE_KEYS.CONVERSIONS, (current + 1).toString());
    return current + 1;
};

export const resetConversionCount = () => {
    localStorage.setItem(STORAGE_KEYS.CONVERSIONS, '0');
    localStorage.setItem(STORAGE_KEYS.BONUS, '0');
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

    if (limits.monthlyConversions === Infinity) return true;

    const count = getConversionCount();
    const bonus = getBonusConversions();
    const totalLimit = limits.monthlyConversions + bonus;

    return count < totalLimit;
};

export const getRemainingConversions = () => {
    const tier = getUserTier();
    const limits = getTierLimits(tier);

    if (limits.monthlyConversions === Infinity) {
        return Infinity;
    }

    const count = getConversionCount();
    const bonus = getBonusConversions();
    const totalLimit = limits.monthlyConversions + bonus;

    return Math.max(0, totalLimit - count);
};

export { TIERS };
