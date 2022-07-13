export interface CardIDMap<T> {
  [cardId: string]: T;
}
export interface StringValueMap<T> {
  [value: string]: T;
}
export interface NumericValueMap<T> {
  [value: number]: T;
}

export type ScryfallRarity = 'common' | 'uncommon' | 'rare' | 'mythic';

/**
 * String values for all of the available cost symbols.
 */
/* eslint-disable no-unused-vars */
export enum MTGCostType {
  // Ability specific
  Tap = 'T',

  // Normal WUBRG+C
  White = 'W',
  Blue = 'U',
  Black = 'B',
  Red = 'R',
  Green = 'G',
  Colorless = 'C',

  // Half WUBRG
  HalfWhite = 'HalfW',
  HalfBlue = 'HalfU',
  HalfBlack = 'HalfB',
  HalfRed = 'HalfR',
  HalfGreen = 'HalfG',

  // Color Combos
  WhiteOrBlue = 'WU',
  WhiteOrBlack = 'WB',
  BlueOrRed = 'UR',
  BlueOrBlack = 'UB',
  BlackOrRed = 'BR',
  BlackOrGreen = 'BG',
  RedOrWhite = 'RW',
  RedOrGreen = 'RG',
  GreenOrWhite = 'GW',
  GreenOrBlue = 'GU',

  // Color or 2 Colorless
  WhiteOrTwoColorless = '2W',
  BlueOrTwoColorless = '2U',
  BlackOrTwoColorless = '2B',
  RedOrTwoColorless = '2R',
  GreenOrTwoColorless = '2G',

  // Color or 2 Life
  WhiteOrTwoLife = 'WP',
  BlueOrTwoLife = 'UP',
  BlackOrTwoLife = 'BP',
  RedOrTwoLife = 'RP',
  GreenOrTwoLife = 'GP',

  // Variable
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}
/* eslint-enable no-unused-vars */

export class MapData {
  public IDToName: CardIDMap<string> = {};
  public NameToID: StringValueMap<string[]> = {};
  public IDToCMC: CardIDMap<number> = {};
  public CMCToID: NumericValueMap<string[]> = {};
  public IDToSetCode: CardIDMap<string> = {};
  public SetCodeToID: StringValueMap<string[]> = {};
  public IDToToughness: CardIDMap<string | number> = {};
  public ToughnessToID: StringValueMap<string[]> = {};
  public IDToPower: CardIDMap<string | number> = {};
  public PowerToID: StringValueMap<string[]> = {};
  public IDToRarity: CardIDMap<ScryfallRarity> = {};
  public RarityToID: StringValueMap<string[]> = {};

  public IDToColorIdentity: CardIDMap<MTGCostType[]> = {};
  public ColorIdentityToID: StringValueMap<string[]> = {};
  public IDToColor: CardIDMap<MTGCostType[]> = {};
  public ColorToID: StringValueMap<string[]> = {};
  public IDToSubtype: CardIDMap<string[]> = {};
  public SubtypeToID: StringValueMap<string[]> = {};
  public IDToSupertype: CardIDMap<string[]> = {};
  public SupertypeToID: StringValueMap<string[]> = {};
  public IDToType: CardIDMap<string[]> = {};
  public TypeToID: StringValueMap<string[]> = {};

  public IDToLegalFormat: CardIDMap<string[]> = {};
  public LegalFormatToID: StringValueMap<string[]> = {};

  public IDToText: CardIDMap<string> = {};
  public FrontIDToBackID: CardIDMap<string> = {};

  public SetCodeToRelease: StringValueMap<string> = {};
  public SetCodeToSetName: StringValueMap<string> = {};
  public TokenIDToName: StringValueMap<string> = {};

  public IDToCollectorsNumber: CardIDMap<string> = {};
  public IDToCost: CardIDMap<string> = {};
  public IDToNormalImageURI: CardIDMap<string> = {};
  public IDToLargeImageURI: CardIDMap<string> = {};
  public IDToCropImageURI: CardIDMap<string> = {};
  public IDToTokenStrings: CardIDMap<string> = {};
  public TokenStringToTokenID: CardIDMap<string> = {};
  public TokenIDToTokenString: CardIDMap<string> = {};
  public TokenIDToLargeImageURI: CardIDMap<string> = {};
  public BackIDToLargeImageURI: CardIDMap<string> = {};
}
