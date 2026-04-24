const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze-code", (req, res) => {
    const { code } = req.body;

    let issues = [];
    let suggestions = [];

    if (!code || code.trim() === "") {
        return res.status(400).json({
            error: "Code input is empty"
        });
    }

    // Basic analysis logic
    if (code.includes("var ")) {
        issues.push("Using 'var' is outdated");
        suggestions.push("Use 'let' or 'const' instead of 'var'");
    }

    if (code.includes("==")) {
        issues.push("Using '==' instead of '==='");
        suggestions.push("Use strict equality '==='");
    }

    if (code.length < 20) {
        issues.push("Code is too short");
        suggestions.push("Write meaningful logic");
    }

    if (issues.length === 0) {
        issues.push("No major issues found");
        suggestions.push("Code looks good 👍");
    }

    res.json({
        originalCode: code,
        issues,
        suggestions
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});