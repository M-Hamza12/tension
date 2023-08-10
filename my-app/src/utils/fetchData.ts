export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ccdcb7d848msh2d9dd4927d2b6e5p1c4331jsn6a3ba2e51300',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
