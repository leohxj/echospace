import type { FileEntry } from "../stores/workspace-store";

interface GetInitialFileToOpenOptions {
  hasHandledInitialSelection: boolean;
  isInitialLoadComplete: boolean;
  activeFile: string | null;
  rememberedFile: string | null;
  files: Pick<FileEntry, "name">[];
}

export function getInitialFileToOpen({
  hasHandledInitialSelection,
  isInitialLoadComplete,
  activeFile,
  rememberedFile,
  files,
}: GetInitialFileToOpenOptions) {
  if (hasHandledInitialSelection) return null;
  if (!isInitialLoadComplete) return null;
  if (activeFile) return null;
  if (files.length === 0) return null;

  const rememberedMatch = rememberedFile
    ? files.find((file) => file.name === rememberedFile)
    : null;

  if (rememberedMatch) {
    return rememberedMatch.name;
  }

  return files[0].name;
}

const LAST_ACTIVE_FILE_KEY = "echospace-last-active-file";

export function getRememberedFile() {
  return localStorage.getItem(LAST_ACTIVE_FILE_KEY);
}

export function rememberFile(file: string) {
  localStorage.setItem(LAST_ACTIVE_FILE_KEY, file);
}
