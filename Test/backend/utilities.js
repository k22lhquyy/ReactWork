const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Không có token, trả về trạng thái 401 (Unauthorized)
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // Token không hợp lệ, trả về trạng thái 403 (Forbidden)
        if (err) return res.sendStatus(403);

        req.user = user; // Gắn thông tin user vào req để dùng sau
        next(); // Tiếp tục middleware tiếp theo
    });
}

module.exports = { authenticateToken };


