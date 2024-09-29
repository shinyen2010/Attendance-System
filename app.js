// 切换日夜模式
function toggleMode() {
    document.body.classList.toggle('night');
}

// 注册请求
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://attendance-system-0yo7.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    });
});

// 登录请求
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://attendance-system-0yo7.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    });
});

// 打卡请求
document.getElementById('checkInButton')?.addEventListener('click', function () {
    fetch('https://attendance-system-0yo7.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp: new Date().toISOString() }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    });
});
