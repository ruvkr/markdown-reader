import { v4 as uuid } from 'uuid';
import { Attachment } from '../..';

export function createAttachment(file: File, id?: string): Attachment;
export function createAttachment(
  fileString: string,
  name: string,
  id?: string
): Attachment;
export function createAttachment(
  file: File | string,
  name?: string,
  id: string = uuid()
): Attachment {
  if (typeof file === 'string') {
    const fileObj = new File([file], name ?? 'file', { type: 'text/plain' });
    return { id, file: fileObj };
  } else return { id, file };
}
