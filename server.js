const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// 读取用户数据
function readUsers() {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
}

// 保存用户数据
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// 注册
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (users.find(user => user.username === username)) {
        res.json({ message: '用户名已存在' });
    } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        users.push({ username, password: hashedPassword });
        saveUsers(users);
        res.json({ message: '注册成功' });
    }
});

// 登录
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const user = users.find(user => user.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ message: '登录成功' });
    } else {
        res.json({ message: '用户名或密码错误' });
    }
});

// 打卡
app.post('/check-in', (req, res) => {
    const timestamp = req.body.timestamp;
    res.json({ message: `打卡成功！时间：${timestamp}` });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
