# PageRank 26 Nodes — Python Backend + HTML Frontend

Project này được thiết kế theo đúng ý:

- **Python chỉ tính toán PageRank**
- **HTML/CSS/JavaScript chỉ dùng để làm giao diện và trực quan hóa**

## Cấu trúc

```text
pagerank-python-backend/
│
├── app.py
├── pagerank.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── app.js
```

## Vai trò

### pagerank.py

Đây là phần toán học chính.

Python:

1. nhận 26 node A-Z
2. nhận danh sách hyperlink
3. tạo ma trận chuyển P
4. xử lý dangling node
5. tạo Google Matrix
6. chạy Power Iteration
7. trả PageRank

### app.py

Flask chỉ kết nối Python với website.

Browser gửi:

```json
{
    "nodes": ["A", "B", "..."],
    "edges": [["A","B"], ["B","C"]],
    "damping": 0.85
}
```

Python trả:

```json
{
    "pagerank": {
        "A": 0.03,
        "B": 0.08
    }
}
```

### HTML/CSS/JavaScript

Chỉ dùng để:

- vẽ 26 node
- vẽ hyperlink
- vẽ bar chart
- hiển thị phần trăm PageRank
- gửi dữ liệu tới Python

## Cài đặt

```bash
pip install -r requirements.txt
```

## Chạy

```bash
python app.py
```

Sau đó mở trình duyệt:

```text
http://127.0.0.1:5000
```

## Công thức

Google Matrix:

G = dP + (1-d)/N

Power Iteration:

x(k+1) = x(k)G

Mặc định:

d = 0.85
N = 26
