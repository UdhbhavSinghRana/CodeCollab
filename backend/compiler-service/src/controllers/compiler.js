const { runCode } = require("../run-code/index");
const { sendResponse } = require("../utils/sendResponse");

class Compiler {
  async runCode(req, res) {
    try {
      const output = await runCode(req.body);
      sendResponse(res, 200, output);
    } catch (err) {
      sendResponse(res, err?.status || 500, err);
    }
  }

  async getSupportedLanguages(req, res) {
    const body = [];

    for (const language of supportedLanguages) {
      body.push({
        language,
      });
    }

    sendResponse(res, 200, { supportedLanguages: body });
  }
}

module.exports = new Compiler();