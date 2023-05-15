// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';



// export class News extends Component {

//     static defaultProps = {
//         pageSize: 5,
//         country: "in",
//         category: "general"

//     }


//     static propTypes = {
//         pageSize: PropTypes.number,
//         country: PropTypes.string,
//         category: PropTypes.string,

//     }
//     CapitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     constructor(props) {
//         super(props);
//         console.log("Hello I am a Constructor from news Item");
//         this.state = {
//             articles: [],
//             loading: true,
//             page: 1,
//             totalResults: 0
//         }
//         document.title = `NewsMonkey -  ${this.CapitalizeFirstLetter(this.props.category)}`
//     }
//     async updateNews() {
//         this.props.setProgress(0);
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         this.setState({ loading: true });
//         let data = await fetch(url);
//         this.props.setProgress(40);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.props.setProgress(80);
//         this.setState({
//             articles: parsedData.articles,
//             totalResult: parsedData.totalResult,
//             loading: false
//         })
//         this.props.setProgress(100);

//     }
//     async componentDidMount() {
//         this.updateNews();
//         // eslint-disable-next-line
//     }
//     fetchMoreData = async()=>{
//         this.setState({page: this.state.page + 1})
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKe
//         y=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({
//             articles: this.state.articles.concat(parsedData.articles),
//             totalResult: parsedData.totalResult,
//             loading:true

//         })
//     }
//     render() {
//         return (
//             <>

//                 <h2 className='text-center my-4'>NewsMonkey - Top Headlines from {this.CapitalizeFirstLetter(this.props.category)}</h2>
//                 {this.state.loading && <Spinner />}
//                 <InfiniteScroll
//                     dataLength={this.state.articles.length} //This is important field to render the next data
//                     next={this.fetchMoreData}
//                     hasMore={this.state.articles.length !== this.state.totalResult}
//                     loader={<Spinner/>}
//                         >
//                     <div className="container">
//                         <div className='row my-3'>
//                             {this.state.articles.map((element) => {
//                                 return <div className='col-md-4' key={element.title} >
//                                     <NewsItem title={element.title ? element.title : ""}  description={element.description ? element.description : null} Imgurl={!element.urlToImage ? "https://images.moneycontrol.com/static-mcnews/2022/03/fandosensexniftyderivative-2-770x433.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                                 </div>
//                             })}
//                         </div>
//                     </div>
//                 </InfiniteScroll>
//                 </>

//         )
//     }
// }

// export default News

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey ` ;
        
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop : '90px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.title} >
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : null} Imgurl={!element.urlToImage ? "https://images.moneycontrol.com/static-mcnews/2022/03/fandosensexniftyderivative-2-770x433.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News
