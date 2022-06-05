export type ModalMessageStateT = {
  received: string[];
  toDisplayQueue: ModalMessageDataT[];
};

export type ModalMessageDataT = {
  id: string;
  body: string;
  title: string;
  image: string;
  action: string;
  link?: string;
};

/**
 * used for analytics purpose when any action with modal is done (close or goto) or when modal message is shown to user
 */
export type ModalMessageAnalyticsT = {
  id: string;
  action: string;
  title?: string;
};
