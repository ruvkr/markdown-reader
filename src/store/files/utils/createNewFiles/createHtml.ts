import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import emoji from 'markdown-it-emoji';
import abbr from 'markdown-it-abbr';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import ins from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';

const highlight: MarkdownIt.Options['highlight'] = (str, lang, attrs) => {
  const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(str, { language: validLang, ignoreIllegals: true }).value;
  return '<pre class="hljs"><code>' + highlighted + '</code></pre>';
};

const parser = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
})
  .use(sub)
  .use(sup)
  .use(footnote)
  .use(abbr)
  .use(deflist)
  .use(ins)
  .use(mark)
  .use(emoji);

export function createHtml(markdownString: string): string {
  return parser.render(markdownString);
}
