const { join } = require("path");

const commandMap = (jobID, language) => {
  switch (language) {
    case "java":
      return {
        executeCodeCommand: "java",
        executionArgs: [join(process.cwd(), `codes/${jobID}.java`)],
      };
    case "cpp":
      return {
        compileCodeCommand: "g++",
        compilationArgs: [
          join(process.cwd(), `codes/${jobID}.cpp`),
          "-o",
          join(process.cwd(), `outputs/${jobID}.out`),
        ],
        executeCodeCommand: join(process.cwd(), `outputs/${jobID}.out`),
        outputExt: "out",
      };
    case "py":
      return {
        executeCodeCommand: "python3",
        executionArgs: [join(process.cwd(), `codes/${jobID}.py`)],
      };
    case "c":
      return {
        compileCodeCommand: "gcc",
        compilationArgs: [
          join(process.cwd(), `codes/${jobID}.c`),
          "-o",
          join(process.cwd(), `outputs/${jobID}.out`),
        ],
        executeCodeCommand: join(process.cwd(), `outputs/${jobID}.out`),
        outputExt: "out",
      };
    case "js":
      return {
        executeCodeCommand: "node",
        executionArgs: [join(process.cwd(), `codes/${jobID}.js`)],
      };
    case "go":
      return {
        executeCodeCommand: "go",
        executionArgs: ["run", join(process.cwd(), `codes/${jobID}.go`)],
      };
  }
};

const supportedLanguages = ["java", "cpp", "py", "c", "js", "go"];

module.exports = { commandMap, supportedLanguages };
