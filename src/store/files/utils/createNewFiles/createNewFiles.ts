import { Markdown, Attachment } from '../..';
import {
  readText,
  createHtml,
  createImageList,
  createAttachment,
  createMarkdown,
} from './';

export async function createNewFiles(files: File[]) {
  const attachments: Attachment[] = [];
  const markdowns: Markdown[] = [];

  for await (const file of files) {
    const text = await readText(file);
    const html = createHtml(text);
    const { imageList, updatedHtml } = createImageList(html);
    const htmlAttch = createAttachment(updatedHtml, `html_${file.name}`);
    const fileAttch = createAttachment(file);
    const markdown = createMarkdown({
      name: file.name,
      imageList,
      htmlID: htmlAttch.id,
      fileID: fileAttch.id,
    });

    attachments.push(htmlAttch, fileAttch);
    markdowns.push(markdown);
  }

  return { markdowns, attachments };
}
