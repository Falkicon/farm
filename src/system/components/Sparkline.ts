import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('system-sparkline')
export class Sparkline extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      height: 50px;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    path {
      stroke: var(--sparkline-line-color, var(--color-accent));
      stroke-width: var(--sparkline-line-width, 1.5px);
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
      fill: none;
    }
    path.area {
      fill: var(--sparkline-line-color, var(--color-accent));
      fill-opacity: var(--sparkline-fill-opacity, 0.1);
      stroke: none;
    }
  `;

  @property({ type: Array })
  data: { value: number; timestamp: Date }[] = [];

  @property({ type: String })
  unit = '';

  private pathData = { linePath: '', areaPath: '' };

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('data')) {
      this.pathData = this.calculatePathData();
    }
  }

  private calculatePathData() {
    if (!Array.isArray(this.data) || this.data.length < 2) {
      return { linePath: '', areaPath: '' };
    }

    // Filter out any invalid data points
    const validData = this.data.filter(d =>
      d &&
      typeof d.value === 'number' &&
      !isNaN(d.value) &&
      isFinite(d.value) &&
      d.timestamp instanceof Date
    );

    if (validData.length < 2) {
      return { linePath: '', areaPath: '' };
    }

    const width = 100;
    const height = 50;
    const padding = 2;
    const effectiveWidth = width - (padding * 2);
    const effectiveHeight = height - (padding * 2);

    const values = validData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = Math.max(maxValue - minValue, 1);

    // Create points with proper scaling
    const points = validData.map((d, i) => {
      const x = padding + (i / (validData.length - 1)) * effectiveWidth;
      const normalizedValue = (d.value - minValue) / valueRange;
      const y = height - (padding + normalizedValue * effectiveHeight);

      return {
        x: Number(x.toFixed(3)),
        y: Number(y.toFixed(3))
      };
    });

    // Validate all points
    if (points.some(p => !isFinite(p.x) || !isFinite(p.y))) {
      console.warn('Invalid points in sparkline data', { points, validData });
      return { linePath: '', areaPath: '' };
    }

    // Create the curve segments
    let linePath = '';
    let areaPath = '';

    points.forEach((point, i) => {
      if (i === 0) {
        linePath += `M ${point.x},${point.y}`;
        areaPath += `M ${point.x},${height} L ${point.x},${point.y}`;
      } else {
        const prevPoint = points[i - 1];
        const cpx1 = prevPoint.x + (point.x - prevPoint.x) * 0.5;
        const cpx2 = prevPoint.x + (point.x - prevPoint.x) * 0.5;

        linePath += ` C ${cpx1},${prevPoint.y} ${cpx2},${point.y} ${point.x},${point.y}`;
        areaPath += ` C ${cpx1},${prevPoint.y} ${cpx2},${point.y} ${point.x},${point.y}`;
      }

      // If it's the last point, complete the area path
      if (i === points.length - 1) {
        areaPath += ` L ${point.x},${height} Z`;
      }
    });

    return { linePath, areaPath };
  }

  protected override render() {
    if (!this.pathData.linePath) {
      return html`
        <svg viewBox="0 0 100 50" preserveAspectRatio="none">
          <line x1="0" y1="25" x2="100" y2="25"
                stroke="var(--sparkline-line-color, var(--color-accent))"
                stroke-opacity="0.2"
                stroke-width="var(--sparkline-line-width, 1.5px)"
                stroke-dasharray="4 2"
                vector-effect="non-scaling-stroke" />
        </svg>
      `;
    }

    return html`
      <svg viewBox="0 0 100 50" preserveAspectRatio="none">
        <path class="area" d="${this.pathData.areaPath}"></path>
        <path d="${this.pathData.linePath}"></path>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'system-sparkline': Sparkline;
  }
}
