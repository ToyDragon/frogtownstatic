export interface TTSDeck {
  ObjectStates: TTSRootObjectState[];
}

export interface TTSObjectState {
  Transform: TTSTransform;
}

export interface TTSChildObjectState extends TTSObjectState {
  Name: 'Card';
  Nickname: string;
  CardID: number;
}

export interface TTSRootObjectState extends TTSObjectState {
  Name: 'DeckCustom' | 'Card';
  ContainedObjects?: TTSChildObjectState[];
  CustomDeck: TTSImageDefinitionList;

  Nickname?: string;
  DeckIDs?: number[];
  CardID?: number;
}

export interface TTSImageDefinitionList {
  [DeckID: string]: TTSImageDefinition;
}

export interface TTSImageDefinition {
  NumWidth: number;
  NumHeight: number;
  FaceURL: string;
  BackURL: string;
  BackIsHidden: boolean;
}

export interface TTSTransform {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
}

export function standardTTSTransformForCard(): TTSTransform {
  return {
    posX: 0.0,
    posY: 0.0,
    posZ: 0.0,
    rotX: 0,
    rotY: 180,
    rotZ: 180,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
  };
}

export function standardTTSTransformForDeck(): TTSTransform {
  return {
    posX: 0.0,
    posY: 1.0,
    posZ: 0.0,
    rotX: 0,
    rotY: 180,
    rotZ: 180,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
  };
}
