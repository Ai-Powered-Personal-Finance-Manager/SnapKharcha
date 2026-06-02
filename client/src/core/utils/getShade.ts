/*
@author: Deepesh Sunuwar
@description: generate a gamma shade of the give RGB hexcode
@usuage: getShade(#1a1a1a, 0.1),
*/

export function getShade(hex: string, alpha: number) {
  if (!hex) return;

  const cleanHex = hex?.replace("#", "");

  // Parse r, g, b
  const r = parseInt(cleanHex?.substring(0, 2), 16);
  const g = parseInt(cleanHex?.substring(2, 4), 16);
  const b = parseInt(cleanHex?.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
