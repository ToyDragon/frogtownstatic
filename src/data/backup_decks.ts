import {NotificationWindowHandle} from '../views/components/notification_window';
import {FrogtownMetadata} from './frogtown_metadata';
import {FrogtownStorage} from './storage';

export default async function backupDecks(storage: FrogtownStorage | null,
    notificationWindow: NotificationWindowHandle, metadata: FrogtownMetadata): Promise<boolean> {
  if (!storage) {
    console.error('Trying to backup before storage prepared.');
    return false;
  }
  const shortDateStr = new Date().toDateString().toLocaleLowerCase().replace(/ /g, '_');
  const folderName = `backup_v${metadata.majorVersion}_${shortDateStr}`;
  const backupFolder = await storage.createDir(folderName);
  if (!backupFolder) {
    console.error('Failed to create backup directory.');
    return false;
  }
  notificationWindow.open('Backing Up Decks',
      'Decks are backed up with every major version change. This will only take a moment...');
  const deckCount = Number(await storage.get('deck_count') || 0);
  await Promise.all(new Array(deckCount).fill(null).map(async (_, i) => {
    const key = `deck_${i}`;
    await backupFolder.set(key, await storage.get(key) || '');
  }));
  console.log(`Backed up ${deckCount} decks to folder "${folderName}"`);
  notificationWindow.close();
  return true;
}
