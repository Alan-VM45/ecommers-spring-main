const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const usersFilePath = path.join(__dirname, '../data/users.json');

const userService = {
    findAll: () => {
        const usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(usersJSON);
    },
    create: (userData) => {
        const users = userService.findAll();
        const newUser = {
            id: uuidv4(),
            ...userData
        };
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        return newUser;
    },
    findByEmail: (email) => {
        const users = userService.findAll();
        return users.find(u => u.email === email);
    }
};

module.exports = userService;
