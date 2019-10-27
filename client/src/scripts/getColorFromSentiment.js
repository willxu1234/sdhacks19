import colors from './colors'

export default function getColorFromSentiment(text, sentiment) {
    if (!sentiment) return colors.neutral;
    if (sentiment === 'POSITIVE') {
        if (!text) return colors.happy;
        const lowerCase = text.toLowerCase();
        let loveCount = (lowerCase.match(/like/g) || []).length +
            (lowerCase.match(/love/g) || []).length +
            (lowerCase.match(/<3/g) || []).length +
            (lowerCase.match(/crush/g) || []).length;
        if (loveCount >= 1) return colors.love;
        let upperCount = 0;
        let words = 1;
        for (let i = 0, len = text.length, ch; i < len; ++i) {
            ch = text.charAt(i);
            if ((ch >= 'A' && ch <= 'Z') || ch === '!') ++upperCount;
            if (ch === ' ') ++words;
        }
        if (upperCount >= words - 2) return colors.happy;
        return colors.calm;
    } else if (sentiment === 'NEUTRAL') {
        return colors.neutral;
    } else if (sentiment === 'MIXED') {
        return colors.mixed;
    } else {
        // Sad
        if (!text) return colors.sad;
        let upperCount = 0;
        let words = 1;
        for (let i = 0, len = text.length, ch; i < len; ++i) {
            ch = text.charAt(i);
            if ((ch >= 'A' && ch <= 'Z') || ch === '!') ++upperCount;
            if (ch === ' ') ++words;
        }
        if (upperCount >= words - 2) return colors.mad;
        return colors.sad;
    }
}