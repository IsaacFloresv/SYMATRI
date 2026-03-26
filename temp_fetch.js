(async () => {
  try {
    const res = await fetch('http://localhost:4321/api/v1/users/byrole?roleId=3');
    const data = await res.json();
    console.log('status', res.status);
    console.log('type', Array.isArray(data) ? 'array' : typeof data, 'len', Array.isArray(data) ? data.length : 'n/a');
    console.log('sample', JSON.stringify((Array.isArray(data) ? data[0] : data), null, 2));
  } catch (err) {
    console.error(err);
  }
})();
