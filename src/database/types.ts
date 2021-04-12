export type rAttachment = {
  type: string;
  name: string;
  _id: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments: {
    main: {
      content_type: string;
      data: File | Blob;
    };
  };
};
