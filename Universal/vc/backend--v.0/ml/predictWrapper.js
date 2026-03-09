const { spawn } = require('child_process');
const path = require('path');

module.exports = function predict(features) {
  return new Promise((resolve, reject) => {

    const py = spawn('python3', [
      path.join(__dirname, 'predict.py')
    ]);

    const input = JSON.stringify({ features });

    let stdout = '';
    let stderr = '';

    // Send input to python
    py.stdin.write(input);
    py.stdin.end();

    // Collect Python output
    py.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    // Collect errors
    py.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    py.on('close', (code) => {
      if (stderr && !stdout) {
        return reject(new Error(`Python error: ${stderr}`));
      }

      try {
        // Extract ONLY JSON (prevents issues if Python prints extra logs)
        const jsonStr = stdout.trim().match(/\{[\s\S]*\}/)?.[0];

        if (!jsonStr) {
          return reject(new Error("No valid JSON returned from Python"));
        }

        const out = JSON.parse(jsonStr);
        resolve(out);

      } catch (err) {
        reject(new Error("Failed to parse Python JSON: " + err.message));
      }
    });
  });
};
