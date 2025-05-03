interface CategorizeTagsFunction {
  (tags: string[], delimiter?: string): Map<string, string[]>;
}

/**
 * Categorizes a list of tags into a map where the keys are categories and the values are arrays of tag values.
 *
 * @param tags - An array of strings representing tags in the format "category:value".
 * @param delimiter - An optional string used to split the tags into category and value. Defaults to ':'.
 * @returns A Map where each key is a category and the corresponding value is an array of tag values.
 *
 * @example
 * ```typescript
 * const tags = ['fruit:apple', 'fruit:banana', 'color:red', 'color:blue'];
 * const categorized = categorizeTags(tags);
 * console.log(categorized);
 * // Map {
 * //   'fruit' => ['apple', 'banana'],
 * //   'color' => ['red', 'blue']
 * // }
 * ```
 *
 * @example
 * ```typescript
 * const tagsWithCustomDelimiter = ['fruit|apple', 'fruit|banana', 'color|red', 'color|blue'];
 * const categorizedWithCustomDelimiter = categorizeTags(tagsWithCustomDelimiter, '|');
 * console.log(categorizedWithCustomDelimiter);
 * // Map {
 * //   'fruit' => ['apple', 'banana'],
 * //   'color' => ['red', 'blue']
 * // }
 * ```
 */
export const categorizeTags: CategorizeTagsFunction = (
  tags,
  delimiter = ':',
) => {
  const categorizedTags = new Map<string, string[]>();
  tags.forEach(tag => {
    const [category, value] = tag.split(delimiter);
    if (!categorizedTags.has(category)) {
      categorizedTags.set(category, []);
    }
    categorizedTags.get(category)!.push(value);
  });
  return categorizedTags;
};

interface GetTagsByCategoryFunction {
  (tags: string[], category: string, delimiter?: string): string[];
}

/**
 * Retrieves tags that belong to a specific category from a list of tags.
 *
 * @param tags - An array of strings representing tags in the format "category:value".
 * @param category - The category for which to retrieve the associated tag values.
 * @param delimiter - An optional string used to split the tags into category and value. Defaults to ':'.
 * @returns An array of strings representing the tag values that belong to the specified category.
 *
 * @example
 * ```typescript
 * const tags = ['fruit:apple', 'fruit:banana', 'color:red', 'color:blue'];
 * const fruitTags = getTagsByCategory(tags, 'fruit');
 * console.log(fruitTags); // ['apple', 'banana']
 * ```
 */
export const getTagsByCategory: GetTagsByCategoryFunction = (
  tags,
  category,
  delimiter = ':',
) => {
  const categorizedTags = categorizeTags(tags, delimiter);
  return categorizedTags.get(category) || [];
};
