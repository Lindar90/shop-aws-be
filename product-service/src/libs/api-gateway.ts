const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers,
  }
}

export const formatJson404Response = (message: string) => {
  return {
    statusCode: 404,
    body: JSON.stringify({ message }),
    headers,
  }
}

export const formatJson400Response = () => {
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid input data' }),
    headers,
  }
}

export const formatJson500Response = () => {
  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Something went wrong.' }),
    headers,
  }
}
