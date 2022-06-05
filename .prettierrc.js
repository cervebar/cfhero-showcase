module.exports = {
    plugins: [
        "./node_modules/prettier-plugin-import-sort/src"
    ],
    bracketSameLine: true,
    singleQuote: true,
    parser: 'typescript',
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 2,
    arrowParens: 'avoid',
    endOfLine: "auto"
};
