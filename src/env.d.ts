interface ImportMetaEnv {
  VITE_API_URL: string;
  // Thêm các biến môi trường khác nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
