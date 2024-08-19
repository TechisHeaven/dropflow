import { stat } from "fs";
import create from "zustand";

interface FileUpload {
  name: string;
  size: number;
  progress: number; // Percentage of upload progress
  status: "uploading" | "completed" | "failed";
}

interface UploadState {
  isVisible: boolean;
  isCollapsed: boolean;
  files: FileUpload[];
  showUpload: () => void;
  toggleCollapsed: () => void;
  hideUpload: () => void;
  addFiles: (file: FileUpload) => void;
  updateFileProgress: (fileName: string, progress: number) => void;
  setFileStatus: (fileName: string, status: "completed" | "failed") => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  isVisible: false,
  isCollapsed: false,
  files: [],
  showUpload: () => set({ isVisible: true }),
  toggleCollapsed: () =>
    set((state) => ({
      isCollapsed: !state.isCollapsed,
    })),
  hideUpload: () => set({ isVisible: false }),
  addFiles: (file) => set((state) => ({ files: [...state.files, file] })),
  updateFileProgress: (fileName, progress) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.name === fileName ? { ...file, progress } : file
      ),
    })),
  setFileStatus: (fileName, status) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.name === fileName ? { ...file, status } : file
      ),
    })),
}));
