import React from 'react';
import { FlatList } from 'react-native';

// Import getNews function from news.js
import { getNews } from './news';
// Import Article
import Article from './components/Article';

// In the constructor, define the initial state. Articles will store articles after we fetch them, refreshing will refresh the animation.
// Refreshing is set to true, because when we start the app, we want the animation to start while we load the articles.
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [], refreshing: true };
        this.fetchNews = this.fetchNews.bind(this);
    }
    // Called after a component is mounted
    // As soon as a component is mounted, fetchNews method runs
    componentDidMount() {
        this.fetchNews();
    }

    // In fetchNews, call getNews(), which returns a promise
    // Use .then() which takes a callback function, and the callback function takes an argument (articles)
    // Then assign the articles in the states to the articles argument. articles could also be written {articles: articles}, and then set refreshing to false to stop the animation
    // Catch is called in rejected cases

    fetchNews() {
        getNews()
        .then(articles => this.setState({ articles, refreshing: false }))
        .catch(() => this.setState({ refreshing: false }));
    }

    // handleRefresh starts the spinner animation and calls fetchNews(), we pass () => this.fetchNews() so it's called immediately after we assign the state
    handleRefresh() {
        this.setState(
            {
                refreshing: true
            },
            () => this.fetchNews()
        );
    }

    // In the render method, we return a FlatList element. Then we pass some props. Data is the array of articles from this.state. The renderItem takes a function to render each in the array, but in our case it just returns the Article component we imported earlier. 
    // Then pass the article item as a prop to use later in that component

    render() {
        return (
            <FlatList
            data={this.state.articles}
            renderItem={({ item }) => <Article article={item} />}
            keyExtractor={item => item.url}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
            />
        );
    }
}
