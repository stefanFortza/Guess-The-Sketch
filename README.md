Here is the revised `README.md` file tailored for your "Web Guess the Sketch Game" project:

```markdown
# Web Guess the Sketch Game

## Description

This project is a web-based game where players guess the sketch being drawn by other players in real-time. It includes features for drawing, guessing, and chat functionality, making it a fun and interactive game for multiple users.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/web-guess-the-sketch-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd web-guess-the-sketch-game
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the application:
   ```bash
   npm start
   ```
2. Open your web browser and go to `http://localhost:3000`.

## File Structure

```
web-guess-the-sketch-game/
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── sound/
│   └── css/
│       ├── about.css
│       ├── game/
│       │   ├── chat.css
│       │   ├── game.css
│       │   ├── players.css
│       │   └── round-data.css
│       ├── how-to-play/how-to-play.css
│       └── shared.css
├── src/
│   ├── canvasRoutes.js
│   ├── express.js
│   ├── index.js
│   ├── roundRoutes.js
│   ├── socketIo.js
│   └── exports.js
├── views/
│   ├── game.ejs
│   ├── how-to-play.ejs
│   ├── template.ejs
│   ├── index.ejs
│   ├── 404.ejs
│   └── partials/
│       ├── navbar.ejs
│       └── css-head.ejs
├── .gitignore
├── package.json
└── README.md
```

## Features

- Real-time drawing and guessing
- Chat functionality
- Score tracking
- Multiple game rooms
- User authentication

## Technologies

- Node.js
- Express.js
- Socket.io
- EJS
- CSS

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Feel free to modify any section as needed to better fit your project specifics.
