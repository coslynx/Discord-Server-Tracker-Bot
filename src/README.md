<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>Discord-Server-Tracker-Bot
</h1>
<h4 align="center">A comprehensive Discord bot designed to track and analyze server activity, focusing on message history and user invites.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/Discord-Server-Tracker-Bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/Discord-Server-Tracker-Bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/Discord-Server-Tracker-Bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository houses the Discord Server Tracker Bot, a robust tool designed to provide valuable insights into server dynamics, user engagement, and invite patterns.  Empower your Discord server administration with data-driven decision-making.

## 📦 Features

**Core Functionality:**

* **Message Tracking:** Continuously monitors all channels and stores each message, including author, timestamp, content, and channel.
* **User Invite Tracking:** Records every user invite generated on the server, including the inviter, invitee, and time of the invite.
* **User Activity Analysis:** Tracks and analyzes various aspects of user activity, including message frequency, voice channel participation, and invite activity.

**Additional Features:**

* **Command Interface:** Provides a user-friendly command interface for interacting with various features.
* **Security and Privacy:** Adheres to Discord's API guidelines and prioritizes data privacy with secure authentication and data encryption.

**Enhancements and Improvements (planned):**

* **Real-time Analytics Dashboard:** Develop a real-time analytics dashboard to display key metrics.
* **Customizable Alerts:** Allow server administrators to configure alerts for specific events.
* **Machine Learning Integration:** Integrate machine learning algorithms to identify spam, abuse, and potential security threats.
* **Sentiment Analysis:** Use natural language processing techniques to analyze message content and identify overall sentiment.

## 📂 Structure

```
├── src
│   ├── commands
│   │   ├── invite
│   │   │   ├── track-invites.js
│   │   │   └── invite-stats.js
│   │   ├── message
│   │   │   ├── message-stats.js
│   │   │   └── trending-topics.js
│   │   ├── user
│   │   │   ├── user-activity.js
│   │   │   └── user-stats.js
│   │   ├── bot
│   │   │   ├── help.js
│   │   │   └── ping.js
│   │   ├── admin
│   │   │   ├── set-data-retention.js
│   │   │   └── set-logging-level.js
│   │   └── utils
│   │       ├── parse-message.js
│   │       └── format-data.js
│   ├── events
│   │   ├── messageCreate.js
│   │   ├── guildMemberAdd.js
│   │   ├── guildMemberRemove.js
│   │   ├── inviteCreate.js
│   │   ├── inviteDelete.js
│   │   └── voiceStateUpdate.js
│   ├── models
│   │   ├── message.js
│   │   ├── invite.js
│   │   └── user.js
│   ├── services
│   │   ├── messageService.js
│   │   ├── inviteService.js
│   │   └── userService.js
│   ├── utils
│   │   ├── logger.js
│   │   └── config.js
│   └── index.js
├── .env
└── README.md
```

## 💻 Installation

### 🔧 Prerequisites

* Node.js
* npm
* Docker

### 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/spectra-ai-codegen/Discord-Server-Tracker-Bot.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Discord-Server-Tracker-Bot
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

## 🏗️ Usage

### 🏃‍♂️ Running the Project

1. **Start the development server:**
   ```bash
   npm start
   ```
2. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000).**

### ⚙️ Configuration

Adjust configuration settings in `config.js` or `.env`.

### 📚 Examples

- 📝 **Example 1**:  How to use Message Tracking
- 📝 **Example 2**: How to use User Invite Tracking

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Heroku 
1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create
   ```
4. Deploy the code:
   ```bash
   git push heroku main
   ```

### 🔑 Environment Variables

* `DB_HOST`: Database host
* `DB_USER`: Database user
* `DB_PASS`: Database password

## 📜 License

This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors

- **Author Name** - [Spectra.codes](https://spectra.codes)
- **Creator Name** - [DRIX10](https://github.com/Drix10)

<p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
  </p>
  <p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
  </p>
  <p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google_&_Microsoft_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
  <p>