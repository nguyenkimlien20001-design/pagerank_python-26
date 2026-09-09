from flask import Flask, render_template, request, jsonify
from pagerank import calculate_pagerank

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/pagerank", methods=["POST"])
def pagerank_api():
    data = request.get_json()

    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    damping = float(data.get("damping", 0.85))

    result = calculate_pagerank(
        nodes=nodes,
        edges=edges,
        damping=damping
    )

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
