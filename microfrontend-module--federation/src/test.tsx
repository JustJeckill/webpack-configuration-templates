interface Test {
    a: number,
    b: number,
    c: number,
}

export function test(props: Test) {
    const {a, c} = props;
    console.log(a + c);
}
