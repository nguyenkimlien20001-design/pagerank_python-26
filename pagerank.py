def calculate_pagerank(
    nodes,
    edges,
    damping=0.85,
    tolerance=1e-10,
    max_iterations=1000
):
    """
    Tính PageRank bằng Power Iteration.

    nodes:
        ["A", "B", ..., "Z"]

    edges:
        [["A", "B"], ["A", "C"], ...]

    Công thức:
        x(k+1) = x(k) G

    Trong đó:
        G = dP + (1-d)/N
    """

    n = len(nodes)

    if n == 0:
        return {
            "pagerank": {},
            "iterations": 0
        }

    index = {
        node: i
        for i, node in enumerate(nodes)
    }

    # ---------------------------------
    # 1. Tạo danh sách link đi ra
    # ---------------------------------

    outgoing = {
        node: []
        for node in nodes
    }

    for source, target in edges:
        if (
            source in outgoing
            and target in index
            and target not in outgoing[source]
        ):
            outgoing[source].append(target)

    # ---------------------------------
    # 2. Tạo ma trận chuyển P
    # ---------------------------------

    P = [
        [0.0 for _ in range(n)]
        for _ in range(n)
    ]

    for source in nodes:

        i = index[source]

        targets = outgoing[source]

        # Dangling node:
        # nếu node không có link đi ra,
        # phân phối đều tới tất cả node.
        if len(targets) == 0:

            for j in range(n):
                P[i][j] = 1.0 / n

        else:

            probability = 1.0 / len(targets)

            for target in targets:
                j = index[target]
                P[i][j] = probability

    # ---------------------------------
    # 3. Google Matrix
    # ---------------------------------

    G = [
        [0.0 for _ in range(n)]
        for _ in range(n)
    ]

    teleport = (1.0 - damping) / n

    for i in range(n):
        for j in range(n):

            G[i][j] = (
                damping * P[i][j]
                + teleport
            )

    # ---------------------------------
    # 4. Vector ban đầu
    # ---------------------------------

    rank = [
        1.0 / n
        for _ in range(n)
    ]

    # ---------------------------------
    # 5. Power Iteration
    # ---------------------------------

    iterations = 0

    for iteration in range(max_iterations):

        new_rank = [
            0.0
            for _ in range(n)
        ]

        for i in range(n):
            for j in range(n):

                new_rank[j] += (
                    rank[i]
                    * G[i][j]
                )

        error = sum(
            abs(new_rank[i] - rank[i])
            for i in range(n)
        )

        rank = new_rank

        iterations = iteration + 1

        if error < tolerance:
            break

    # Chuẩn hóa để tổng = 1
    total = sum(rank)

    if total != 0:

        rank = [
            value / total
            for value in rank
        ]

    result = {
        node: rank[index[node]]
        for node in nodes
    }

    return {
        "pagerank": result,
        "iterations": iterations,
        "matrix": G
    }
