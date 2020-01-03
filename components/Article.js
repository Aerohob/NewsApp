import React from 'react';
import { View, Linking, TouchableOpacity} from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

// Start by destructing the article prop and the styles object defined below the class
export default class Article extends React.Component {
    //In render, define time to store the time for when the article was published. The moment library converts the date to the time passed since then, and then we pass publishedAt or time form now if publishedAt is null
    render() {
        const {
            title,
            description,
            publishedAt,
            source,
            urlToImage,
            url
        } = this.props.article;
        const { noteStyle, featuredTitleStyle } = styles;
        const time = moment(publishedAt || moment.now()).fromNow();
        // defaultImg is assigned an image URL in case the URL of the article image is null
        const defaultImg = 
        'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';
        // The render method returns TouchableNativeFeedback (use TouchableOpacity instead if it doesn't work for you) to handle when a user presses a card
        return (
            <TouchableOpacity
            // we pass it some props, which tells the element to use the foreground when displaying the ripple effect on the card
            useForeground
            // onPress, which takes a funciton and executes it when the user presses a card
            // Linking.openURL(url) opens the URL to the full article when we press the card.
            // The card itself takes three props: featuredTitle (Fancy title placed over the title), featuredTitleStyle to style it, and an image which is the article image from the article prop. If it's null, we set it to the defaultImg
            // The Text element holds the description for the article, and has a divder to seperate the description from time and source name
            // Below the Divider, View contains the source name and the time the article was published
            // After the class, define styles for the components
            onPress={() => Linking.openURL(url)}
            >
                <Card
                 featuredTitle={title}
                 featuredTitleStyle={featuredTitleStyle}
                 image={{
                     uri: urlToImage || defaultImg
                 }}
                 >
                     <Text style={{ marginBottom: 10 }}> 
                         {description || 'Read More..'}
                     </Text>
                     <Divider style={{ backgroundColor: '#dfe6e9' }}
                     />
                     <View
                     style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                     >
                         <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
                         <Text style={noteStyle}>{time}</Text>
                     </View>
                 </Card>
            </TouchableOpacity>
        );
    }
}

    const styles = {
        noteStyle: {
            margin: 5,
            fontStyle: 'italic',
            color: '#b2bec3',
            fontSize: 10
        },
        featuredTitleStyle: {
            marginHorizontal: 5,
            textShadowColor: '#00000f',
            textShadowOffset: { width: 3, height: 3},
            textShadowRadius: 3
        }
    };