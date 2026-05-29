# FiveM Tracker System SDK 🛡️

The official Node.js SDK for integrating FiveM servers with the **FiveM Tracker System** ecosystem. Protect your server from verified griefers, trolls, and malicious players in real-time.

For more information, visit our official website: [fivem-tracker.online](https://fivem-tracker.online)

---

## ✨ Features

- **Global Blacklist Check:** Instantly verify if a player is flagged across major servers.
- **Player History Access:** View previous offenses and Roleplay quality logs (Standard/Ultra Plans).
- **Lightweight & Fast:** Optimized with Axios for near-zero impact on server latency.
- **Secure Integration:** Built-in security layers utilizing unique `ft_live_` API keys.

---

## 🚀 Installation

Install the package via NPM:

```bash
npm install fivem-tracker-system
```

---
## 🛠️ Quick Start Guide

To use this SDK, you need an **API Key**. You can generate one via our Discord Bot using the `/setup-api` command (Server Owner only).

### Basic Usage Example (Node.js)

```javascript
const FiveMTracker = require('fivem-tracker-system');

// Initialize with your live API Key
const tracker = new FiveMTracker('ft_live_your_key_here');

async function checkPlayerProfile(discordId) {
    console.log(`🔍 Fetching profile for ID: ${discordId}...`);
    
    const result = await tracker.checkPlayer(discordId);

    if (!result.success) {
        return console.error(`❌ Error: ${result.error}`);
    }

    const player = result.data;

    // 1. Check current Blacklist status
    if (player.status === 'blacklisted') {
        console.log(`🚫 Status: BLACKLISTED`);
        console.log(`Reason: ${player.currentBan.reason}`);
    } else {
        console.log(`✅ Status: CLEAR`);
    }

    // 2. Display Roleplay History (For Standard & Ultra Plans)
    if (player.history && player.history.length > 0) {
        console.log(`\n📚 Player History found (${player.playerInfo.totalViolations} records):`);
        
        player.history.forEach((record, index) => {
            console.log(`--- Record #${index + 1} ---`);
            console.log(`🔹 Action: ${record.action}`);
            console.log(`🔹 Reason: ${record.reason}`);
            console.log(`🔹 Server: ${record.server}`);
            console.log(`🔹 Date: ${new Date(record.date).toLocaleDateString()}`);
        });
    } else if (player.playerInfo && player.playerInfo.totalViolations === 0) {
        console.log("\n📖 History: No previous offenses recorded.");
    } else {
        console.log("\n🔒 History: Upgrade your plan to view detailed records.");
    }
}

// Example usage
checkPlayerProfile('762244678007128087');
```

---

## 🛑 Error Codes Reference

Status Code     Description 
401             Unauthorized:API Key is missing.
403             Forbidden: Invalid API Key.
402             Payment Required: Subscription expired.
429             Too Many Requests: Plan limit reached.
500             Server Unreachable: Maintenance in progress.

## 📞 Support & Community

If you encounter any issues or have suggestions, join our community:

Website: [fivem-tracker.online](https://fivem-tracker.online)
Discord: [Join our Support](https://discord.com/invite/q5HUyy4Eu9) 


--- 

ServerDeveloped with ❤️ for FiveM Tracker System.