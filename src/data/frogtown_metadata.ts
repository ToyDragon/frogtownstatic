export interface FrogtownMetadata {
  majorVersion: number,
  minorVersion: number,
}

export function getCurrentMetadata(): FrogtownMetadata {
  return {
    majorVersion: 1,
    minorVersion: 1,
  };
}
