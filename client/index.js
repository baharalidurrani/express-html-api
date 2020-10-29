console.log("hello from client script", "color: #007acc;");

async function main() {
  const res = await fetch("api/current");
  const jsonData = await res.json();
  console.log(jsonData);
}
main();
