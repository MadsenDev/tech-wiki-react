// src/utils/getIcon.js
import * as Icons from 'react-icons/fa';

export function getIcon(iconName) {
  // Use a fallback icon if the requested icon isn't found
  return Icons[iconName] || Icons.FaQuestion;
}