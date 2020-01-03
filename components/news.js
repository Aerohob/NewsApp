const url = 
"https://newsapi.org/v2/top-headlines?country=us&apiKey=8346c55c4813473f8f29da212e2e02fe";

export async function getNews() {
    let result = await fetch(url).then(response => response.json());
    return result.articles;
}
