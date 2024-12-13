import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FrontendAPI } from '../../core/api/frontend-api';

interface UploadConfig {
  endpoint: string;
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // MIME types
  multiple?: boolean;
  maxFiles?: number;
  dropZone?: boolean;
  preview?: boolean;
  autoUpload?: boolean;
  headers?: Record<string, string>;
}

interface FileWithPreview extends File {
  preview?: string;
  progress?: number;
  error?: string;
}

@customElement('file-upload')
export class FileUpload extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    .upload-zone {
      border: 2px dashed #ddd;
      border-radius: 4px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .upload-zone.dragover {
      border-color: #4f46e5;
      background-color: rgba(79, 70, 229, 0.1);
    }

    .files {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .file {
      position: relative;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.5rem;
    }

    .file img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 4px;
    }

    .file-info {
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }

    .file-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .file-size {
      color: #6b7280;
    }

    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #ddd;
      border-radius: 0 0 4px 4px;
    }

    .progress-bar {
      height: 100%;
      background-color: #4f46e5;
      border-radius: 4px;
      transition: width 0.2s;
    }

    .error {
      color: #dc2626;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .remove {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      line-height: 1;
    }
  `;

  @property({ type: Object })
  config!: UploadConfig;

  @state()
  private files: FileWithPreview[] = [];

  @state()
  private dragover = false;

  @state()
  private uploading = false;

  private api = FrontendAPI.getInstance();

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    this.dragover = true;
  }

  private handleDragLeave() {
    this.dragover = false;
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    this.dragover = false;

    if (e.dataTransfer?.files) {
      this.handleFiles(Array.from(e.dataTransfer.files));
    }
  }

  private async handleFiles(newFiles: File[]) {
    if (!this.validateFiles(newFiles)) {
      return;
    }

    const filesWithPreviews = await Promise.all(
      newFiles.map(async (file) => {
        const fileWithPreview = file as FileWithPreview;
        if (this.config.preview && file.type.startsWith('image/')) {
          fileWithPreview.preview = await this.createPreview(file);
        }
        fileWithPreview.progress = 0;
        return fileWithPreview;
      }),
    );

    this.files = this.config.multiple
      ? [...this.files, ...filesWithPreviews].slice(0, this.config.maxFiles || Infinity)
      : [filesWithPreviews[0]];

    if (this.config.autoUpload) {
      this.uploadFiles();
    }
  }

  private validateFiles(files: File[]): boolean {
    for (const file of files) {
      if (this.config.maxSize && file.size > this.config.maxSize) {
        this.dispatchEvent(
          new CustomEvent('upload-error', {
            detail: {
              error: `File ${file.name} exceeds maximum size of ${this.formatSize(this.config.maxSize)}`,
            },
          }),
        );
        return false;
      }

      if (this.config.allowedTypes && !this.config.allowedTypes.includes(file.type)) {
        this.dispatchEvent(
          new CustomEvent('upload-error', {
            detail: { error: `File type ${file.type} is not allowed` },
          }),
        );
        return false;
      }
    }

    return true;
  }

  private async createPreview(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  private removeFile(index: number) {
    this.files = this.files.filter((_, i) => i !== index);
  }

  private async uploadFiles() {
    if (this.uploading || this.files.length === 0) {
      return;
    }

    this.uploading = true;

    try {
      const formData = new FormData();
      this.files.forEach((file, index) => {
        formData.append(this.config.multiple ? `file${index}` : 'file', file);
      });

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          this.files = this.files.map((file) => ({
            ...file,
            progress,
          }));
        }
      });

      const response = await this.api.post(this.config.endpoint, formData, {
        headers: {
          // Let browser set content type with boundary by omitting it
          ...this.config.headers,
        },
      });

      this.dispatchEvent(
        new CustomEvent('upload-success', {
          detail: { response },
        }),
      );

      if (!this.config.multiple) {
        this.files = [];
      }
    } catch (error) {
      this.files = this.files.map((file) => ({
        ...file,
        error: error instanceof Error ? error.message : 'Upload failed',
      }));

      this.dispatchEvent(
        new CustomEvent('upload-error', {
          detail: { error },
        }),
      );
    } finally {
      this.uploading = false;
    }
  }

  protected override render() {
    return html`
      <div
        class="upload-zone ${this.dragover ? 'dragover' : ''}"
        @dragover=${this.handleDragOver}
        @dragleave=${this.handleDragLeave}
        @drop=${this.handleDrop}
        @click=${() => this.shadowRoot?.querySelector('input')?.click()}
      >
        <input
          type="file"
          style="display: none"
          ?multiple=${this.config.multiple}
          accept=${this.config.allowedTypes?.join(',')}
          @change=${(e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input.files) {
              this.handleFiles(Array.from(input.files));
              input.value = ''; // Reset input
            }
          }}
        />
        <p>
          Drag and drop files here or click to select
          ${this.config.allowedTypes
            ? html`<br /><small>(Allowed: ${this.config.allowedTypes.join(', ')})</small>`
            : ''}
          ${this.config.maxSize ? html`<br /><small>(Max size: ${this.formatSize(this.config.maxSize)})</small>` : ''}
        </p>
      </div>

      ${this.files.length > 0
        ? html`
            <div class="files">
              ${this.files.map(
                (file, index) => html`
                  <div class="file">
                    ${file.preview
                      ? html` <img src=${file.preview} alt=${file.name} /> `
                      : html` <div class="file-icon">📄</div> `}
                    <button class="remove" @click=${() => this.removeFile(index)} ?disabled=${this.uploading}>×</button>
                    <div class="file-info">
                      <div class="file-name">${file.name}</div>
                      <div class="file-size">${this.formatSize(file.size)}</div>
                    </div>
                    ${file.progress !== undefined && file.progress < 100
                      ? html`
                          <div class="progress">
                            <div class="progress-bar" style="width: ${file.progress}%"></div>
                          </div>
                        `
                      : ''}
                    ${file.error ? html` <div class="error">${file.error}</div> ` : ''}
                  </div>
                `,
              )}
            </div>

            ${!this.config.autoUpload
              ? html`
                  <button @click=${this.uploadFiles} ?disabled=${this.uploading}>
                    ${this.uploading ? 'Uploading...' : 'Upload Files'}
                  </button>
                `
              : ''}
          `
        : ''}
    `;
  }
}
