
async function main() {
    const data = await fetch('http://localhost:3001/api/test');
    console.log(data)
}

main()