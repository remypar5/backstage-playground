export const categorizeTags = (tags: string[]): Map<string, string[]> => {
    const categorizedTags: Map<string, string[]> = new Map();

    tags.forEach(tag => {
        const [category, value] = tag.split(':');
        if (!categorizedTags.has(category)) {
            categorizedTags.set(category, []);
        }
        categorizedTags.get(category)?.push(value);
    });

    return categorizedTags;
};
