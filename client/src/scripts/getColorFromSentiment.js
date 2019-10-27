const colors = {
    happy: {
        r: 255,
        g: 131,
        b: 77
    },
    sad: {
        r: 104,
        g: 130,
        b: 213
    },
    mad: {
        r: 255,
        g: 0,
        b: 0
    },
    love: {
        r: 255,
        g: 63,
        b: 63
    },
    calm: {
        r: 121,
        g: 232,
        b: 158
    },
    mixed: {
        r: 0,
        g: 255,
        b: 0
    },
    neutral: {
        r: 210,
        g: 180,
        b: 140
    }
}

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