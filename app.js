
const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


let edges = [

    ["A","B"],
    ["A","C"],

    ["B","D"],
    ["B","E"],

    ["C","A"],
    ["C","F"],

    ["D","B"],
    ["D","G"],

    ["E","B"],
    ["E","C"],
    ["E","H"],

    ["F","C"],
    ["F","I"],

    ["G","E"],
    ["G","J"],

    ["H","G"],
    ["H","K"],

    ["I","F"],
    ["I","L"],

    ["J","H"],
    ["J","M"],

    ["K","J"],
    ["K","N"],

    ["L","K"],
    ["L","O"],

    ["M","L"],
    ["M","P"],

    ["N","M"],
    ["N","Q"],

    ["O","N"],
    ["O","R"],

    ["P","O"],
    ["P","S"],

    ["Q","P"],
    ["Q","T"],

    ["R","Q"],
    ["R","U"],

    ["S","R"],
    ["S","V"],

    ["T","S"],
    ["T","W"],

    ["U","T"],
    ["U","X"],

    ["V","U"],
    ["V","Y"],

    ["W","V"],
    ["W","Z"],

    ["X","W"],
    ["X","A"],

    ["Y","X"],
    ["Y","B"],

    ["Z","Y"],
    ["Z","C"]

];


let pagerank = {};


const colors = [

    "#2f80ed",
    "#f2994a",
    "#27ae60",
    "#eb5757",
    "#9b51e0",
    "#8d5a4a",
    "#e56bba",
    "#7f8c8d",
    "#c7b800",
    "#20b7c9",

    "#3498db",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",

    "#4f46e5",
    "#f97316",
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#0891b2"

];


function createSVG(name, attributes = {}) {

    const element =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            name
        );

    for (const [key, value]
        of Object.entries(attributes)) {

        element.setAttribute(
            key,
            value
        );
    }

    return element;
}


function positions() {

    const result = {};

    const centerX = 400;
    const centerY = 320;

    const radius = 240;

    letters.forEach(
        (letter, i) => {

            const angle =
                -Math.PI / 2
                +
                2 * Math.PI
                * i / 26;

            result[letter] = {

                x:
                    centerX
                    +
                    radius
                    * Math.cos(angle),

                y:
                    centerY
                    +
                    radius
                    * Math.sin(angle)

            };

        }
    );

    return result;
}


function nodeRadius(letter) {

    const value =
        pagerank[letter]
        || (1 / 26);

    return (
        12
        +
        value * 450
    );
}


function drawNetwork() {

    const svg =
        document.getElementById(
            "network"
        );

    svg.innerHTML = "";


    const pos =
        positions();


    // Arrow marker

    const defs =
        createSVG("defs");

    const marker =
        createSVG(
            "marker",
            {
                id: "arrow",
                markerWidth: 10,
                markerHeight: 10,
                refX: 8,
                refY: 3,
                orient: "auto"
            }
        );

    const path =
        createSVG(
            "path",
            {
                d: "M0,0 L0,6 L9,3 z",
                fill: "#444"
            }
        );

    marker.appendChild(path);

    defs.appendChild(marker);

    svg.appendChild(defs);


    // Draw links

    edges.forEach(
        ([source, target]) => {

            const a =
                pos[source];

            const b =
                pos[target];


            const line =
                createSVG(
                    "line",
                    {
                        x1: a.x,
                        y1: a.y,

                        x2: b.x,
                        y2: b.y,

                        class: "edge",

                        "marker-end":
                            "url(#arrow)"
                    }
                );

            svg.appendChild(line);

        }
    );


    // Draw nodes

    letters.forEach(
        (letter, i) => {

            const p =
                pos[letter];

            const r =
                nodeRadius(letter);


            const circle =
                createSVG(
                    "circle",
                    {
                        cx: p.x,
                        cy: p.y,

                        r: r,

                        fill:
                            colors[i],

                        class: "node"
                    }
                );

            svg.appendChild(circle);


            const label =
                createSVG(
                    "text",
                    {
                        x: p.x,
                        y: p.y - 4,

                        class:
                            "node-label"
                    }
                );

            label.textContent =
                letter;

            svg.appendChild(label);


            const percent =
                createSVG(
                    "text",
                    {
                        x: p.x,
                        y: p.y + 12,

                        class:
                            "node-label",

                        "font-size":
                            "9px"
                    }
                );


            percent.textContent =
                pagerank[letter]
                ?
                (
                    pagerank[letter]
                    * 100
                ).toFixed(1)
                + "%"
                :
                "";


            svg.appendChild(
                percent
            );

        }
    );
}


function drawChart() {

    const svg =
        document.getElementById(
            "chart"
        );

    svg.innerHTML = "";


    const width = 800;
    const height = 650;

    const left = 55;
    const bottom = 590;

    const chartHeight = 500;

    const values =
        letters.map(
            letter =>
                pagerank[letter] || 0
        );


    const maximum =
        Math.max(
            ...values,
            0.01
        );


    // axes

    svg.appendChild(
        createSVG(
            "line",
            {
                x1: left,
                y1: 50,

                x2: left,
                y2: bottom,

                class: "axis"
            }
        )
    );


    svg.appendChild(
        createSVG(
            "line",
            {
                x1: left,
                y1: bottom,

                x2: 780,
                y2: bottom,

                class: "axis"
            }
        )
    );


    const space =
        700 / 26;


    letters.forEach(
        (letter, i) => {

            const value =
                values[i];

            const h =
                value
                / maximum
                * chartHeight;

            const x =
                left
                +
                i * space
                +
                3;

            const y =
                bottom
                -
                h;


            const bar =
                createSVG(
                    "rect",
                    {
                        x: x,
                        y: y,

                        width:
                            space - 5,

                        height: h,

                        fill:
                            colors[i]
                    }
                );

            svg.appendChild(bar);


            const label =
                createSVG(
                    "text",
                    {
                        x:
                            x
                            +
                            (space - 5)
                            / 2,

                        y:
                            bottom + 17,

                        "text-anchor":
                            "middle",

                        "font-size":
                            "10px"
                    }
                );

            label.textContent =
                letter;

            svg.appendChild(label);

        }
    );
}


async function calculatePageRank() {

    const damping =
        Number(
            document
                .getElementById(
                    "damping"
                )
                .value
        );


    const response =
        await fetch(
            "/api/pagerank",
            {
                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(
                        {
                            nodes:
                                letters,

                            edges:
                                edges,

                            damping:
                                damping
                        }
                    )
            }
        );


    const data =
        await response.json();


    pagerank =
        data.pagerank;


    document
        .getElementById(
            "status"
        )
        .textContent =
            "Python calculated PageRank in "
            +
            data.iterations
            +
            " iterations.";


    drawNetwork();

    drawChart();
}


function randomLinks() {

    edges = [];


    letters.forEach(
        source => {

            const count =
                1
                +
                Math.floor(
                    Math.random() * 3
                );


            const targets =
                [...letters]
                    .filter(
                        x =>
                            x !== source
                    )
                    .sort(
                        () =>
                            Math.random()
                            - 0.5
                    )
                    .slice(
                        0,
                        count
                    );


            targets.forEach(
                target => {

                    edges.push(
                        [
                            source,
                            target
                        ]
                    );

                }
            );

        }
    );


    calculatePageRank();
}


document
    .getElementById(
        "calculate"
    )
    .onclick =
        calculatePageRank;


document
    .getElementById(
        "random"
    )
    .onclick =
        randomLinks;


document
    .getElementById(
        "reset"
    )
    .onclick =
        () =>
            location.reload();


calculatePageRank();
