// ----------------------
// Express API (separate server, e.g., running on port 3001)
// ----------------------
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "your_express_api_secret"; // In production, use an environment variable
const API_BASE_PATH = "/api";

app.post(
  `${API_BASE_PATH}/login`,
  (
    req: { body: { username: string; password: string } },
    res: {
      json: (arg0: { accessToken: any }) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): void; new (): any };
      };
    }
  ) => {
    const { username, password } = req.body;

    // In a real app, you'd verify against a database
    if (username === "user" && password === "password") {
      const accessToken = jwt.sign({ userId: 1 }, JWT_SECRET, {
        expiresIn: "1h",
      });
      const response = {
        id: "1",
        name: "Test User",
        email: "user@example.com",
        accessToken,
        role: "ADMIN",
      };
      res.json(response);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
);

app.get(
  `${API_BASE_PATH}/user-profile`,
  (
    req: { headers: { [x: string]: any } },
    res: {
      sendStatus: (arg0: number) => any;
      json: (arg0: {
        id: any;
        name: string;
        email: string;
        memberSince: string;
      }) => void;
    }
  ) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: { userId: any }) => {
      if (err) return res.sendStatus(403);
      // In a real app, fetch user data from a database
      res.json({
        id: user.userId,
        name: "Test User",
        email: "user@example.com",
        memberSince: "2023-01-01",
      });
    });
  }
);

// add get to check service is running
app.get(API_BASE_PATH, (req: any, res: any) => {
  res.send("Express API is running");
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Express API running on port ${PORT}`));
