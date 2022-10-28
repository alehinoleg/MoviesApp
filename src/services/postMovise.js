export default async function postMovieId(id, rate) {
  const localSession = localStorage.getItem('key');
  // eslint-disable-next-line no-undef
  const res = await fetch(`${process.env.REACT_APP_keyApi}/movie/${id}/rating?api_key=${process.env.REACT_APP_apiKey}&guest_session_id=${localSession}`, {
    method:'POST', 
    body: JSON.stringify({
      value: rate,
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  if (!res.ok) {
    throw new Error(`Ошибка, received ${res.status}`)
  }
  const resJson = await res.json();
  return resJson.results;
}