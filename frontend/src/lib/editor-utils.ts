export const isMacOS = (): boolean => 
  typeof window !== 'undefined' && window.navigator.platform === 'MacIntel';

type ShortcutKeyResult = {
  symbol: string;
  readable: string;
};

const shortcutKeyMap: Record<string, ShortcutKeyResult> = {
  mod: isMacOS() 
    ? { symbol: '⌘', readable: 'Command' } 
    : { symbol: 'Ctrl', readable: 'Control' },
  alt: isMacOS() 
    ? { symbol: '⌥', readable: 'Option' } 
    : { symbol: 'Alt', readable: 'Alt' },
  shift: { symbol: '⇧', readable: 'Shift' }
};

export const getShortcutKey = (key: string): ShortcutKeyResult =>
  shortcutKeyMap[key.toLowerCase()] || { symbol: key, readable: key };

export const getShortcutKeys = (keys: string[]): ShortcutKeyResult[] => 
  keys.map(getShortcutKey);