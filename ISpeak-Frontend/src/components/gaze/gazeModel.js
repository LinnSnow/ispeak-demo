import * as math from 'mathjs';

export class GazeModel {
  constructor() {
    this.weights = null; // Contains xCoeffs and yCoeffs
  }

  // points: array of { gazeX, gazeY, screenX, screenY }
  train(points) {
    if (points.length < 5) return;

    // Feature matrix X: [gazeX, gazeY, 1] for intercept
    const X = points.map(p => [p.gazeX, p.gazeY, 1]);
    const y_X = points.map(p => p.screenX);
    const y_Y = points.map(p => p.screenY);

    const lambda = 0.1; // Ridge regularization factor
    const I = math.identity(3);
    const X_mat = math.matrix(X);
    const X_t = math.transpose(X_mat);

    // Ridge Regression formula: M = (X'X + lambda * I)^(-1) * X'y
    const X_t_X = math.multiply(X_t, X_mat);
    const lambda_I = math.multiply(lambda, I);
    const X_t_X_plus_lambda_I = math.add(X_t_X, lambda_I);
    const inv_mat = math.inv(X_t_X_plus_lambda_I);

    // Solve for x coordinates
    const X_t_yX = math.multiply(X_t, y_X);
    const wX = math.multiply(inv_mat, X_t_yX);

    // Solve for y coordinates
    const X_t_yY = math.multiply(X_t, y_Y);
    const wY = math.multiply(inv_mat, X_t_yY);

    this.weights = {
      xCoeffs: wX.valueOf(),
      yCoeffs: wY.valueOf()
    };
  }

  predict(rawGazeX, rawGazeY) {
    // If not trained, fallback to raw
    if (!this.weights) return { x: rawGazeX, y: rawGazeY };

    return {
      x: this.weights.xCoeffs[0] * rawGazeX + this.weights.xCoeffs[1] * rawGazeY + this.weights.xCoeffs[2],
      y: this.weights.yCoeffs[0] * rawGazeX + this.weights.yCoeffs[1] * rawGazeY + this.weights.yCoeffs[2]
    };
  }
}
