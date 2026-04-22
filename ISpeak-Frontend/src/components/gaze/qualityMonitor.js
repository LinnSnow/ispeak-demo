export const qualityMonitor = {
  history: [],
  WINDOW: 30,

  update(x, y) {
    this.history.push({ x, y });
    if (this.history.length > this.WINDOW) {
      this.history.shift();
    }

    if (this.history.length < 5) return 1.0;

    const xs = this.history.map(p => p.x);
    const mean = xs.reduce((a,b) => a+b, 0) / xs.length;
    const std = Math.sqrt(xs.map(v => (v - mean) ** 2).reduce((a,b) => a+b, 0) / xs.length);
    
    // Normalize score based on screen width variation tolerance
    const score = 1 - (std / window.screen.width);
    return Math.max(0, Math.min(1, score));
  }
};
