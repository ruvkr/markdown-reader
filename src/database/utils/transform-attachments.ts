import { Attachment } from '../../store/files';
import { rAttachment } from '../types';

type rAttachment_and_rev = rAttachment & { _rev: string };
type Attachment_and_rev = Attachment & { rev: string };
type Attachment_opt_rev = Attachment & { rev?: string };

export function toAttachment(
  rAttachment: rAttachment_and_rev
): Attachment_and_rev;

export function toAttachment(
  rAttachment: rAttachment_and_rev[]
): Attachment_and_rev[];

export function toAttachment(
  rAttachment: rAttachment_and_rev | rAttachment_and_rev[]
): Attachment_and_rev | Attachment_and_rev[] {
  if (Array.isArray(rAttachment)) return rAttachment.map(convertTo);
  else return convertTo(rAttachment);
}

export function fromAttachment(attachment: Attachment_opt_rev): rAttachment;

export function fromAttachment(attachment: Attachment_opt_rev[]): rAttachment[];

export function fromAttachment(
  attachment: Attachment_opt_rev | Attachment_opt_rev[]
): rAttachment | rAttachment[] {
  if (Array.isArray(attachment)) return attachment.map(convertFrom);
  else return convertFrom(attachment);
}

function convertTo(rAttachment: rAttachment_and_rev): Attachment_and_rev {
  const { name, type, _attachments, _id, _rev } = rAttachment;
  const file = new File([_attachments.main.data], name, { type });
  return { id: _id, rev: _rev, file };
}

function convertFrom(attachment: Attachment_opt_rev): rAttachment {
  return {
    _id: attachment.id,
    _rev: attachment.rev,
    name: attachment.file.name,
    type: attachment.file.type,
    _attachments: {
      main: {
        content_type: attachment.file.type,
        data: attachment.file,
      },
    },
  };
}
