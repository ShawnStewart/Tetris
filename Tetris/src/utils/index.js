export const rotateMatrix = ({ clockwise = true, matrix: m }) => {
    const n = m.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [m[i][j], m[j][i]] = [m[j][i], m[i][j]];
        }
    }

    return clockwise ? m.map((r) => r.reverse()) : m.reverse();
};
