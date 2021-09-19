function parseJSON(response: any) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(JSON.stringify(response));
}

export default function request(url: string, options: any) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

export function pause(duration: number) {
  return new Promise((res) => setTimeout(res, duration));
}
