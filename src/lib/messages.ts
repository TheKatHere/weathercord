export enum MessageType {
  Default = 0,
  Reply = 1,
  Join = 2,
  Leave = 3
}

export interface MessageCommons {
  channel: string;
  id: string;
  type: MessageType;
}

/**
 * Message sent by a user.
 */
export interface DefaultMessage extends MessageCommons {
  content: string;
  type: MessageType.Default;
}

/**
 * Message sent by a user in reply to another message.
 */
export interface ReplyMessage extends Omit<DefaultMessage, "type"> {
  replyTo: string;
  type: MessageType.Reply;
}

/**
 * System message sent when somebody joins a group chat or station.
 */
export interface JoinMessage extends MessageCommons {
  account: string;
  type: MessageType.Join;
}

/**
 * System message sent when somebody leaves a group chat or station.
 */
export interface LeaveMessage extends Omit<JoinMessage, "type"> {
  type: MessageType.Leave;
}

export type Message = DefaultMessage | ReplyMessage | JoinMessage | LeaveMessage;
